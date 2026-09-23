"""Build a stylized, source-informed tokamak cutaway and render an educational clip.

Illustrative geometry only: this is not an engineering model or an MHD simulation.
Run with Blender 5.2+: blender -b --python build_tokamak.py -- --render
"""
import bpy
import math
import os
import sys
from mathutils import Vector

OUT_DIR = os.path.dirname(os.path.abspath(__file__))
BLEND = os.path.join(OUT_DIR, "tokamak_illustrative.blend")
PREVIEW = os.path.join(OUT_DIR, "preview.png")
FRAMES = os.path.join(OUT_DIR, "frames")
FPS, LAST = 30, 180

def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (bpy.data.materials, bpy.data.curves, bpy.data.meshes, bpy.data.cameras, bpy.data.lights):
        for item in list(datablocks):
            if item.users == 0:
                datablocks.remove(item)

def mat(name, color, metallic=0.0, rough=0.4, emission=None, strength=0.0, alpha=1.0):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*color, alpha)
    m.use_nodes = True
    p = m.node_tree.nodes.get("Principled BSDF")
    p.inputs["Base Color"].default_value = (*color, alpha)
    p.inputs["Metallic"].default_value = metallic
    p.inputs["Roughness"].default_value = rough
    if emission:
        p.inputs["Emission Color"].default_value = (*emission, 1)
        p.inputs["Emission Strength"].default_value = strength
    if alpha < 1:
        m.surface_render_method = "DITHERED"
    return m

def smooth(obj, material=None):
    if material:
        obj.data.materials.append(material)
    if obj.type == "MESH":
        for poly in obj.data.polygons:
            poly.use_smooth = True
    return obj

def curve_obj(name, points, bevel, material, cyclic=False, resolution=12):
    c = bpy.data.curves.new(name, "CURVE")
    c.dimensions = "3D"
    c.resolution_u = resolution
    c.bevel_depth = bevel
    c.bevel_resolution = 4
    s = c.splines.new("POLY")
    s.points.add(len(points)-1)
    for p, co in zip(s.points, points):
        p.co = (*co, 1)
    s.use_cyclic_u = cyclic
    o = bpy.data.objects.new(name, c)
    bpy.context.collection.objects.link(o)
    o.data.materials.append(material)
    return o

def cylinder(name, radius, depth, loc, material, vertices=96, bevel=0):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=loc)
    o = bpy.context.object
    o.name = name
    smooth(o, material)
    if bevel:
        mod = o.modifiers.new("Machined edge", "BEVEL")
        mod.width, mod.segments = bevel, 3
    return o

def torus(name, major, minor, loc, material, major_segments=160, minor_segments=32):
    bpy.ops.mesh.primitive_torus_add(major_segments=major_segments, minor_segments=minor_segments,
                                   location=loc, major_radius=major, minor_radius=minor)
    o=smooth(bpy.context.object, material)
    o.name=name
    return o

def partial_vessel(material):
    # Hollow-looking cutaway shell: a sector is deliberately omitted toward camera.
    major, minor, a0, a1, n, m = 2.18, 0.47, -math.pi/2 + 0.58, 3*math.pi/2 - 0.58, 150, 24
    verts, faces = [], []
    for i in range(n+1):
        a = a0 + (a1-a0)*i/n
        for j in range(m):
            b = 2*math.pi*j/m
            r = major + minor*math.cos(b)
            verts.append((r*math.cos(a), r*math.sin(a), 0.15 + minor*math.sin(b)))
    for i in range(n):
        for j in range(m):
            p = i*m+j
            q = i*m+(j+1)%m
            faces.append((p, q, q+m, p+m))
    mesh = bpy.data.meshes.new("Vacuum vessel cutaway mesh")
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    o = bpy.data.objects.new("Vacuum vessel | front cutaway", mesh)
    bpy.context.collection.objects.link(o)
    smooth(o, material)
    bevel = o.modifiers.new("Soft machined edges", "BEVEL")
    bevel.width, bevel.segments = 0.035, 2
    return o

def add_tf_coils(material):
    # 16 D-shaped vertical loops distributed azimuthally, mirroring EAST topology.
    for k in range(16):
        phi = 2*math.pi*k/16
        pts=[]
        # Outer bowed limb and upper/lower returns, in the local radial-z plane.
        for i in range(45):
            t = -math.pi/2 + math.pi*i/44
            r = 2.45 + 0.75*math.cos(t)
            z = 2.10*math.sin(t)
            pts.append((r*math.cos(phi), r*math.sin(phi), z+0.15))
        # inner straight leg closes the D profile
        for i in range(1,45):
            z = 2.10 - 4.20*i/44
            r = 1.70
            pts.append((r*math.cos(phi), r*math.sin(phi), z+0.15))
        curve_obj(f"Toroidal field coil {k+1:02d} | D-loop", pts, 0.105, material, True)

def add_pf_coils(material):
    # Four mirrored upper/lower pairs of poloidal-field rings plus central solenoid.
    for z in (-2.85, -2.05, -1.45, -0.85, 0.85, 1.45, 2.05, 2.85):
        torus(f"Poloidal field coil | z={z:.2f}", 1.72 if abs(z)<2 else 1.92, 0.085, (0,0,z+0.15), material, 112, 20)

