"use client";

import React, { useEffect, useRef } from 'react';

interface BeamGridBackgroundProps {
  gridSize?: number;
  gridColor?: string;
  darkGridColor?: string;
  beamColor?: string;
  darkBeamColor?: string;
  beamCount?: number;
  extraBeamCount?: number;
  beamSpeed?: number;
  beamThickness?: number;
  beamGlow?: boolean;
  glowIntensity?: number;
  idleSpeed?: number;
  showFade?: boolean;
  fadeIntensity?: number;
  asBackground?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function BeamGridBackground({
  gridSize = 40,
  gridColor = '#22c55e',
  darkGridColor = '#22c55e',
  beamColor = 'rgba(34, 197, 94, 0.85)',
  darkBeamColor = 'rgba(34, 197, 94, 0.95)',
  beamCount = 6,
  extraBeamCount = 2,
  beamSpeed = 0.12,
  beamThickness = 3,
  beamGlow = true,
  glowIntensity = 45,
  idleSpeed = 1.15,
  showFade = true,
  fadeIntensity = 18,
  asBackground = true,
  className = '',
  children,
}: BeamGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let beams: Array<{
      x: number;
      y: number;
      direction: 'horizontal' | 'vertical';
      progress: number;
      speed: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initBeams = () => {
      beams = [];
      const totalBeams = beamCount + extraBeamCount;
      
      for (let i = 0; i < totalBeams; i++) {
        beams.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          direction: Math.random() > 0.5 ? 'horizontal' : 'vertical',
          progress: Math.random(),
          speed: beamSpeed * (0.8 + Math.random() * 0.4) * idleSpeed,
        });
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = darkGridColor;
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawBeam = (beam: typeof beams[0]) => {
      ctx.save();

      if (beamGlow) {
        ctx.shadowColor = darkBeamColor;
        ctx.shadowBlur = glowIntensity;
      }

      const gradient = beam.direction === 'horizontal'
        ? ctx.createLinearGradient(0, beam.y, canvas.width, beam.y)
        : ctx.createLinearGradient(beam.x, 0, beam.x, canvas.height);

      const beamLength = 0.3;
      const start = Math.max(0, beam.progress - beamLength);
      const end = Math.min(1, beam.progress);

      if (showFade) {
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(Math.max(0, (start - beam.progress + beamLength) / beamLength), 'transparent');
        gradient.addColorStop(Math.max(0, (start - beam.progress + beamLength) / beamLength + 0.1), darkBeamColor);
        gradient.addColorStop(Math.min(1, (end - beam.progress + beamLength) / beamLength), darkBeamColor);
        gradient.addColorStop(1, 'transparent');
      } else {
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(start, 'transparent');
        gradient.addColorStop(start + 0.1, darkBeamColor);
        gradient.addColorStop(end, darkBeamColor);
        gradient.addColorStop(1, 'transparent');
      }

      ctx.strokeStyle = gradient;
      ctx.lineWidth = beamThickness;

      if (beam.direction === 'horizontal') {
        ctx.beginPath();
        ctx.moveTo(0, beam.y);
        ctx.lineTo(canvas.width, beam.y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(beam.x, 0);
        ctx.lineTo(beam.x, canvas.height);
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();

      beams.forEach((beam) => {
        drawBeam(beam);
        beam.progress += beam.speed;

        if (beam.progress > 1.3) {
          beam.progress = -0.3;
          beam.x = Math.random() * canvas.width;
          beam.y = Math.random() * canvas.height;
          beam.direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initBeams();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initBeams();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [
    gridSize,
    gridColor,
    darkGridColor,
    beamColor,
    darkBeamColor,
    beamCount,
    extraBeamCount,
    beamSpeed,
    beamThickness,
    beamGlow,
    glowIntensity,
    idleSpeed,
    showFade,
    fadeIntensity,
  ]);

  const containerClasses = asBackground
    ? `absolute inset-0 ${className}`
    : `relative ${className}`;

  return (
    <div className={containerClasses}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}