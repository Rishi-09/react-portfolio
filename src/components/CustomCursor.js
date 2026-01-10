import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
export const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
    const sizeRef = useRef({ current: 24, target: 24 });
    const rafRef = useRef(null);
    /* ===============================
       ENABLE / DISABLE CURSOR GLOBALLY
       =============================== */
    useEffect(() => {
        if (isTouchDevice)
            return;
        document.body.classList.add("custom-cursor-enabled");
        setIsVisible(true); // make cursor visible immediately
        return () => {
            document.body.classList.remove("custom-cursor-enabled");
        };
    }, [isTouchDevice]);
    /* ===============================
       MAIN CURSOR LOGIC
       =============================== */
    useEffect(() => {
        const checkTouch = () => {
            const isTouch = "ontouchstart" in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia("(max-width: 768px)").matches;
            setIsTouchDevice(isTouch);
        };
        checkTouch();
        window.addEventListener("resize", checkTouch, { passive: true });
        window.addEventListener("touchstart", () => setIsTouchDevice(true), { once: true, passive: true });
        if (isTouchDevice)
            return;
        const moveCursor = (e) => {
            posRef.current.targetX = e.clientX;
            posRef.current.targetY = e.clientY;
        };
        const handleOver = (e) => {
            const target = e.target;
            if (!target)
                return;
            const interactiveEl = target.closest("a, button, .magnetic-target");
            const isPointer = window.getComputedStyle(target).cursor === "pointer";
            const shouldIgnore = interactiveEl?.hasAttribute("data-cursor-ignore") ||
                target.hasAttribute("data-cursor-ignore");
            const isInteractive = (!!interactiveEl || isPointer) && !shouldIgnore;
            setIsHovering(isInteractive);
            sizeRef.current.target = isInteractive ? 64 : 24;
        };
        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);
        const animate = () => {
            const pos = posRef.current;
            const size = sizeRef.current;
            pos.x += (pos.targetX - pos.x) * 0.18;
            pos.y += (pos.targetY - pos.y) * 0.18;
            size.current += (size.target - size.current) * 0.12;
            if (dotRef.current) {
                dotRef.current.style.transform = `
          translate(${pos.x}px, ${pos.y}px)
          translate(-50%, -50%)
          scale(${isClicked ? 0.6 : 1})
        `;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `
          translate(${pos.x}px, ${pos.y}px)
          translate(-50%, -50%)
          scale(${isClicked ? 0.85 : 1})
        `;
                ringRef.current.style.width = `${size.current}px`;
                ringRef.current.style.height = `${size.current}px`;
            }
            rafRef.current = requestAnimationFrame(animate);
        };
        window.addEventListener("mousemove", moveCursor, { passive: true });
        window.addEventListener("mouseover", handleOver, { passive: true });
        window.addEventListener("mousedown", handleMouseDown, { passive: true });
        window.addEventListener("mouseup", handleMouseUp, { passive: true });
        rafRef.current = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            if (rafRef.current)
                cancelAnimationFrame(rafRef.current);
        };
    }, [isTouchDevice, isClicked]);
    if (isTouchDevice)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { ref: dotRef, className: "fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[10000] mix-blend-difference", style: {
                    backgroundColor: "var(--accent-color)",
                    opacity: isVisible ? 1 : 0,
                    willChange: "transform",
                    transition: "opacity 0.2s ease",
                } }), _jsx("div", { ref: ringRef, className: "fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border mix-blend-difference", style: {
                    borderColor: "var(--accent-color)",
                    opacity: isVisible ? 0.7 : 0,
                    backgroundColor: isHovering
                        ? "rgba(109,124,255,0.05)"
                        : "transparent",
                    willChange: "transform, width, height",
                    transition: "opacity 0.2s ease, background-color 0.3s ease",
                } })] }));
};
