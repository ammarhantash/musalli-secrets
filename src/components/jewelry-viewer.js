import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { store } from '../state/config-store.js';

const METAL_CFG = {
  gold:     { color: '#C5A059', metalness: 0.55, roughness: 0.30 },
  platinum: { color: '#D8D8DA', metalness: 0.65, roughness: 0.18 },
};

const GEM_CFG = {
  diamond: { color: '#D4F1F9', metalness: 0.05, roughness: 0.0,  transparent: true,  opacity: 0.88 },
  emerald: { color: '#3CB371', metalness: 0.08, roughness: 0.18, transparent: false, opacity: 1 },
  ruby:    { color: '#9B111E', metalness: 0.12, roughness: 0.15, transparent: false, opacity: 1 },
};

class JewelryViewer extends HTMLElement {
  connectedCallback() {
    this.style.cssText = 'display:block;position:absolute;inset:0;overflow:hidden;';
    this._ro = new ResizeObserver(entries => {
      const { width: w, height: h } = entries[0].contentRect;
      if (!this._renderer && w > 0 && h > 0) {
        this._setup(w, h);
      } else if (this._renderer && w > 0 && h > 0) {
        this._camera.aspect = w / h;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(w, h, false);
      }
    });
    this._ro.observe(this);
  }

  // Called by configurator-page.js as a hint; ResizeObserver also triggers init
  startViewer() {
    if (this._renderer) return;
    const w = this.offsetWidth;
    const h = this.offsetHeight;
    if (w > 0 && h > 0) this._setup(w, h);
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    this._renderer?.dispose();
    this._ro?.disconnect();
    if (this._onConfigChange) store.removeEventListener('config-change', this._onConfigChange);
  }

  _setup(w, h) {
    try {
      this._build(w, h);
    } catch (e) {
      console.error('[jewelry-viewer] WebGL init failed:', e);
      this.innerHTML = `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#C5A059;font-size:0.65rem;letter-spacing:0.15em;text-align:center;padding:1rem;pointer-events:none">VIEWER ERROR<br><span style="color:#666;margin-top:0.5rem;display:block;font-size:0.6rem">${String(e)}</span></div>`;
      return;
    }
    this._onConfigChange = () => { try { this._updateMaterials(); } catch {} };
    store.addEventListener('config-change', this._onConfigChange);
    // Apply current store state immediately
    this._updateMaterials();
  }

  _build(w, h) {
    // Renderer
    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.setSize(w, h, false);
    this._renderer.setClearColor(0x1A1A1A);
    this._renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;';
    this.appendChild(this._renderer.domElement);

    // Scene
    this._scene = new THREE.Scene();
    try {
      const pmrem = new THREE.PMREMGenerator(this._renderer);
      this._scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      pmrem.dispose();
    } catch {}

    // Camera
    this._camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    this._camera.position.set(0, 1.8, 3.5);

    // Controls
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    this._controls.enablePan     = false;
    this._controls.minDistance   = 1.5;
    this._controls.maxDistance   = 7;
    this._controls.enableDamping = true;
    this._controls.dampingFactor = 0.05;
    this._controls.minPolarAngle = Math.PI / 6;
    this._controls.maxPolarAngle = Math.PI - Math.PI / 6;

    // Lighting — strong enough to show the ring without env map
    this._scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(3, 5, 4);
    this._scene.add(key);

    const fill = new THREE.DirectionalLight(0xFFE8B0, 1.2);
    fill.position.set(-4, 2, -2);
    this._scene.add(fill);

    const front = new THREE.DirectionalLight(0xffffff, 1.0);
    front.position.set(0, 1, 6);
    this._scene.add(front);

    const rim = new THREE.DirectionalLight(0xC5A059, 0.6);
    rim.position.set(0, -3, -4);
    this._scene.add(rim);

    // Geometry
    this._prongs = [];
    this._buildGeometry();

    // Animate
    this._animate();
  }

  _buildGeometry() {
    const g = this._group = new THREE.Group();
    this._scene.add(g);

    this._bandMesh = new THREE.Mesh(
      new THREE.TorusGeometry(1.0, 0.13, 48, 120),
      new THREE.MeshStandardMaterial()
    );
    this._bandMesh.rotation.x = Math.PI / 2;
    g.add(this._bandMesh);

    this._bezelMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.17, 0.14, 8),
      new THREE.MeshStandardMaterial()
    );
    this._bezelMesh.position.set(0, 0.13, 1.0);
    g.add(this._bezelMesh);

    this._platMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.20, 0.22, 0.04, 8),
      new THREE.MeshStandardMaterial()
    );
    this._platMesh.position.set(0, 0.21, 1.0);
    g.add(this._platMesh);

    this._prongs = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2].map(angle => {
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.018, 0.22, 6),
        new THREE.MeshStandardMaterial()
      );
      mesh.position.set(Math.cos(angle) * 0.19, 0.27, 1.0 + Math.sin(angle) * 0.19);
      mesh.rotation.set(0.45, angle, 0);
      g.add(mesh);
      return mesh;
    });

    this._gemMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(1, 0),
      new THREE.MeshStandardMaterial()
    );
    this._gemMesh.position.set(0, 0.33, 1.0);
    g.add(this._gemMesh);
  }

  _updateMaterials() {
    if (!this._bandMesh) return;
    const { metalType, gemType, caratWeight } = store;
    const mc = METAL_CFG[metalType] || METAL_CFG.gold;
    const gc = GEM_CFG[gemType]   || GEM_CFG.diamond;

    const metalProps = {
      color: new THREE.Color(mc.color),
      metalness: mc.metalness,
      roughness: mc.roughness,
      envMapIntensity: 1.2,
    };

    for (const mesh of [this._bandMesh, this._bezelMesh, this._platMesh, ...(this._prongs || [])]) {
      if (!mesh) continue;
      Object.assign(mesh.material, metalProps);
      mesh.material.needsUpdate = true;
    }

    if (this._gemMesh) {
      Object.assign(this._gemMesh.material, {
        color: new THREE.Color(gc.color),
        metalness: gc.metalness,
        roughness: gc.roughness,
        transparent: gc.transparent,
        opacity: gc.opacity,
        envMapIntensity: 2.0,
      });
      this._gemMesh.material.needsUpdate = true;
      const scale = 0.18 + ((caratWeight - 0.5) / 4.5) * 0.22;
      this._gemMesh.scale.setScalar(scale);
    }
  }

  _animate() {
    this._raf = requestAnimationFrame(() => this._animate());
    if (this._group) this._group.rotation.y += 0.004;
    this._controls?.update();
    this._renderer?.render(this._scene, this._camera);
  }
}

customElements.define('jewelry-viewer', JewelryViewer);
