import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'

/**
 * HologramMaterial — Custom GLSL shader
 * Features: scan-lines, Fresnel edge glow, glitch, chromatic aberration
 */
const HologramMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#7dcfff'),
    uSecondaryColor: new THREE.Color('#a855f7'),
    uOpacity: 0.85,
    uScanSpeed: 1.2,
    uScanDensity: 80.0,
    uGlitchIntensity: 0.0,
    uFresnelPower: 2.5,
  },
  // Vertex Shader
  /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    uniform float uTime;
    uniform float uGlitchIntensity;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;

      vec3 pos = position;

      // Glitch displacement
      if (uGlitchIntensity > 0.0) {
        float glitchSlice = step(0.95, sin(pos.y * 40.0 + uTime * 15.0));
        pos.x += glitchSlice * uGlitchIntensity * sin(uTime * 50.0) * 0.15;
      }

      vec4 worldPos = modelMatrix * vec4(pos, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  // Fragment Shader
  /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uSecondaryColor;
    uniform float uOpacity;
    uniform float uScanSpeed;
    uniform float uScanDensity;
    uniform float uFresnelPower;
    uniform float uGlitchIntensity;

    void main() {
      // Fresnel edge glow
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), uFresnelPower);

      // Scan-lines
      float scanLine = sin(vPosition.y * uScanDensity + uTime * uScanSpeed) * 0.5 + 0.5;
      scanLine = smoothstep(0.3, 0.7, scanLine);

      // Horizontal scan sweep
      float sweep = smoothstep(0.0, 0.05, 
        abs(sin(vPosition.y * 2.0 - uTime * 1.5))
      );

      // Color mix: primary + secondary based on height
      float colorMix = sin(vPosition.y * 3.0 + uTime * 0.5) * 0.5 + 0.5;
      vec3 baseColor = mix(uColor, uSecondaryColor, colorMix * 0.4);

      // Combine
      float alpha = uOpacity;
      alpha *= (0.4 + scanLine * 0.3 + fresnel * 0.8);
      alpha *= sweep;

      // Chromatic aberration simulation
      vec3 finalColor = baseColor + fresnel * uSecondaryColor * 0.6;
      finalColor += vec3(0.1, 0.05, 0.15) * scanLine;

      // Glitch color shift
      if (uGlitchIntensity > 0.0) {
        float glitchLine = step(0.97, sin(vPosition.y * 80.0 + uTime * 20.0));
        finalColor = mix(finalColor, uSecondaryColor * 2.0, glitchLine * uGlitchIntensity);
      }

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
)

export default HologramMaterial

/**
 * Simpler glow material for particles and accents
 */
export const GlowMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#7dcfff'),
    uIntensity: 1.5,
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uIntensity;

    void main() {
      float dist = length(vUv - 0.5) * 2.0;
      float glow = exp(-dist * 3.0) * uIntensity;
      float pulse = 1.0 + sin(uTime * 3.0) * 0.15;
      vec3 color = uColor * glow * pulse;
      float alpha = glow * 0.9;
      gl_FragColor = vec4(color, alpha);
    }
  `
)
