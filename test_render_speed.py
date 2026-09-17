import bpy
import time

bpy.ops.wm.read_factory_settings()
scene = bpy.context.scene
print("Default engine:", scene.render.engine)
scene.render.resolution_x = 1080
scene.render.resolution_y = 1920
scene.render.filepath = r"c:\Users\reda_\Desktop\Rimotion\test_frame.png"
t0 = time.time()
bpy.ops.render.render(write_still=True)
print(f"Rendered default in {time.time() - t0:.2f}s with {scene.render.engine}")
