import bpy
import time

scene = bpy.context.scene
if hasattr(scene, 'eevee'):
    print("eevee properties:", [p for p in dir(scene.eevee) if 'sample' in p.lower() or 'ray' in p.lower()])
    if hasattr(scene.eevee, 'render_samples'):
        scene.eevee.render_samples = 16
        print("Set eevee render_samples to 16")

t0 = time.time()
bpy.ops.render.render(write_still=False)
print(f"2nd frame rendered in {time.time() - t0:.3f}s")