def add_field_lines(material):
    # Qualitative field-line traces, not a solved magnetic field.
    for idx in range(5):
        pts=[]
        phase=idx*2*math.pi/5
        for j in range(500):
            t=2*math.pi*j/499
            a=t+phase
            r=2.18 + 0.19*math.cos(3*t+phase)
            z=0.15 + 0.40*math.sin(3*t+phase)
            pts.append((r*math.cos(a), r*math.sin(a), z))
        curve_obj(f"Qualitative magnetic field trace {idx+1}", pts, 0.018, material, False, 8)

def add_label(camera, name, body, loc, size, material, start=1, end=LAST):
    c=bpy.data.curves.new(name, "FONT")
    c.body=body
    c.size=size
    c.extrude=0.0
    c.align_x="LEFT"
    o=bpy.data.objects.new(name,c)
    bpy.context.collection.objects.link(o)
    o.parent=camera
    o.location=(loc[0],loc[1],-8.0)
    o.data.materials.append(material)
    o.hide_render=True
    o.keyframe_insert(data_path="hide_render", frame=max(1,start-1))
    o.hide_render=False
    o.keyframe_insert(data_path="hide_render", frame=start)
    o.hide_render=False
    o.keyframe_insert(data_path="hide_render", frame=end)
    o.hide_render=True
    o.keyframe_insert(data_path="hide_render", frame=min(LAST+1,end+1))
    return o

