import bpy
import math
from mathutils import Vector

bpy.ops.wm.read_factory_settings(use_empty=True)

# Import SVG
svg_path = r"c:\Users\reda_\Desktop\Rimotion\asset blender\logo_transparent.svg"
bpy.ops.import_curve.svg(filepath=svg_path)

imported_objs = [o for o in bpy.data.objects if o.type == 'CURVE']
print(f"Imported {len(imported_objs)} curves")

# Calculate total bounding box
min_x = min(min([v[0] for v in o.bound_box]) + o.location.x for o in imported_objs)
max_x = max(max([v[0] for v in o.bound_box]) + o.location.x for o in imported_objs)
min_y = min(min([v[1] for v in o.bound_box]) + o.location.y for o in imported_objs)
max_y = max(max([v[1] for v in o.bound_box]) + o.location.y for o in imported_objs)
min_z = min(min([v[2] for v in o.bound_box]) + o.location.z for o in imported_objs)
max_z = max(max([v[2] for v in o.bound_box]) + o.location.z for o in imported_objs)

print(f"Bounds X: [{min_x:.3f}, {max_x:.3f}], width={max_x - min_x:.3f}")
print(f"Bounds Y: [{min_y:.3f}, {max_y:.3f}], height={max_y - min_y:.3f}")
print(f"Bounds Z: [{min_z:.3f}, {max_z:.3f}], depth={max_z - min_z:.3f}")
