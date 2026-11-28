import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

const mount = document.querySelector("#bm-scene");
const canvas = document.querySelector("#bm-scene-canvas");
const toggle = document.querySelector("#scene-toggle");

if (mount && canvas && toggle && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.15, 9.4);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    scene.add(new THREE.AmbientLight(0xb8c9dd, 1.8));
    const keyLight = new THREE.PointLight(0xc9e66b, 48, 18);
    keyLight.position.set(3.5, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x6c9acb, 42, 16);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const machine = new THREE.Group();
    scene.add(machine);

    const materials = {
      dark: new THREE.MeshStandardMaterial({ color: 0x243b53, metalness: 0.78, roughness: 0.26 }),
      steel: new THREE.MeshStandardMaterial({ color: 0x7893a9, metalness: 0.82, roughness: 0.2 }),
      lime: new THREE.MeshStandardMaterial({ color: 0xc9e66b, emissive: 0x43551a, emissiveIntensity: 0.48, metalness: 0.42, roughness: 0.22 }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x8db5ca, metalness: 0.28, roughness: 0.12, transmission: 0.18, transparent: true, opacity: 0.72 }),
      orange: new THREE.MeshStandardMaterial({ color: 0xed7954, emissive: 0x55200e, emissiveIntensity: 0.32, metalness: 0.4, roughness: 0.25 })
    };

    const core = new THREE.Group();
    machine.add(core);
    const coreShape = new THREE.Mesh(new THREE.IcosahedronGeometry(0.86, 1), materials.dark);
    core.add(coreShape);
    const coreInner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.52, 1), materials.lime);
    core.add(coreInner);
    const coreWire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.02, 1), new THREE.MeshBasicMaterial({ color: 0xc9e66b, wireframe: true, transparent: true, opacity: 0.42 }));
    core.add(coreWire);
    const coreRing = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.018, 8, 100), materials.steel);
    coreRing.rotation.x = 1.02;
    core.add(coreRing);
    const coreRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.48, 0.012, 8, 100), materials.lime);
    coreRing2.rotation.y = 1.1;
    coreRing2.rotation.x = -0.35;
    core.add(coreRing2);

    const modules = [];
    const moduleSpecs = [
      { name: "SOFTWARE", pos: [-2.25, 1.12, 0.18], color: materials.glass, rot: [0.28, -0.35, -0.18] },
      { name: "DATA", pos: [2.28, 1.08, -0.12], color: materials.steel, rot: [-0.22, 0.38, 0.16] },
      { name: "SECURITY", pos: [-2.28, -1.18, -0.08], color: materials.lime, rot: [0.2, 0.24, 0.22] },
      { name: "INFRA", pos: [2.2, -1.18, 0.16], color: materials.orange, rot: [-0.25, -0.28, -0.2] }
    ];

    moduleSpecs.forEach((spec, index) => {
      const pivot = new THREE.Group();
      pivot.position.set(...spec.pos);
      pivot.rotation.set(...spec.rot);
      machine.add(pivot);

      const housing = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.78, 0.28), materials.dark);
      pivot.add(housing);
      const face = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.68, 0.06), spec.color);
      face.position.z = 0.18;
      pivot.add(face);
      const inset = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.075, 0.025), materials.dark);
      inset.position.set(0, 0.13, 0.225);
      pivot.add(inset);
      for (let j = 0; j < 3; j++) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.035), j === 1 ? materials.lime : materials.steel);
        bar.position.set(-0.29 + j * 0.29, -0.14, 0.23);
        pivot.add(bar);
      }
      const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.22, 0.82, 0.31)), new THREE.LineBasicMaterial({ color: 0xb6c8d6, transparent: true, opacity: 0.7 }));
      pivot.add(edge);

      const connectorGeometry = new THREE.CylinderGeometry(0.025, 0.025, 1, 10);
      const connector = new THREE.Mesh(connectorGeometry, materials.steel);
      const base = new THREE.Vector3(0, 0, 0);
      const target = new THREE.Vector3(...spec.pos);
      const mid = target.clone().multiplyScalar(0.48);
      connector.position.copy(mid);
      connector.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), target.clone().normalize());
      connector.scale.y = Math.max(0.2, target.length() * 0.72);
      machine.add(connector);

      modules.push({ pivot, base: new THREE.Vector3(...spec.pos), connector, connectorBase: connector.scale.y, index });
    });

    const halo = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.009, 6, 120), new THREE.MeshBasicMaterial({ color: 0x7393ad, transparent: true, opacity: 0.28 }));
    halo.rotation.x = 1.28;
    machine.add(halo);
    const floorRing = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.012, 6, 100), new THREE.MeshBasicMaterial({ color: 0xc9e66b, transparent: true, opacity: 0.24 }));
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.y = -1.65;
    machine.add(floorRing);

    const pointer = { x: 0, y: 0 };
    let expanded = false;
    let targetExpansion = 0;
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      const rect = mount.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 560 ? 11.3 : 9.4;
      camera.updateProjectionMatrix();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    mount.addEventListener("pointermove", (event) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    });
    mount.addEventListener("pointerleave", () => { pointer.x = 0; pointer.y = 0; });

    toggle.addEventListener("click", () => {
      expanded = !expanded;
      targetExpansion = expanded ? 1 : 0;
      toggle.setAttribute("aria-pressed", String(expanded));
      toggle.querySelector(".toggle-label").textContent = expanded ? "RETRACT SYSTEM" : "EXPAND SYSTEM";
      toggle.querySelector(".toggle-icon").textContent = expanded ? "↙" : "↗";
      mount.classList.toggle("is-expanded", expanded);
    });

    const clock = new THREE.Clock();
    function animate() {
      frame = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const t = clock.elapsedTime;
      const blend = 1 - Math.pow(0.0008, delta);
      machine.rotation.y += (pointer.x * 0.22 - machine.rotation.y) * blend;
      machine.rotation.x += (-pointer.y * 0.13 - machine.rotation.x) * blend;
      machine.rotation.z = Math.sin(t * 0.22) * 0.035;

      modules.forEach((module, index) => {
        const direction = module.base.clone().normalize();
        const amount = targetExpansion;
        const distance = 1.05 * amount + Math.sin(t * 0.85 + index * 1.3) * 0.045;
        const destination = module.base.clone().add(direction.multiplyScalar(distance));
        module.pivot.position.lerp(destination, 0.075);
        module.pivot.rotation.y += 0.0025 * (index % 2 ? 1 : -1);
        module.connector.scale.y += ((module.connectorBase + amount * 0.52) - module.connector.scale.y) * 0.08;
        const connectorTarget = destination.clone().multiplyScalar(0.48);
        module.connector.position.lerp(connectorTarget, 0.08);
        module.connector.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), destination.clone().normalize());
      });

      core.rotation.y = t * 0.18;
      core.rotation.x = Math.sin(t * 0.32) * 0.08;
      coreRing.rotation.z = t * 0.16;
      coreRing2.rotation.z = -t * 0.12;
      halo.rotation.z = t * 0.035;
      renderer.render(scene, camera);
    }
    animate();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else animate();
    });
  } catch (error) {
    mount.classList.add("scene-fallback-mode");
    toggle.disabled = true;
    toggle.querySelector(".toggle-label").textContent = "3D UNAVAILABLE";
  }
}
