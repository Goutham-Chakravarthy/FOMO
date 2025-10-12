/*Ensure you had installed the package
or read our installation document. (go to lightswind.com/components/Installation)
npm i lightswind@latest*/

"use client";

import React, { useEffect, useRef, useState } from "react";

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
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const cols = Math.floor(rect.width / gridSize);
        const rows = Math.floor(rect.height / gridSize);

        const primaryBeams = Array.from({ length: beamCount }).map(() => ({
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows),
            dir: (Math.random() > 0.5 ? "x" : "y") as "x" | "y",
            offset: Math.random() * gridSize,
            speed: beamSpeed + Math.random() * 0.3,
            type: "primary",
        }));

        const extraBeams = Array.from({ length: extraBeamCount }).map(() => ({
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows),
            dir: (Math.random() > 0.5 ? "x" : "y") as "x" | "y",
            offset: Math.random() * gridSize,
            speed: beamSpeed * 0.5 + Math.random() * 0.1,
            type: "extra",
        }));

        const allBeams = [...primaryBeams, ...extraBeams];

        const updateMouse = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            lastMouseMoveRef.current = Date.now();
        };

        if (interactive) window.addEventListener("mousemove", updateMouse);

        const draw = () => {
            ctx.clearRect(0, 0, rect.width, rect.height);

            const lineColor = isDarkMode ? darkGridColor : gridColor;
            const activeBeamColor = isDarkMode ? darkBeamColor : beamColor;

            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            for (let x = 0; x <= rect.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, rect.height);
                ctx.stroke();
            }
            for (let y = 0; y <= rect.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(rect.width, y);
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
                    const start = -beamLength + (beam.offset % (rect.width + beamLength));

                    ctx.moveTo(start, y);
                    ctx.lineTo(start + beamLength, y);
                    ctx.stroke();

                    beam.offset += idle ? beam.speed * idleSpeed * 60 : beam.speed * 60;
                    if (beam.offset > rect.width + beamLength) beam.offset = -beamLength;
                } else {
                    const x = beam.x * gridSize;
                    const beamLength = gridSize * 1.5;
                    const start = -beamLength + (beam.offset % (rect.height + beamLength));

                    ctx.moveTo(x, start);
                    ctx.lineTo(x, start + beamLength);
                    ctx.stroke();

                    beam.offset += idle ? beam.speed * idleSpeed * 60 : beam.speed * 60;
                    if (beam.offset > rect.height + beamLength) beam.offset = -beamLength;
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

                            if (cellX >= 0 && cellX < rect.width && cellY >= 0 && cellY < rect.height) {
                                ctx.beginPath();
                                ctx.rect(cellX, cellY, gridSize, gridSize);
                                ctx.stroke();
                            }
                        }
                    }
                });
            }

            requestAnimationFrame(draw);
        };

        draw();

        return () => {
            if (interactive) window.removeEventListener("mousemove", updateMouse);
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

    return (
        <div
            ref={containerRef}
            className={`relative ${className || ""}`}
            {...props}
            style={{
                position: asBackground ? "absolute" : "relative",
                top: asBackground ? 0 : undefined,
                left: asBackground ? 0 : undefined,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                ...(props.style || {}),
            }}
        >
            <canvas
                ref={canvasRef}
                className={`absolute top-0 left-0 w-full h-full z-0 pointer-events-none`}
            />

            {showFade && (
                <div
                    className="pointer-events-none absolute inset-0 bg-white dark:bg-black"
                    style={{
                        maskImage: `radial-gradient(ellipse at center, transparent ${fadeIntensity}%, black)`,
                        WebkitMaskImage: `radial-gradient(ellipse at center, transparent ${fadeIntensity}%, black)`,
                    }}
                />
            )}

            {!asBackground && (
                <div className="relative z-0 w-full h-full">{children}</div>
            )}
        </div>
    );
};

export default BeamGridBackground;
