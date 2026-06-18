import { socials } from "#constants/index.js";
import WindowControls from "#components/WindowControls.jsx";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

const Contact = () => (
    <>
        <div id="window-header">
            <WindowControls target="contact" />
            <h2>Contact Me</h2>
        </div>

        <div className="space-y-5 p-6">
            <div className="flex size-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                SS
            </div>
            <div>
                <h3>Let&apos;s build something useful.</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600">
                    I&apos;m Safal Shrestha, a software developer and AI systems student.
                    Reach out about projects, opportunities, or collaboration.
                </p>
            </div>

            <ul className="contact-links">
                {socials.map(({ id, bg, icon, link, text }) => (
                    <li key={id} style={{ backgroundColor: bg }}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <img src={icon} alt="" className="size-6" />
                            <p>{text}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </>
);

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
