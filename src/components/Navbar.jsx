import React from 'react'
import {locations, navIcons, navLinks} from "#constants";
import dayjs from "dayjs";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";

const Navbar = () => {
    const openWindow = useWindowStore((state) => state.openWindow);
    const resetActiveLocation = useLocationStore((state) => state.resetActiveLocation);

    const openNavbarWindow = (type) => {
        if (type === "finder") resetActiveLocation();
        openWindow(type, type === "finder" ? locations.work : null);
    };

    return <nav >
        <div>
            <img src="/images/logo.svg" alt="logo" />
            <p className={"font-bold"}> Safal'S Portfolio</p>

            <ul >
                {navLinks.map(({id, name, type}) => (
                    <li key = {id}>
                        <button
                            type="button"
                            onClick={() => openNavbarWindow(type)}
                        >
                            {name}
                        </button>
                    </li>

                ))}
            </ul>
        </div>
        <div>
            <ul>
                {navIcons.map(({id, img}) => (
                    <li key = {id}>
                        <img src={img} className={"icon-hover"} alt={`icon-${id}`} />
                    </li>
                ))}
            </ul>
            <time className={"font-normal"}>
                {dayjs().format('ddd D MMM h:mm:ss A')}
            </time>
        </div>
    </nav>
}
export default Navbar;
