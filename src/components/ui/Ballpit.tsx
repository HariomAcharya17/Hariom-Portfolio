import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SKILLS_LIST = [
  { name: 'React', bg: '#20232a', text: 'React', color: '#61dafb' },
  { name: 'JavaScript', bg: '#f7df1e', text: 'JS', color: '#000000' },
  { name: 'TypeScript', bg: '#3178c6', text: 'TS', color: '#ffffff' },
  { name: 'C', bg: '#a8b9cc', text: 'C', color: '#183059' },
  { name: 'C++', bg: '#00599c', text: 'C++', color: '#ffffff' },
  { name: 'Python', bg: '#3776ab', text: 'Py', color: '#ffd343' },
  { name: 'Supabase', bg: '#1c1c1c', text: 'Supa', color: '#3ecf8e' },
  { name: 'MongoDB', bg: '#001e2b', text: 'MDB', color: '#00ed64' },
  { name: 'Vercel', bg: '#000000', text: '▲', color: '#ffffff' },
  { name: 'VS Code', bg: '#007acc', text: 'VS', color: '#ffffff' },
  { name: 'IoT', bg: '#00a3e0', text: 'IoT', color: '#ffffff' },
  { name: 'Arduino', bg: '#00979d', text: '∞', color: '#ffffff' }
];

// Generates a texture for each ball with the logo/pattern
function createSkillTexture(skill: typeof SKILLS_LIST[0]) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = skill.bg;
  ctx.fillRect(0, 0, 256, 256);

  // Decorative pattern lines
  ctx.strokeStyle = skill.color;
  ctx.lineWidth = 4;
  ctx.globalAlpha = 0.2;
  ctx.beginPath();
  ctx.arc(128, 128, 100, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(128, 128, 60, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1.0;

  // Text / Logo
  ctx.fillStyle = skill.color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  if (skill.name === 'React') {
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('React', 128, 128);
  } else {
    ctx.font = 'bold 72px "Courier New", monospace';
    ctx.fillText(skill.text, 128, 128);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export default function Ballpit({ count = 12, gravity = 0.3, friction = 0.98, wallBounce = 0.8, followCursor = true }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Three Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Sphere Geometry & Material Setup for the 12 skill balls
    const radius = 0.9;
    const geometry = new THREE.SphereGeometry(radius, 32, 32);

    const ballsData = SKILLS_LIST.map((skill, index) => {
      const texture = createSkillTexture(skill);
      const material = new THREE.MeshPhysicalMaterial({
        map: texture,
        roughness: 0.2,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
      });

      const mesh = new THREE.Mesh(geometry, material);
      
      // Random starting positions spread horizontally
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4 + 2,
        (Math.random() - 0.5) * 1
      );
      
      scene.add(mesh);

      return {
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          0
        ),
        radius
      };
    });

    // Boundaries
    const maxX = 7.5;
    const maxY = 3.5;

    // Mouse Interaction
    const mouse = new THREE.Vector2();
    const mouse3D = new THREE.Vector3();
    let mouseActive = false;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.set(x, y);
      
      // Project mouse to 3D space
      mouse3D.set(x, y, 0.5).unproject(camera);
      const dir = mouse3D.clone().sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouse3D.copy(camera.position).add(dir.multiplyScalar(distance));
      mouseActive = true;
    };

    const handlePointerLeave = () => {
      mouseActive = false;
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerleave', handlePointerLeave);

    // Physics Simulation loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Physics update
      ballsData.forEach((ball, idx) => {
        // Gravity
        ball.velocity.y -= gravity * 0.05;
        
        // Friction
        ball.velocity.multiplyScalar(friction);
        
        // Update position
        ball.mesh.position.add(ball.velocity);

        // Follow Cursor force
        if (followCursor && mouseActive) {
          const toMouse = mouse3D.clone().sub(ball.mesh.position);
          toMouse.z = 0; // Keep in 2D plane
          const dist = toMouse.length();
          if (dist < 4) {
            const force = (4 - dist) * 0.01;
            ball.velocity.add(toMouse.normalize().multiplyScalar(force));
          }
        }

        // Boundary Collisions (Left/Right)
        if (Math.abs(ball.mesh.position.x) + ball.radius > maxX) {
          ball.mesh.position.x = Math.sign(ball.mesh.position.x) * (maxX - ball.radius);
          ball.velocity.x = -ball.velocity.x * wallBounce;
        }

        // Boundary Collisions (Bottom/Top)
        if (ball.mesh.position.y - ball.radius < -maxY) {
          ball.mesh.position.y = -maxY + ball.radius;
          ball.velocity.y = -ball.velocity.y * wallBounce;
          ball.velocity.x *= 0.95; // Ground friction
        } else if (ball.mesh.position.y + ball.radius > maxY) {
          ball.mesh.position.y = maxY - ball.radius;
          ball.velocity.y = -ball.velocity.y * wallBounce;
        }

        // Ball to Ball Collisions
        for (let j = idx + 1; j < ballsData.length; j++) {
          const other = ballsData[j];
          const diff = other.mesh.position.clone().sub(ball.mesh.position);
          diff.z = 0; // Keep flat
          const dist = diff.length();
          const minDist = ball.radius + other.radius;

          if (dist < minDist) {
            const overlap = minDist - dist;
            const normal = diff.clone().normalize();

            // Push apart
            ball.mesh.position.sub(normal.clone().multiplyScalar(overlap * 0.5));
            other.mesh.position.add(normal.clone().multiplyScalar(overlap * 0.5));

            // Elastic collision velocities exchange
            const relativeVelocity = ball.velocity.clone().sub(other.velocity);
            const speed = relativeVelocity.dot(normal);

            if (speed > 0) {
              const impulse = speed * wallBounce;
              ball.velocity.sub(normal.clone().multiplyScalar(impulse));
              other.velocity.add(normal.clone().multiplyScalar(impulse));
            }
          }
        }

        // Subtle rotation based on velocity
        ball.mesh.rotateOnAxis(new THREE.Vector3(1, 0.5, 0).normalize(), ball.velocity.length() * 0.3);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerleave', handlePointerLeave);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [gravity, friction, wallBounce, followCursor]);

  return <div ref={containerRef} className="w-full h-full relative" style={{ overflow: 'hidden' }} />;
}
