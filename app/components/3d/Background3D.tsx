'use client';

import { useEffect, useRef } from 'react';

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Wave {
      y: number;
      amplitude: number;
      frequency: number;
      speed: number;
      color: string;
      opacity: number;

      constructor(y: number, amplitude: number, frequency: number, speed: number, color: string, opacity: number) {
        this.y = y;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
        this.color = color;
        this.opacity = opacity;
      }

      draw(time: number) {
        if (!ctx || !canvas) return;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x++) {
          const y = this.y + Math.sin((x * this.frequency) + (time * this.speed)) * this.amplitude;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        const gradient = ctx.createLinearGradient(0, this.y - this.amplitude, 0, canvas.height);
        gradient.addColorStop(0, this.color + this.opacity + ')');
        gradient.addColorStop(1, this.color + '0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      pulseSpeed: number;
      pulsePhase: number;
      trail: { x: number; y: number }[];

      constructor() {
        if (!canvas) throw new Error('Canvas not initialized');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.7 + 0.3;
        const colors = ['rgba(96, 165, 250, ', 'rgba(59, 130, 246, ', 'rgba(37, 99, 235, ', 'rgba(14, 165, 233, '];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.trail = [];
      }

      update() {
        if (!canvas) return;
        this.trail.unshift({ x: this.x, y: this.y });
        if (this.trail.length > 8) this.trail.pop();
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulsePhase += this.pulseSpeed;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        if (this.y < -50) this.y = canvas.height + 50;
      }

      draw() {
        if (!ctx) return;
        const pulse = Math.sin(this.pulsePhase) * 0.4 + 0.6;
        const currentSize = this.size * pulse;
        this.trail.forEach((point, index) => {
          const trailOpacity = (this.opacity * (1 - index / 8)) * 0.5;
          const trailSize = currentSize * (1 - index / 8);
          ctx.fillStyle = this.color + trailOpacity + ')';
          ctx.beginPath();
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
          ctx.fill();
        });
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentSize * 4);
        gradient.addColorStop(0, this.color + (this.opacity * pulse) + ')');
        gradient.addColorStop(0.4, this.color + (this.opacity * pulse * 0.4) + ')');
        gradient.addColorStop(1, this.color + '0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class FloatingOrb {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      color: string;
      pulsePhase: number;
      pulseSpeed: number;

      constructor() {
        if (!canvas) throw new Error('Canvas not initialized');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 60 + 40;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        const colors = ['rgba(96, 165, 250, ', 'rgba(59, 130, 246, ', 'rgba(37, 99, 235, '];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        if (!canvas) return;
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulsePhase += this.pulseSpeed;
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;
      }

      draw() {
        if (!ctx) return;
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const currentRadius = this.radius * pulse;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentRadius);
        gradient.addColorStop(0, this.color + '0.15)');
        gradient.addColorStop(0.5, this.color + '0.08)');
        gradient.addColorStop(1, this.color + '0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const waves = [
      new Wave(canvas.height * 0.7, 40, 0.005, 0.002, 'rgba(96, 165, 250, ', 0.1),
      new Wave(canvas.height * 0.75, 35, 0.006, 0.0025, 'rgba(59, 130, 246, ', 0.08),
      new Wave(canvas.height * 0.8, 30, 0.007, 0.003, 'rgba(37, 99, 235, ', 0.06),
      new Wave(canvas.height * 0.85, 25, 0.008, 0.0035, 'rgba(14, 165, 233, ', 0.04),
    ];

    const particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const orbs: FloatingOrb[] = [];
    for (let i = 0; i < 8; i++) orbs.push(new FloatingOrb());

    let mouse = { x: canvas.width / 2, y: canvas.height / 2, radius: 150 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!canvas || !ctx) return;
      time += 0.01;
      ctx.fillStyle = 'rgba(10, 14, 39, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      waves.forEach(wave => wave.draw(time));
      orbs.forEach(orb => { orb.update(); orb.draw(); });
      particles.forEach((particle) => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;
          particle.x -= Math.cos(angle) * force * 3;
          particle.y -= Math.sin(angle) * force * 3;
        }
        particle.update();
        particle.draw();
      });
      particles.forEach((particleA, indexA) => {
        particles.slice(indexA + 1, indexA + 4).forEach((particleB) => {
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.4;
            const gradient = ctx.createLinearGradient(particleA.x, particleA.y, particleB.x, particleB.y);
            gradient.addColorStop(0, `rgba(96, 165, 250, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(59, 130, 246, ${opacity})`);
            gradient.addColorStop(1, `rgba(37, 99, 235, ${opacity})`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
          }
        });
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at top, #0f1729 0%, #0a0e27 50%, #050810 100%)' }} />
      <div className="fixed inset-0 -z-10 opacity-25 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-blue-400 rounded-full filter blur-[150px]" style={{ animation: 'float 15s ease-in-out infinite' }} />
        <div className="absolute -top-20 -right-40 w-[700px] h-[700px] bg-blue-500 rounded-full filter blur-[140px]" style={{ animation: 'float 18s ease-in-out infinite', animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600 rounded-full filter blur-[160px]" style={{ animation: 'float 20s ease-in-out infinite', animationDelay: '6s' }} />
        <div className="absolute -bottom-40 -left-20 w-[750px] h-[750px] bg-sky-500 rounded-full filter blur-[145px]" style={{ animation: 'float 17s ease-in-out infinite', animationDelay: '2s' }} />
        <div className="absolute -bottom-20 -right-40 w-[800px] h-[800px] bg-blue-400 rounded-full filter blur-[150px]" style={{ animation: 'float 19s ease-in-out infinite', animationDelay: '5s' }} />
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-indigo-400 rounded-full filter blur-[130px]" style={{ animation: 'float 16s ease-in-out infinite', animationDelay: '4s' }} />
      </div>
    </>
  );
}
