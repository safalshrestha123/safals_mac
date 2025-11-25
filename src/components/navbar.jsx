import React from 'react'
import {navIcons, navLinks} from "#constants";
import dayjs from "dayjs";
const Navbar = () => {
    return <nav >
        <div>
            <img src="/images/logo.svg" alt="logo" />
            <p className={"font-bold"}> Safal'S Portfolio</p>

            <ul >
                {navLinks.map(({id, name}) => (
                    <li key = {id}>
                        <p>{name}</p>
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
