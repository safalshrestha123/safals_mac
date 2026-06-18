import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { locations } from "#constants/index.js";
import useLocationStore from "#store/location.js";
import useWindowStore from "#store/window.js";

gsap.registerPlugin(Draggable);

const Home = () => {
    const homeRef = useRef(null);
    const setActiveLocation = useLocationStore((state) => state.setActiveLocation);
    const openWindow = useWindowStore((state) => state.openWindow);

    useGSAP(
        () => {
            if (!homeRef.current) return;

            const folders = Draggable.create(".desktop-folder", {
                bounds: homeRef.current,
                dragClickables: true,
                minimumMovement: 6,
                onDragStart() {
                    this.target.dataset.dragging = "true";
                },
                onDragEnd() {
                    const target = this.target;
                    setTimeout(() => delete target.dataset.dragging, 0);
                },
            });

            return () => folders.forEach((folder) => folder.kill());
        },
        { scope: homeRef },
    );

    const openProject = (event, project) => {
        const folder = event.currentTarget.closest(".desktop-folder");
        if (folder?.dataset.dragging === "true") return;

        setActiveLocation(project);
        openWindow("finder", project);
    };

    return (
        <section ref={homeRef} id="home" aria-label="Desktop projects">
            <ul>
                {locations.work.children.map((project) => (
                    <li
                        key={project.id}
                        className={`desktop-folder ${project.desktopPosition}`}
                    >
                        <button
                            type="button"
                            className="group flex flex-col items-center"
                            onClick={(event) => openProject(event, project)}
                        >
                            <img src={project.icon} alt="" className="w-20" />
                            <p>{project.name}</p>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Home;
