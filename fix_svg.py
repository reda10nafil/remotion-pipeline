import os

with open('scratch_test.svg', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('fill="#000000"', 'fill="#E6007E"')

destinations = [
    'public/assets/logo_transparent.svg',
    'asset blender/logo_transparent.svg',
    'assat blender/logo_transparent.svg',
    'public/asset blender/logo_transparent.svg'
]

for d in destinations:
    os.makedirs(os.path.dirname(d), exist_ok=True)
    with open(d, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Wrote clean SVG to", d)
