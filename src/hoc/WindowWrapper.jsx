import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "#store/window.js";

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const windowState = useWindowStore((state) => state.windows[windowKey]);
        const focusWindow = useWindowStore((state) => state.focusWindow);
        const windowRef = useRef(null);
        const restorePositionRef = useRef({ x: 0, y: 0 });
        const wasMinimizedRef = useRef(false);

        const {
            isOpen = false,
            isMinimized = false,
            zIndex = 0,
            data = null,
        } = windowState ?? {};

        useGSAP(
            () => {
                const element = windowRef.current;
                if (!element) return;

                if (!isOpen) {
                    gsap.set(element, { display: "none" });
                    wasMinimizedRef.current = false;
                    return;
                }

                const reduceMotion = window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                ).matches;

                if (isMinimized) {
                    const dockButton = document.querySelector(
                        `[data-dock-app="${windowKey}"]`,
                    );

                    if (!dockButton || reduceMotion) {
                        gsap.set(element, { display: "none" });
                        wasMinimizedRef.current = true;
                        return;
                    }

                    const windowBounds = element.getBoundingClientRect();
                    const dockBounds = dockButton.getBoundingClientRect();
                    const currentX = Number(gsap.getProperty(element, "x")) || 0;
                    const currentY = Number(gsap.getProperty(element, "y")) || 0;
                    const targetX =
                        currentX +
                        dockBounds.left +
                        dockBounds.width / 2 -
                        (windowBounds.left + windowBounds.width / 2);
                    const targetY =
                        currentY +
                        dockBounds.top +
                        dockBounds.height / 2 -
                        (windowBounds.top + windowBounds.height / 2);
                    const direction = Math.sign(targetX - currentX) || 1;

                    restorePositionRef.current = { x: currentX, y: currentY };
                    wasMinimizedRef.current = true;

                    const timeline = gsap
                        .timeline()
                        .to(element, {
                            scaleY: 0.82,
                            skewX: direction * 4,
                            duration: 0.14,
                            ease: "power1.in",
                        })
                        .to(element, {
                            x: targetX,
                            y: targetY,
                            scaleX: 0.08,
                            scaleY: 0.03,
                            skewX: direction * 12,
                            opacity: 0.1,
                            transformOrigin: "50% 100%",
                            duration: 0.46,
                            ease: "power3.in",
                        })
                        .set(element, { display: "none" });

                    return () => timeline.kill();
                }

                if (wasMinimizedRef.current) {
                    const { x, y } = restorePositionRef.current;

                    if (reduceMotion) {
                        gsap.set(element, {
                            display: "block",
                            x,
                            y,
                            scaleX: 1,
                            scaleY: 1,
                            skewX: 0,
                            opacity: 1,
                        });
                        wasMinimizedRef.current = false;
                        return;
                    }

                    gsap.set(element, { display: "block" });

                    const tween = gsap.to(element, {
                        x,
                        y,
                        scaleX: 1,
                        scaleY: 1,
                        skewX: 0,
                        opacity: 1,
                        duration: 0.55,
                        ease: "power3.out",
                        onComplete: () => {
                            wasMinimizedRef.current = false;
                        },
                    });

                    return () => tween.kill();
                }

                gsap.fromTo(
                    element,
                    { display: "block", scale: 0.8, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: "power3.out",
                    },
                );
            },
            { dependencies: [isOpen, isMinimized], scope: windowRef },
        );

        useGSAP(
            () => {
                const element = windowRef.current;
                if (!element || !windowState) return;

                const [draggable] = Draggable.create(element, {
                    trigger: element.querySelector("#window-header") ?? element,
                    bounds: document.body,
                    dragClickables: false,
                    onPress: () => focusWindow(windowKey),
                });

                return () => draggable?.kill();
            },
            { dependencies: [focusWindow], scope: windowRef },
        );

        useLayoutEffect(() => {
            const element = windowRef.current;
            if (!element) return;

            element.style.display = isOpen ? "block" : "none";
        }, [isOpen]);

        return (
            <section
                id={windowKey}
                ref={windowRef}
                style={{ zIndex }}
                className="absolute"
                aria-hidden={!isOpen || isMinimized}
            >
                <Component {...props} data={data} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${
        Component.displayName || Component.name || "Component"
    })`;

    return Wrapped;
};

export default WindowWrapper;