def setup():
    clear_scene()
    scene=bpy.context.scene
    scene.render.engine="BLENDER_EEVEE"
    scene.eevee.taa_render_samples=24
    scene.render.resolution_x, scene.render.resolution_y = 720,1280
    scene.render.resolution_percentage=100
    scene.render.fps=FPS
    scene.frame_end=LAST
    scene.world.color=(0.009,0.015,0.028)
    scene.world.use_nodes=True
    world_background=scene.world.node_tree.nodes.get("Background")
    world_background.inputs["Color"].default_value=(0.003,0.008,0.012,1)
    world_background.inputs["Strength"].default_value=0.55
    scene.view_settings.view_transform="AgX"
    scene.render.image_settings.file_format="PNG"

    steel=mat("Titanium | graphite",(0.12,0.19,0.25),0.8,0.28)
    vessel=mat("Vacuum vessel | brushed steel",(0.30,0.48,0.55),0.72,0.23)
    copper=mat("Superconducting magnet casings",(0.67,0.27,0.095),0.67,0.24)
    cold=mat("Cryostat rim",(0.19,0.35,0.46),0.78,0.3)
    cyan=mat("Magnetic field | cyan",(0.02,0.35,0.55),0.1,0.3,(0.02,0.55,1.0),2.0)
    plasma=mat("Plasma | ionized gas",(0.98,0.28,0.045),0.05,0.3,(1.0,0.10,0.012),0.4)
    white=mat("HUD | white",(0.8,0.92,1.0),0,0.4,(0.68,0.86,1.0),1.4)
    gold=mat("HUD | amber",(1.0,0.55,0.18),0,0.4,(1.0,0.24,0.04),1.1)

    # Structure: cryostat base, magnet modules, central solenoid, divertor and vacuum chamber.
    torus("Cryostat lower flange",3.28,0.19,(0,0,-2.30),cold)
    torus("Cryostat upper flange",3.28,0.19,(0,0,2.60),cold)
    cylinder("Central solenoid | superconducting stack",0.53,3.75,(0,0,0.15),steel,96,0.06)
    for z in (-1.45,-0.80,-0.15,0.50,1.15,1.80):
        torus(f"Central solenoid winding {z:.2f}",0.58,0.075,(0,0,z),copper,96,20)
    # Divertor plates at the bottom of the plasma chamber.
    for a in (0,math.pi/2,math.pi,3*math.pi/2):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(2.12*math.cos(a),2.12*math.sin(a),-0.53))
        o=bpy.context.object; o.name="Divertor target tile"
        o.dimensions=(0.78,0.28,0.15); o.rotation_euler[2]=a
        bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
        smooth(o,steel)
        mod=o.modifiers.new("Rounded tile edges","BEVEL"); mod.width=.06; mod.segments=3
    add_tf_coils(copper)
    add_pf_coils(cold)
    partial_vessel(vessel)
    # Reinforcing vessel hoops and radial support struts make machine read as a device.
    torus("Vessel rim | inboard",1.70,0.06,(0,0,0.15),cold)
    torus("Vessel rim | outboard",2.68,0.06,(0,0,0.15),cold)
    for k in range(12):
        a=2*math.pi*k/12
        curve_obj(f"Cryostat support {k+1:02d}",[(2.75*math.cos(a),2.75*math.sin(a),-2.25),(2.75*math.cos(a),2.75*math.sin(a),2.55)],.055,steel)
    add_field_lines(cyan)

    # Plasma torus starts absent and grows into a luminous, gently pulsing stable ring.
    p=torus("Plasma ring | startup to stable",2.18,0.43,(0,0,0.15),plasma,192,48)
    p.scale=(0.001,0.001,0.001); p.keyframe_insert(data_path="scale",frame=1)
    p.scale=(0.78,0.78,0.78); p.keyframe_insert(data_path="scale",frame=55)
    p.scale=(1,1,1); p.keyframe_insert(data_path="scale",frame=92)
    for f,s in ((92,1),(115,1.025),(138,0.99),(161,1.02),(180,1)):
        p.scale=(s,s,s); p.keyframe_insert(data_path="scale",frame=f)
    em=plasma.node_tree.nodes.get("Principled BSDF").inputs["Emission Strength"]
    for f,v in ((1,0.0),(42,0.45),(75,2.8),(92,3.6),(115,3.2),(138,3.8),(161,3.3),(180,3.6)):
        em.default_value=v; em.keyframe_insert(data_path="default_value",frame=f)
    # A small set of tracer particles follows the ring; it is a visual cue, not plasma simulation.
    for i in range(38):
        a=2*math.pi*i/38
        bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8, radius=.045,
            location=(2.18*math.cos(a),2.18*math.sin(a),.15+.42*math.sin(3*a)))
        o=bpy.context.object; o.name=f"Illustrative plasma tracer {i+1:02d}"; smooth(o,gold)
        o.scale=(.001,.001,.001); o.keyframe_insert(data_path="scale",frame=1)
        o.scale=(1,1,1); o.keyframe_insert(data_path="scale",frame=75)

    # Three diagnostic sightlines directed at the plasma.
    for x,z in ((-2.9,1.0),(2.9,1.1),(0,2.9)):
        curve_obj("Diagnostic line of sight",[(x,-2.9,z),(0,0,.15)],.012,white)

    # Camera and a restrained 2D title/HUD attached to it.
    bpy.ops.object.camera_add(location=(0,-18,8.0))
    cam=bpy.context.object; cam.name="Portrait scientific camera"
    target=Vector((0,0,.1)); cam.rotation_euler=(target-cam.location).to_track_quat("-Z","Y").to_euler()
    cam.data.type="ORTHO"; cam.data.ortho_scale=16.5
    scene.camera=cam
    add_label(cam,"Title","DENTRO UN TOKAMAK",(-4.45,7.45,0),.48,white)
    add_label(cam,"Subtitle","FUSIONE A CONFINAMENTO MAGNETICO",(-4.42,6.92,0),.19,cyan)
    add_label(cam,"Scale note","SCHEMA ILLUSTRATIVO  |  NON IN SCALA",(-4.42,-7.05,0),.16,white)
    add_label(cam,"Limitation","ANIMAZIONE QUALITATIVA  |  NON SIMULAZIONE MHD",(-4.42,-7.38,0),.145,white)
    add_label(cam,"Phase 1","01  CAMERA SOTTOVUOTO",(-4.4,5.85,0),.27,white,1,45)
    add_label(cam,"Phase 2","02  AVVIO DEL PLASMA",(-4.4,5.85,0),.27,gold,46,82)
    add_label(cam,"Phase 3","03  CONFINAMENTO MAGNETICO",(-4.4,5.85,0),.27,cyan,83,140)
    add_label(cam,"Phase 4","04  DIAGNOSTICA E TEST",(-4.4,5.85,0),.27,white,141,LAST)

    # Lighting: soft studio sources reveal the metal and a warm/cool contrast separates systems.
    def area(name, loc, power, color, size):
        bpy.ops.object.light_add(type="AREA", location=loc)
        l=bpy.context.object; l.name=name; l.data.energy=power; l.data.color=color; l.data.shape="DISK"; l.data.size=size
        l.rotation_euler=(Vector((0,0,0))-l.location).to_track_quat("-Z","Y").to_euler()
    area("Key | cool softbox",(1,-8,9),1500,(.52,.76,1),8)
    area("Rim | warm",(-6,2,5),1900,(1,.28,.10),6)
    area("Fill | cyan",(6,4,2),1200,(.10,.52,1),5)
    # Deterministic, restrained camera move.
    cam.location=(0,-19,8.4); cam.keyframe_insert(data_path="location",frame=1)
    cam.location=(0,-17.6,7.8); cam.keyframe_insert(data_path="location",frame=LAST)
    scene.frame_set(1)
    bpy.ops.wm.save_as_mainfile(filepath=BLEND)
    # Still preview of stabilized plasma.
    scene.frame_set(105)
    scene.render.filepath=PREVIEW
    bpy.ops.render.render(write_still=True)
    if "--render" in sys.argv:
        os.makedirs(FRAMES, exist_ok=True)
        scene.frame_set(1)
        scene.render.image_settings.file_format="PNG"
        scene.render.image_settings.color_mode="RGBA"
        scene.render.filepath=os.path.join(FRAMES,"frame_")
        bpy.ops.render.render(animation=True)
        # Remotion assembles the verified PNG sequence into the final H.264 deliverable.
        scene.render.filepath=PREVIEW
        bpy.ops.wm.save_as_mainfile(filepath=BLEND)

setup()
