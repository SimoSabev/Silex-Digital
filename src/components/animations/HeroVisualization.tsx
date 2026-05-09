"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const INPUT_NODES = [
  { label: "Chat",      color: 0x4A90E2 },
  { label: "Email",     color: 0xF5A623 },
  { label: "SMS",       color: 0x50E3C2 },
  { label: "WhatsApp",  color: 0x7ED321 },
  { label: "Form",      color: 0xB8E986 },
];

const PARTICLE_COUNT = 280;

export default function HeroVisualization() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 25);

    // ── Lights ────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x888888));
    const pl1 = new THREE.PointLight(0x4A90E2, 1.5);
    pl1.position.set(0, 0, 15);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0xF5A623, 1);
    pl2.position.set(15, 15, 5);
    scene.add(pl2);

    // ── Central node ──────────────────────────────────────────────────────
    const centerMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.8, 1),
      new THREE.MeshPhongMaterial({
        color: 0x1a1a2e,
        emissive: 0x4A90E2,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.92,
      }),
    );
    scene.add(centerMesh);

    // ── Input nodes ───────────────────────────────────────────────────────
    const INPUT_RADIUS = 13;
    const inputMeshes = INPUT_NODES.map((node, i) => {
      const angle = (i / INPUT_NODES.length) * Math.PI * 2 - Math.PI / 2;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 16, 16),
        new THREE.MeshPhongMaterial({
          color: node.color,
          emissive: node.color,
          emissiveIntensity: 0.4,
        }),
      );
      mesh.position.set(
        Math.cos(angle) * INPUT_RADIUS,
        Math.sin(angle) * INPUT_RADIUS,
        0,
      );
      scene.add(mesh);
      return mesh;
    });

    // ── Output nodes ──────────────────────────────────────────────────────
    const OUTPUT_COLOR = 0x2BAB66;
    const OUTPUT_RADIUS = 11;
    const outputMeshes = [0, 1, 2].map((i) => {
      const angle = (i / 3) * Math.PI * 2 + Math.PI / 6;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.9, 16, 16),
        new THREE.MeshPhongMaterial({
          color: OUTPUT_COLOR,
          emissive: OUTPUT_COLOR,
          emissiveIntensity: 0.5,
        }),
      );
      mesh.position.set(
        Math.cos(angle) * OUTPUT_RADIUS,
        Math.sin(angle) * OUTPUT_RADIUS,
        1,
      );
      scene.add(mesh);
      return mesh;
    });

    // ── Particles ─────────────────────────────────────────────────────────
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors   = new Float32Array(PARTICLE_COUNT * 3);

    type PData = { t: number; speed: number; srcIdx: number; dstIdx: number };
    const pdata: PData[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      t:      Math.random(),
      speed:  0.003 + Math.random() * 0.002,
      srcIdx: Math.floor(Math.random() * INPUT_NODES.length),
      dstIdx: Math.floor(Math.random() * 3),
    }));

    pdata.forEach((pd, i) => {
      const c = new THREE.Color(INPUT_NODES[pd.srcIdx]!.color);
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    });

    const geo = new THREE.BufferGeometry();
    const posAttr   = new THREE.BufferAttribute(positions, 3);
    const colorAttr = new THREE.BufferAttribute(colors, 3);
    geo.setAttribute("position", posAttr);
    geo.setAttribute("color", colorAttr);

    const points = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.85 }),
    );
    scene.add(points);

    // ── Animation ─────────────────────────────────────────────────────────
    let animId: number;
    let paused = false;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      if (paused) return;

      centerMesh.rotation.y += 0.004;
      centerMesh.rotation.x += 0.002;

      pdata.forEach((pd, i) => {
        pd.t += pd.speed;
        if (pd.t >= 1) {
          pd.t      = 0;
          pd.srcIdx = Math.floor(Math.random() * INPUT_NODES.length);
          pd.dstIdx = Math.floor(Math.random() * 3);
          const c = new THREE.Color(INPUT_NODES[pd.srcIdx]!.color);
          colorAttr.setXYZ(i, c.r, c.g, c.b);
        }

        const src = inputMeshes[pd.srcIdx]!.position;
        const dst = outputMeshes[pd.dstIdx]!.position;
        let x: number, y: number, z: number;

        if (pd.t < 0.5) {
          const lt = pd.t / 0.5;
          x = src.x * (1 - lt);
          y = src.y * (1 - lt);
          z = src.z * (1 - lt);
        } else {
          const lt = (pd.t - 0.5) / 0.5;
          x = dst.x * lt;
          y = dst.y * lt;
          z = dst.z * lt;
        }
        posAttr.setXYZ(i, x, y, z);
      });

      posAttr.needsUpdate   = true;
      colorAttr.needsUpdate = true;

      const pulse = 1 + Math.sin(Date.now() * 0.0025) * 0.04;
      centerMesh.scale.setScalar(pulse);

      renderer.render(scene, camera);
    };
    tick();

    // ── Pause when off-screen ─────────────────────────────────────────────
    const observer = new IntersectionObserver(
      ([entry]) => { paused = !entry?.isIntersecting; },
      { threshold: 0.1 },
    );
    observer.observe(mount);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" aria-hidden="true" />;
}
