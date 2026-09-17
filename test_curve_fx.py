import bpy

bpy.ops.wm.read_factory_settings(use_empty=True)
svg_path = r"c:\Users\reda_\Desktop\Rimotion\asset blender\logo_transparent.svg"
bpy.ops.import_curve.svg(filepath=svg_path)

c = bpy.data.objects["Curve"]
print("Curve dimensions:", c.data.dimensions)
c.data.dimensions = '3D'
c.data.bevel_depth = 0.002
c.data.bevel_factor_end = 0.5
print("Bevel factor end set successfully:", c.data.bevel_factor_end)

# Also test Build modifier on mesh conversion
bpy.ops.object.select_all(action='DESELECT')
c.select_set(True)
bpy.context.view_layer.objects.active = c
bpy.ops.object.convert(target='MESH')
print("Converted to mesh:", c.type)
mod = c.modifiers.new("Build", 'BUILD')
mod.frame_start = 1
mod.frame_duration = 150
print("Build modifier applied:", mod.name)
