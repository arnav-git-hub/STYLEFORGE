from PIL import Image
import os

img = Image.open(r'e:\styleforge\artifacts\designalchemy_walkthrough.webp')
print(f'Format: {img.format}')
print(f'Mode: {img.mode}')
try:
    n = img.n_frames
    print(f'Frames: {n}')
except Exception:
    print('Frames: 1 (static)')
