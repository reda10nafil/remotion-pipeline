import bpy
import math
from mathutils import Vector, Euler

# 1. Reset scene
bpy.ops.wm.read_factory_settings()
scene = bpy.context.scene

# Remove default objects
for obj in list(bpy.data.objects):
    bpy.data.objects.remove(obj, do_unlink=True)

# 2. Render & World settings
scene.render.engine = 'BLENDER_EEVEE'
if hasattr(scene, 'eevee'):
    scene.eevee.taa_render_samples = 8
    scene.eevee.use_raytracing = True

scene.render.resolution_x = 1080
scene.render.resolution_y = 1920
scene.render.resolution_percentage = 100
scene.render.fps = 60
scene.frame_start = 1
scene.frame_end = 300

# World background
world = bpy.data.worlds.new("StudioWorld")
scene.world = world
world.use_nodes = True
bg_node = world.node_tree.nodes.get("Background")
if bg_node:
    bg_node.inputs[0].default_value = (0.92, 0.92, 0.92, 1.0)
    bg_node.inputs[1].default_value = 0.5

# 3. Import SVG
svg_path = r"c:\Users\reda_\Desktop\Rimotion\asset blender\logo_transparent.svg"
bpy.ops.import_curve.svg(filepath=svg_path)

imported_curves = [o for o in bpy.data.objects if o.type == 'CURVE']
print(f"Loaded {len(imported_curves)} curves from SVG")

# Select all imported curves and join them
bpy.ops.object.select_all(action='DESELECT')
for c in imported_curves:
    c.select_set(True)
bpy.context.view_layer.objects.active = imported_curves[0]
bpy.ops.object.join()

logo_curve = bpy.context.view_layer.objects.active
logo_curve.name = "SimonStyle_Curves"

# Center origin to bounds
bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
logo_curve.location = Vector((0, 0, 0))

# Rotate upright: SVG is in XY plane with inverted Y
# In Blender, rotating X by 90 deg and Z by 180 or scaling -1 makes it face front
logo_curve.rotation_euler = Euler((math.radians(90), 0, 0), 'XYZ')
# Invert Y to fix SVG upside down
logo_curve.scale = Vector((3.8, 3.8, -3.8))
bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)

# Re-center
bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
logo_curve.location = Vector((0, 0, 0))

# 4. Materials
# Material 1: Neon Emission magenta
mat_neon = bpy.data.materials.new(name="Mat_NeonMagenta")
mat_neon.use_nodes = True
nodes_neon = mat_neon.node_tree.nodes
nodes_neon.clear()
out_neon = nodes_neon.new(type='ShaderNodeOutputMaterial')
emit_neon = nodes_neon.new(type='ShaderNodeEmission')
# Vibrant Magenta #E6007E (sRGB: 0.902, 0.0, 0.494)
emit_neon.inputs['Color'].default_value = (0.902, 0.0, 0.494, 1.0)
emit_neon.inputs['Strength'].default_value = 15.0
mat_neon.node_tree.links.new(emit_neon.outputs['Emission'], out_neon.inputs['Surface'])

# Material 2: Metallic / Glass reflective body
mat_solid = bpy.data.materials.new(name="Mat_MetallicSolid")
mat_solid.use_nodes = True
nodes_solid = mat_solid.node_tree.nodes
nodes_solid.clear()
out_solid = nodes_solid.new(type='ShaderNodeOutputMaterial')
bsdf_solid = nodes_solid.new(type='ShaderNodeBsdfPrincipled')
bsdf_solid.inputs['Base Color'].default_value = (0.85, 0.02, 0.45, 1.0)
bsdf_solid.inputs['Metallic'].default_value = 0.90
bsdf_solid.inputs['Roughness'].default_value = 0.12
if 'Coat Weight' in bsdf_solid.inputs:
    bsdf_solid.inputs['Coat Weight'].default_value = 0.8
if 'Transmission Weight' in bsdf_solid.inputs:
    bsdf_solid.inputs['Transmission Weight'].default_value = 0.1
mat_solid.node_tree.links.new(bsdf_solid.outputs['BSDF'], out_solid.inputs['Surface'])

# Material 3: Backdrop plane #EBEBEB
mat_bg = bpy.data.materials.new(name="Mat_StudioBackdrop")
mat_bg.use_nodes = True
bsdf_bg = mat_bg.node_tree.nodes.get("Principled BSDF")
if bsdf_bg:
    # #EBEBEB is roughly 0.83 in linear sRGB
    bsdf_bg.inputs['Base Color'].default_value = (0.83, 0.83, 0.83, 1.0)
    bsdf_bg.inputs['Roughness'].default_value = 0.4
    bsdf_bg.inputs['Metallic'].default_value = 0.0

# 5. Create Neon Stroke Object
obj_neon = logo_curve
obj_neon.name = "Logo_NeonContour"
obj_neon.data.dimensions = '3D'
obj_neon.data.fill_mode = 'NONE'
obj_neon.data.bevel_depth = 0.003
obj_neon.data.bevel_resolution = 3
obj_neon.data.materials.clear()
obj_neon.data.materials.append(mat_neon)
obj_neon.location.y = -0.005 # slightly in front

# 6. Create Solid 3D Body Object
obj_solid_data = obj_neon.data.copy()
obj_solid = bpy.data.objects.new("Logo_SolidBody", obj_solid_data)
bpy.context.scene.collection.objects.link(obj_solid)
obj_solid.data.dimensions = '2D'
obj_solid.data.fill_mode = 'BOTH'
obj_solid.data.extrude = 0.018
obj_solid.data.bevel_depth = 0.002
obj_solid.data.bevel_resolution = 2
obj_solid.data.materials.clear()
obj_solid.data.materials.append(mat_solid)
obj_solid.location = Vector((0, 0, 0))

