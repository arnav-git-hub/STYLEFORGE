from PIL import Image
import sys

INPUT = r'e:\styleforge\artifacts\designalchemy_walkthrough.webp'
OUTPUT = r'e:\styleforge\artifacts\demo.gif'

print("Opening WebP...")
img = Image.open(INPUT)
total_frames = img.n_frames
print(f"Total frames: {total_frames}")

# Sample every Nth frame to keep GIF manageable (target ~80-100 frames)
SAMPLE_EVERY = max(1, total_frames // 90)
frames = []

for i in range(0, total_frames, SAMPLE_EVERY):
    img.seek(i)
    frame = img.copy().convert("P", palette=Image.ADAPTIVE, colors=128)
    frames.append(frame)
    if i % 50 == 0:
        print(f"  Processed frame {i}/{total_frames}...")

print(f"Saving GIF with {len(frames)} frames...")
frames[0].save(
    OUTPUT,
    save_all=True,
    append_images=frames[1:],
    loop=0,
    duration=120,  # 120ms per frame
    optimize=True
)

import os
size_mb = os.path.getsize(OUTPUT) / (1024 * 1024)
print(f"Done! GIF saved to: {OUTPUT}")
print(f"File size: {size_mb:.1f} MB")
