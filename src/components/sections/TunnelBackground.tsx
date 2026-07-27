"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Slow-moving 3D tunnel — adapted from thebuggeddev/delphi's Three.js hero
 * (github.com/thebuggeddev/delphi). Key differences from the original:
 *  - Runs on a constant timer instead of being driven by window scroll —
 *    this is a decorative background loop, not a scrollytelling hero.
 *  - Textures are drawn on canvas at runtime (small "slide" mockups in the
 *    brand palette) instead of loaded from Unsplash URLs.
 *  - Scoped to fill its parent section (absolute, alpha canvas) rather than
 *    a fixed fullscreen hero layer, and sized down for a CTA band.
 */

const TUNNEL_WIDTH = 14;
const TUNNEL_HEIGHT = 9;
const SEGMENT_DEPTH = 5;
const NUM_SEGMENTS = 9;
const FLOOR_COLS = 5;
const WALL_ROWS = 3;
const SPEED = 0.012; // constant forward drift per frame — deliberately slow

const COL_WIDTH = TUNNEL_WIDTH / FLOOR_COLS;
const ROW_HEIGHT = TUNNEL_HEIGHT / WALL_ROWS;

type SlideDesign = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

const SLIDE_DESIGNS: SlideDesign[] = [
  // Bar chart slide
  (ctx, w, h) => {
    ctx.fillStyle = "#f3edff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#1a1030";
    ctx.font = "600 26px sans-serif";
    ctx.fillText("Growth", 24, 44);
    const bars = [0.4, 0.7, 0.5, 0.9, 0.65];
    const bw = (w - 48) / bars.length - 10;
    bars.forEach((v, i) => {
      const bh = (h - 100) * v;
      const grad = ctx.createLinearGradient(0, h - 40 - bh, 0, h - 40);
      grad.addColorStop(0, "#6d3ff6");
      grad.addColorStop(1, "#cc98f8");
      ctx.fillStyle = grad;
      ctx.fillRect(24 + i * (bw + 10), h - 40 - bh, bw, bh);
    });
  },
  // Title + content lines slide
  (ctx, w, h) => {
    ctx.fillStyle = "#1a1030";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 28px sans-serif";
    ctx.fillText("Q3 Strategy", 24, 50);
    const lines = [0.8, 0.65, 0.72];
    lines.forEach((v, i) => {
      ctx.fillStyle = i === 0 ? "#a189e1" : "rgba(255,255,255,0.35)";
      ctx.fillRect(24, 90 + i * 34, (w - 48) * v, 12);
    });
  },
  // Image placeholder slide
  (ctx, w, h) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    const grad = ctx.createRadialGradient(w * 0.35, h * 0.4, 10, w * 0.5, h * 0.5, w * 0.6);
    grad.addColorStop(0, "#cc98f8");
    grad.addColorStop(0.5, "#6d3ff6");
    grad.addColorStop(1, "#240e77");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(20, 20, w - 40, h - 76, 14);
    ctx.fill();
    ctx.fillStyle = "#1a1030";
    ctx.fillRect(20, h - 44, (w - 40) * 0.6, 10);
    ctx.fillStyle = "#c9bff0";
    ctx.fillRect(20, h - 24, (w - 40) * 0.35, 8);
  },
  // Quote slide
  (ctx, w, h) => {
    ctx.fillStyle = "#f3edff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#6d3ff6";
    ctx.font = "700 64px serif";
    ctx.fillText("“", 20, 70);
    ctx.fillStyle = "#1a1030";
    ctx.fillRect(24, h - 70, (w - 48) * 0.7, 10);
    ctx.fillStyle = "rgba(26,16,48,0.4)";
    ctx.fillRect(24, h - 46, (w - 48) * 0.4, 8);
  },
];