# 7. Animation Setup (60 FPS, 300 frames)
# A) Neon Tracing Animation (Frame 0 - 150)
obj_neon.data.bevel_factor_end = 0.0
obj_neon.data.keyframe_insert(data_path="bevel_factor_end", frame=1)

obj_neon.data.bevel_factor_end = 1.0
obj_neon.data.keyframe_insert(data_path="bevel_factor_end", frame=150)

# Neon emission pulse
emit_neon.inputs['Strength'].default_value = 16.0
emit_neon.inputs['Strength'].keyframe_insert(data_path="default_value", frame=1)
emit_neon.inputs['Strength'].keyframe_insert(data_path="default_value", frame=150)

emit_neon.inputs['Strength'].default_value = 5.0
emit_neon.inputs['Strength'].keyframe_insert(data_path="default_value", frame=240)

# B) Solid Body Fade-in and Extrusion (Frame 120 - 240)
# Start hidden at frame 120
obj_solid.scale = Vector((1.0, 1.0, 0.001))
obj_solid.hide_render = True
obj_solid.keyframe_insert(data_path="hide_render", frame=1)
obj_solid.keyframe_insert(data_path="hide_render", frame=119)

obj_solid.hide_render = False
obj_solid.keyframe_insert(data_path="hide_render", frame=120)

obj_solid.scale = Vector((1.0, 1.0, 0.05))
obj_solid.keyframe_insert(data_path="scale", frame=120)

obj_solid.scale = Vector((1.0, 1.0, 1.0))
obj_solid.keyframe_insert(data_path="scale", frame=230)

# Smooth ease for all fcurves
for obj in [obj_neon, obj_solid]:
    if obj.animation_data and obj.animation_data.action:
        for fcurve in obj.animation_data.action.fcurves:
            for kp in fcurve.keyframe_points:
                kp.interpolation = 'BEZIER'

# 8. Background Studio Plane
bpy.ops.mesh.primitive_plane_add(size=12.0, location=(0, 0.4, 0))
plane = bpy.context.view_layer.objects.active
plane.name = "Studio_Backdrop"
plane.rotation_euler = Euler((math.radians(90), 0, 0), 'XYZ')
plane.data.materials.append(mat_bg)

# 9. Lighting Setup
# Key Light
light_key_data = bpy.data.lights.new(name="Light_Key", type='AREA')
light_key_data.energy = 450.0
light_key_data.size = 2.5
light_key_data.color = (1.0, 0.98, 0.95)
light_key = bpy.data.objects.new("Light_Key", light_key_data)
bpy.context.scene.collection.objects.link(light_key)
light_key.location = Vector((-1.6, -2.8, 1.8))
light_key.rotation_euler = Euler((math.radians(65), math.radians(-15), math.radians(-30)), 'XYZ')

# Fill Light (Cool)
light_fill_data = bpy.data.lights.new(name="Light_Fill", type='AREA')
light_fill_data.energy = 220.0
light_fill_data.size = 3.0
light_fill_data.color = (0.92, 0.95, 1.0)
light_fill = bpy.data.objects.new("Light_Fill", light_fill_data)
bpy.context.scene.collection.objects.link(light_fill)
light_fill.location = Vector((2.2, -2.2, -0.5))
light_fill.rotation_euler = Euler((math.radians(75), math.radians(20), math.radians(45)), 'XYZ')

# Top / Rim Light (Glossy reflections)
light_rim_data = bpy.data.lights.new(name="Light_Rim", type='AREA')
light_rim_data.energy = 300.0
light_rim_data.size = 2.0
light_rim_data.color = (1.0, 0.9, 0.95)
light_rim = bpy.data.objects.new("Light_Rim", light_rim_data)
bpy.context.scene.collection.objects.link(light_rim)
light_rim.location = Vector((0.0, -0.6, 2.8))
light_rim.rotation_euler = Euler((math.radians(25), 0, 0), 'XYZ')

# 10. Camera
cam_data = bpy.data.cameras.new(name="Camera")
cam_data.lens = 70 # Luxury telephoto compression
cam = bpy.data.objects.new("Camera", cam_data)
bpy.context.scene.collection.objects.link(cam)
scene.camera = cam

# Camera subtle push-in
cam.location = Vector((0, -3.25, 0))
cam.rotation_euler = Euler((math.radians(90), 0, 0), 'XYZ')
cam.keyframe_insert(data_path="location", frame=1)

cam.location = Vector((0, -3.05, 0))
cam.keyframe_insert(data_path="location", frame=300)

if cam.animation_data and cam.animation_data.action:
    for fcurve in cam.animation_data.action.fcurves:
        for kp in fcurve.keyframe_points:
            kp.interpolation = 'BEZIER'

# Save .blend file to asset folders as requested by user
blend_path1 = r"c:\Users\reda_\Desktop\Rimotion\asset blender\simon_style_logo_3d.blend"
blend_path2 = r"c:\Users\reda_\Desktop\Rimotion\assat blender\simon_style_logo_3d.blend"
bpy.ops.wm.save_as_mainfile(filepath=blend_path1)
import shutil
shutil.copyfile(blend_path1, blend_path2)
print("Saved blend files successfully to asset blender and assat blender!")

# Render test frames to verify composition
test_frames = [75, 180, 260]
for tf in test_frames:
    scene.frame_set(tf)
    scene.render.filepath = rf"c:\Users\reda_\Desktop\Rimotion\asset blender\preview_frame_{tf}.png"
    bpy.ops.render.render(write_still=True)
    print(f"Rendered preview frame {tf}")
