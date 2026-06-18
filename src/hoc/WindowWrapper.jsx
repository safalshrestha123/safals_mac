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

        const { isOpen = false, zIndex = 0, data = null } = windowState ?? {};

        useGSAP(
            () => {
                const element = windowRef.current;
                if (!element || !isOpen) return;

                gsap.fromTo(
                    element,
                    { scale: 0.8, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                    },
                );
            },
            { dependencies: [isOpen], scope: windowRef },
        );

        useGSAP(
            () => {
                const element = windowRef.current;
                if (!element || !windowState) return;

                const [draggable] = Draggable.create(element, {
                    trigger: element.querySelector("#window-header") ?? element,
                    bounds: document.body,
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