function buildTexture(design: SlideDesign): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 240;
  const ctx = canvas.getContext("2d")!;
  design(ctx, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function TunnelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a1030, 0.045);

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 100);
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const textures = SLIDE_DESIGNS.map(buildTexture);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x6d3ff6, transparent: true, opacity: 0.18 });

    const populate = (group: THREE.Group, w: number, h: number, d: number) => {
      const cellMargin = 0.5;
      const addImg = (pos: THREE.Vector3, rot: THREE.Euler, wd: number, ht: number) => {
        const tex = textures[Math.floor(Math.random() * textures.length)];
        const geom = new THREE.PlaneGeometry(Math.max(wd - cellMargin, 0.1), Math.max(ht - cellMargin, 0.1));
        const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.copy(pos);
        mesh.rotation.copy(rot);
        mesh.name = "slab_image";
        group.add(mesh);
      };

      let last = -999;
      for (let i = 0; i < FLOOR_COLS; i++) {
        if (i > last + 1 && Math.random() > 0.55) {
          addImg(new THREE.Vector3(-w + i * COL_WIDTH + COL_WIDTH / 2, -h, -d / 2), new THREE.Euler(-Math.PI / 2, 0, 0), COL_WIDTH, d);
          last = i;
        }
      }
      last = -999;
      for (let i = 0; i < FLOOR_COLS; i++) {
        if (i > last + 1 && Math.random() > 0.7) {
          addImg(new THREE.Vector3(-w + i * COL_WIDTH + COL_WIDTH / 2, h, -d / 2), new THREE.Euler(Math.PI / 2, 0, 0), COL_WIDTH, d);
          last = i;
        }
      }
      last = -999;
      for (let i = 0; i < WALL_ROWS; i++) {
        if (i > last + 1 && Math.random() > 0.6) {
          addImg(new THREE.Vector3(-w, -h + i * ROW_HEIGHT + ROW_HEIGHT / 2, -d / 2), new THREE.Euler(0, Math.PI / 2, 0), d, ROW_HEIGHT);
          last = i;
        }
      }
      last = -999;
      for (let i = 0; i < WALL_ROWS; i++) {
        if (i > last + 1 && Math.random() > 0.6) {
          addImg(new THREE.Vector3(w, -h + i * ROW_HEIGHT + ROW_HEIGHT / 2, -d / 2), new THREE.Euler(0, -Math.PI / 2, 0), d, ROW_HEIGHT);
          last = i;
        }
      }
    };

    const createSegment = (zPos: number) => {
      const group = new THREE.Group();
      group.position.z = zPos;
      const w = TUNNEL_WIDTH / 2;
      const h = TUNNEL_HEIGHT / 2;
      const d = SEGMENT_DEPTH;

      const vertices: number[] = [];
      for (let i = 0; i <= FLOOR_COLS; i++) {
        const x = -w + i * COL_WIDTH;
        vertices.push(x, -h, 0, x, -h, -d, x, h, 0, x, h, -d);
      }
      for (let i = 1; i < WALL_ROWS; i++) {
        const y = -h + i * ROW_HEIGHT;
        vertices.push(-w, y, 0, -w, y, -d, w, y, 0, w, y, -d);
      }
      vertices.push(-w, -h, 0, w, -h, 0, -w, h, 0, w, h, 0, -w, -h, 0, -w, h, 0, w, -h, 0, w, h, 0);

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
      group.add(new THREE.LineSegments(lineGeo, lineMaterial));

      populate(group, w, h, d);
      return group;
    };

    const segments: THREE.Group[] = [];
    for (let i = 0; i < NUM_SEGMENTS; i++) {
      const segment = createSegment(-i * SEGMENT_DEPTH);
      scene.add(segment);
      segments.push(segment);
    }

    const disposeSegmentImages = (segment: THREE.Group) => {
      const toRemove: THREE.Object3D[] = [];
      segment.traverse((c) => {
        if (c.name === "slab_image") toRemove.push(c);
      });
      toRemove.forEach((c) => {
        segment.remove(c);
        if (c instanceof THREE.Mesh) {
          c.geometry.dispose();
          (c.material as THREE.Material).dispose();
        }
      });
    };

    let frameId: number;
    let disposed = false;
    const animate = () => {
      if (disposed) return;
      frameId = requestAnimationFrame(animate);

      camera.position.z -= SPEED;
      const camZ = camera.position.z;
      const tunnelLength = NUM_SEGMENTS * SEGMENT_DEPTH;

      segments.forEach((segment) => {
        if (segment.position.z > camZ + SEGMENT_DEPTH) {
          const minZ = Math.min(...segments.map((s) => s.position.z));
          segment.position.z = minZ - SEGMENT_DEPTH;
          disposeSegmentImages(segment);
          populate(segment, TUNNEL_WIDTH / 2, TUNNEL_HEIGHT / 2, SEGMENT_DEPTH);
        }
        if (segment.position.z < camZ - tunnelLength - SEGMENT_DEPTH) {
          const maxZ = Math.max(...segments.map((s) => s.position.z));
          segment.position.z = maxZ + SEGMENT_DEPTH;
          disposeSegmentImages(segment);
          populate(segment, TUNNEL_WIDTH / 2, TUNNEL_HEIGHT / 2, SEGMENT_DEPTH);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      segments.forEach(disposeSegmentImages);
      textures.forEach((t) => t.dispose());
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
