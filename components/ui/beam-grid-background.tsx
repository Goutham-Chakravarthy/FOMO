/*Ensure you had installed the package
or read our installation document. (go to lightswind.com/components/Installation)
npm i lightswind@latest*/

"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./beam-grid-background.module.css";

export interface BeamGridBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    gridSize?: number;
    gridColor?: string;
    darkGridColor?: string;
    beamColor?: string;
    darkBeamColor?: string;
    beamSpeed?: number;
    beamThickness?: number;
    beamGlow?: boolean;
    glowIntensity?: number;
    beamCount?: number;
    extraBeamCount?: number;
    idleSpeed?: number;
    interactive?: boolean;
    asBackground?: boolean;
    className?: string;
    children?: React.ReactNode;
    showFade?: boolean;
    fadeIntensity?: number;
}

const BeamGridBackground: React.FC<BeamGridBackgroundProps> = ({
    gridSize = 40,
    gridColor = "#e5e7eb",
    darkGridColor = "#27272a",
    beamColor = "rgba(34, 197, 94, 0.85)", // tailwind green-500
    darkBeamColor = "rgba(34, 197, 94, 0.95)",
    beamSpeed = 0.1,
    beamThickness = 3,
    beamGlow = true,
    glowIntensity = 40,
    beamCount = 8,
    extraBeamCount = 3,
    idleSpeed = 1.15,
    interactive = true,
    asBackground = true,
    showFade = true,
    fadeIntensity = 20,
    className,
    children,
    ...props
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const lastMouseMoveRef = useRef(Date.now());

    useEffect(() => {
        const updateDarkMode = () => {
            const prefersDark =
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches;
            setIsDarkMode(
                document.documentElement.classList.contains("dark") || prefersDark
            );
        };
        updateDarkMode();
        const observer = new MutationObserver(() => updateDarkMode());
        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d")!;

        let allBeams: Array<{
            x: number;
            y: number;
            dir: "x" | "y";
            offset: number;
            speed: number;
            type: "primary" | "extra";
        }> = [];

        const initScene = () => {
            const rect = container.getBoundingClientRect();
            const width = Math.max(1, Math.floor(rect.width));
            const height = Math.max(1, Math.floor(rect.height));
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            const cols = Math.max(1, Math.floor(width / gridSize));
            const rows = Math.max(1, Math.floor(height / gridSize));

            const primaryBeams = Array.from({ length: beamCount }).map(() => ({
                x: Math.floor(Math.random() * cols),
                y: Math.floor(Math.random() * rows),
                dir: (Math.random() > 0.5 ? "x" : "y") as "x" | "y",
                offset: Math.random() * gridSize,
                speed: beamSpeed + Math.random() * 0.3,
                type: "primary" as const,
            }));

            const extraBeams = Array.from({ length: extraBeamCount }).map(() => ({
                x: Math.floor(Math.random() * cols),
                y: Math.floor(Math.random() * rows),
                dir: (Math.random() > 0.5 ? "x" : "y") as "x" | "y",
                offset: Math.random() * gridSize,
                speed: beamSpeed * 0.5 + Math.random() * 0.1,
                type: "extra" as const,
            }));

            allBeams = [...primaryBeams, ...extraBeams];
        };

        const updateMouse = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            lastMouseMoveRef.current = Date.now();
        };

        if (interactive) window.addEventListener("mousemove", updateMouse);

        let rafId = 0;
        const draw = () => {
            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);

            const lineColor = isDarkMode ? darkGridColor : gridColor;
            const activeBeamColor = isDarkMode ? darkBeamColor : beamColor;

            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            const now = Date.now();
            const idle = now - lastMouseMoveRef.current > 2000;

            allBeams.forEach((beam) => {
                ctx.strokeStyle = activeBeamColor;
                ctx.lineWidth = beam.type === "extra" ? beamThickness * 0.75 : beamThickness;

                if (beamGlow) {
                    ctx.shadowBlur = glowIntensity;
                    ctx.shadowColor = activeBeamColor;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.beginPath();
                if (beam.dir === "x") {
                    const y = beam.y * gridSize;
                    const beamLength = gridSize * 1.5;
                    const start = -beamLength + (beam.offset % (width + beamLength));

                    ctx.moveTo(start, y);
                    ctx.lineTo(start + beamLength, y);
                    ctx.stroke();

                    beam.offset += idle ? beam.speed * idleSpeed * 60 : beam.speed * 60;
                    if (beam.offset > width + beamLength) beam.offset = -beamLength;
                } else {
                    const x = beam.x * gridSize;
                    const beamLength = gridSize * 1.5;
                    const start = -beamLength + (beam.offset % (height + beamLength));

                    ctx.moveTo(x, start);
                    ctx.lineTo(x, start + beamLength);
                    ctx.stroke();

                    beam.offset += idle ? beam.speed * idleSpeed * 60 : beam.speed * 60;
                    if (beam.offset > height + beamLength) beam.offset = -beamLength;
                }
            });

            ctx.shadowBlur = 0;

            if (interactive && !idle) {
                const targetX = mouseRef.current.x;
                const targetY = mouseRef.current.y;
                const centerGx = Math.floor(targetX / gridSize) * gridSize;
                const centerGy = Math.floor(targetY / gridSize) * gridSize;

                const highlights = [
                    { x: centerGx, y: centerGy, radius: 0, lineWidth: beamThickness * 3, glowFactor: 3 },
                    { x: centerGx, y: centerGy, radius: 1, lineWidth: beamThickness * 1.5, glowFactor: 1.5 },
                    { x: centerGx, y: centerGy, radius: 2, lineWidth: beamThickness * 0.75, glowFactor: 0.75 },
                ];

                highlights.forEach(({ x, y, radius, lineWidth, glowFactor }) => {
                    ctx.strokeStyle = activeBeamColor;
                    ctx.lineWidth = lineWidth;
                    ctx.shadowBlur = glowIntensity * glowFactor;
                    ctx.shadowColor = activeBeamColor;

                    for (let dx = -radius; dx <= radius; dx++) {
                        for (let dy = -radius; dy <= radius; dy++) {
                            if (radius === 1 && Math.abs(dx) <= 0 && Math.abs(dy) <= 0) continue;
                            if (radius === 2 && Math.abs(dx) <= 1 && Math.abs(dy) <= 1) continue;

                            const cellX = x + dx * gridSize;
                            const cellY = y + dy * gridSize;

                            if (cellX >= 0 && cellX < width && cellY >= 0 && cellY < height) {
                                ctx.beginPath();
                                ctx.rect(cellX, cellY, gridSize, gridSize);
                                ctx.stroke();
                            }
                        }
                    }
                });
            }

            rafId = requestAnimationFrame(draw);
        };

        initScene();
        draw();

        const ro = new ResizeObserver(() => {
            initScene();
        });
        ro.observe(container);

        return () => {
            if (interactive) window.removeEventListener("mousemove", updateMouse);
            ro.disconnect();
            cancelAnimationFrame(rafId);
        };
    }, [
        gridSize,
        beamColor,
        darkBeamColor,
        gridColor,
        darkGridColor,
        beamSpeed,
        beamCount,
        extraBeamCount,
        beamThickness,
        glowIntensity,
        beamGlow,
        isDarkMode,
        idleSpeed,
        interactive,
    ]);

    // Prevent passing inline styles to avoid lint warnings
    const { style: _ignoredStyle, ...restProps } = props as any;

    // Compute mask class based on fadeIntensity rounded to nearest 10
    const clamped = Math.max(0, Math.min(100, Math.round(fadeIntensity)));
    const decile = Math.round(clamped / 10) * 10;
    const fadeClass = (styles as Record<string, string>)[`maskFade${decile}`] || "";

    // Container classes instead of inline style (do not override absolute with a trailing relative)
    const positionClass = asBackground ? "absolute top-0 left-0 w-full h-full" : "relative w-full h-full";
    const containerClass = `${positionClass} overflow-hidden ${className || ""}`;

    return (
        <div
            ref={containerRef}
            className={containerClass}
            {...restProps}
        >
            <canvas
                ref={canvasRef}
                className={`absolute top-0 left-0 w-full h-full z-0 pointer-events-none`}
            />

            {showFade && (
                <div
                    className={`pointer-events-none absolute inset-0 bg-white dark:bg-black ${fadeClass}`}
                />
            )}

            {!asBackground && (
                <div className="relative z-0 w-full h-full">{children}</div>
            )}
        </div>
    );
};

export default BeamGridBackground;
