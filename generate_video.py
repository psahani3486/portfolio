import cv2
import numpy as np
import math
import os

# Set up video parameters
width, height = 1280, 720
fps = 30
duration_sec = 6
total_frames = fps * duration_sec

output_dir = r"c:\Users\Pankaj\Downloads\portfolio\public\videos"
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, "3d_coding_loop.mp4")

# FourCC codec for MP4
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

# Load static base 3D image if exists
img_path = r"c:\Users\Pankaj\Downloads\portfolio\public\images\3d_coding_workspace.png"
base_img = cv2.imread(img_path)
if base_img is not None:
    base_img = cv2.resize(base_img, (width, height))

# Generate particles & matrix code streams
num_particles = 180
particles = []
for i in range(num_particles):
    angle = np.random.uniform(0, 2 * math.pi)
    radius = np.random.uniform(80, 320)
    speed = np.random.uniform(0.02, 0.06)
    size = np.random.randint(2, 6)
    hue = np.random.choice([160, 220, 280]) # Cyan, Blue, Purple
    particles.append({"angle": angle, "radius": radius, "speed": speed, "size": size, "hue": hue, "z": np.random.uniform(0, 100)})

# Code strings for matrix stream
code_snippets = [
    "const aiCore = new RAGArchitecture();",
    "await model.predict(vectorStream);",
    "SELECT * FROM production_kpi WHERE score > 0.98;",
    "docker run -d -p 8000:8000 sentinel/ai:v3",
    "class QuantumNeuralNetwork extends Model {}",
    "FastAPI.middleware.add('CORS', allow_origins=['*'])",
    "SHAP.explain(xgboost_model, test_data);",
    "git commit -m 'feat: 3D neural core pipeline'",
]

print("Rendering 3D coding video loop...")

for frame in range(total_frames):
    t = frame / fps
    progress = frame / total_frames
    
    if base_img is not None:
        # Subtle zoom pulse effect
        zoom_factor = 1.0 + 0.04 * math.sin(progress * 2 * math.pi)
        M = cv2.getRotationMatrix2D((width / 2, height / 2), math.sin(progress * 2 * math.pi) * 1.5, zoom_factor)
        frame_bg = cv2.warpAffine(base_img, M, (width, height))
    else:
        frame_bg = np.zeros((height, width, 3), dtype=np.uint8)

    # Dark overlay gradient
    overlay = frame_bg.copy()
    
    # 1. Draw 3D Rotating Cyber Rings in Center
    cx, cy = width // 2, height // 2
    for r in range(100, 280, 40):
        tilt_angle = t * 1.5 + r * 0.02
        ellipse_h = int(r * abs(math.cos(tilt_angle * 0.7))) + 15
        color = (255, 200, 0) if r % 80 == 0 else (255, 0, 200)
        cv2.ellipse(overlay, (cx, cy), (r, ellipse_h), int(math.degrees(tilt_angle * 0.3)), 0, 360, color, 2, cv2.LINE_AA)

    # 2. Draw 3D Orbiting Quantum Particle Nodes
    for p in particles:
        p["angle"] += p["speed"]
        px = int(cx + math.cos(p["angle"]) * p["radius"])
        py = int(cy + math.sin(p["angle"] * 0.8) * (p["radius"] * 0.5))
        
        # Color based on hue (cyan / purple / gold)
        if p["hue"] == 160:
            color = (255, 245, 0) # Cyan in BGR
        elif p["hue"] == 220:
            color = (255, 120, 50) # Blue
        else:
            color = (220, 50, 255) # Purple

        # Glow dot
        cv2.circle(overlay, (px, py), p["size"] + 3, color, -1, cv2.LINE_AA)
        cv2.circle(overlay, (px, py), p["size"], (255, 255, 255), -1, cv2.LINE_AA)

    # 3. Draw Scrolling Matrix Hologram Code Lines
    for idx, code in enumerate(code_snippets):
        y_pos = int((height * 0.15) + (idx * 65) + (t * 25)) % (height - 60)
        alpha_text = math.sin((y_pos / height) * math.pi)
        if alpha_text > 0.1:
            color_val = int(220 * alpha_text)
            cv2.putText(overlay, code, (60, y_pos), cv2.FONT_HERSHEY_SIMPLEX, 0.55, (color_val, color_val, 255), 1, cv2.LINE_AA)

    # 4. Scanning Laser Line
    scan_y = int((t * 180) % height)
    cv2.line(overlay, (0, scan_y), (width, scan_y), (255, 255, 0), 2, cv2.LINE_AA)

    # Blend frame
    final_frame = cv2.addWeighted(overlay, 0.85, frame_bg, 0.15, 0)
    out.write(final_frame)

out.release()
print("3D Video Loop created successfully at:", output_path)
