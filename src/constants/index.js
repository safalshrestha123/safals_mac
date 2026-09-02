const navLinks = [
    {
        id: 1,
        name: "Projects",
        type: "finder",
    },
    {
        id: 3,
        name: "Contact",
        type: "contact",
    },
    {
        id: 4,
        name: "Resume",
        type: "resume",
    },
];

const navIcons = [
    {
        id: 1,
        img: "/icons/wifi.svg",
    },
    {
        id: 2,
        img: "/icons/search.svg",
    },
    {
        id: 3,
        img: "/icons/user.svg",
    },
    {
        id: 4,
        img: "/icons/mode.svg",
    },
];

const dockApps = [
    {
        id: "finder",
        name: "Portfolio", // was "Finder"
        icon: "finder.png",
        canOpen: true,
    },
    {
        id: "safari",
        name: "Articles", // was "Safari"
        icon: "safari.png",
        canOpen: true,
    },
    {
        id: "photos",
        name: "Gallery", // was "Photos"
        icon: "photos.png",
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact", // or "Get in touch"
        icon: "contact.png",
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills", // was "Terminal"
        icon: "terminal.png",
        canOpen: true,
    },
    {
        id: "trash",
        name: "Archive", // was "Trash"
        icon: "trash.png",
        canOpen: true,
    },
];

const blogPosts = [
    {
        id: 1,
        date: "Sep 2, 2025",
        title:
            "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
        image: "/images/blog1.png",
        link: "https://safal.info.np",
    },
    {
        id: 2,
        date: "Aug 28, 2025",
        title: "The Ultimate Guide to Mastering Three.js for 3D Development",
        image: "/images/blog2.png",
        link: "https://safal.info.np",
    },
    {
        id: 3,
        date: "Aug 15, 2025",
        title: "The Ultimate Guide to Mastering GSAP Animations",
        image: "/images/blog3.png",
        link: "https://safal.info.np",
    },
];

const techStack = [
    {
        category: "Frontend",
        items: ["React.js", "Next.js", "TypeScript"],
    },
    {
        category: "Mobile",
        items: ["React Native", "Expo"],
    },
    {
        category: "Styling",
        items: ["Tailwind CSS", "Sass", "CSS"],
    },
    {
        category: "Backend",
        items: ["Node.js", "Express", "NestJS", "Hono"],
    },
    {
        category: "Database",
        items: ["MongoDB", "PostgreSQL"],
    },
    {
        category: "Dev Tools",
        items: ["Git", "GitHub", "Docker"],
    },
];

const socials = [
    {
        id: 1,
        text: "Github",
        icon: "/icons/github.svg",
        bg: "#f4656b",
        link: "https://github.com/safalshrestha123",
    },
    {
        id: 2,
        text: "Portfolio",
        icon: "/icons/atom.svg",
        bg: "#4bcb63",
        link: "https://safal.info.np",
    },
    {
        id: 3,
        text: "Email",
        icon: "/images/contact.png",
        bg: "#ff866b",
        link: "mailto:safalshrestha.ks@gmail.com",
    },
    {
        id: 4,
        text: "Call",
        icon: "/icons/user.svg",
        bg: "#05b6f6",
        link: "tel:+19084937986",
    },
];

const photosLinks = [
    {
        id: 1,
        icon: "/icons/gicon1.svg",
        title: "Library",
    },
    {
        id: 2,
        icon: "/icons/gicon2.svg",
        title: "Memories",
    },
    {
        id: 3,
        icon: "/icons/file.svg",
        title: "Places",
    },
    {
        id: 4,
        icon: "/icons/gicon4.svg",
        title: "People",
    },
    {
        id: 5,
        icon: "/icons/gicon5.svg",
        title: "Favorites",
    },
];

const gallery = [
    {
        id: 1,
        img: "/images/s-22.png",
        categories: ["Memories", "Places", "People"],
    },
    {
        id: 2,
        img: "/images/s-7.png",
        categories: [],
    },
    {
        id: 3,
        img: "/images/s-16.png",
        categories: ["Memories", "People"],
    },
    {
        id: 4,
        img: "/images/s-20.png",
        categories: ["Memories", "Places", "People"],
    },
];

export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
};

const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
        // ▶ Project 1
        {
            id: 5,
            name: "Safal's macOS Portfolio",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-5",
            desktopPosition: "top-24 left-6",
            windowPosition: "top-[5vh] left-5",
            children: [
                {
                    id: 1,
                    name: "Safal Portfolio Project.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "Safal's macOS Portfolio is an interactive personal portfolio designed like a modern desktop operating system.",
                        "Instead of a normal portfolio page, visitors can explore my work through folders, windows, app icons, and a macOS-style interface.",
                        "The project shows my frontend development skills, UI creativity, React component structure, and product design thinking.",
                        "It is built with React, Vite, JavaScript, Tailwind CSS, draggable windows, desktop-style navigation, and interactive portfolio sections.",
                    ],
                },
                {
                    id: 2,
                    name: "safal.info.np",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://safal.info.np",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "portfolio.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/project-1.png",
                },
                {
                    id: 5,
                    name: "Tech Stack.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://safal.info.np",
                    position: "top-60 right-20",
                },
            ],
        },

        // ▶ Project 2
        {
            id: 6,
            name: "Reflection Unisex Website",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-52 right-80",
            desktopPosition: "top-64 left-6",
            windowPosition: "top-[20vh] left-7",
            children: [
                {
                    id: 1,
                    name: "Reflection Unisex Website.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 right-10",
                    description: [
                        "Reflection Unisex Website is a business website created for a salon and beauty service brand.",
                        "The website helps customers learn about the business, services, location, contact details, and overall brand identity.",
                        "This project represents my freelance web development and digital marketing experience for small businesses.",
                        "My work included website setup, responsive design, domain/DNS configuration, SEO support, and improving the online presence of the business.",
                    ],
                },
                {
                    id: 2,
                    name: "reflectionunisex.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://reflectionunisex.com",
                    position: "top-20 left-20",
                },
                {
                    id: 4,
                    name: "reflection-unisex.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 left-80",
                    imageUrl: "/images/project-2.png",
                },
                {
                    id: 5,
                    name: "SEO Plan.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://reflectionunisex.com",
                    position: "top-60 left-5",
                },
            ],
        },

        // ▶ Project 3
        {
            id: 7,
            name: "Nepal Treks by Kishan Website",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-80",
            desktopPosition: "top-[28rem] left-6",
            windowPosition: "top-[33vh] left-7",
            children: [
                {
                    id: 1,
                    name: "Nepal Treks Website.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "Nepal Treks by Kishan is a travel and trekking website built to promote trekking services in Nepal.",
                        "The website helps visitors explore trekking options, learn about the guide or business, and contact the service provider easily.",
                        "This project shows my ability to create business-focused websites with clean design, clear navigation, and responsive layouts.",
                        "It also connects with my freelance experience in helping small businesses improve their online visibility and customer reach.",
                    ],
                },
                {
                    id: 2,
                    name: "nepaltreksbykishan.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://nepaltreksbykishan.com",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "nepal-treks.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/project-3.png",
                },
                {
                    id: 5,
                    name: "Website Plan.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://nepaltreksbykishan.com",
                    position: "top-60 right-20",
                },
            ],
        },
    ],
};

const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/icons/info.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-5",
            imageUrl: "/images/s-3.png",
        },
        {
            id: 2,
            name: "casual-me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-28 right-72",
            imageUrl: "/images/s-13.png",
        },
        {
            id: 3,
            name: "conference-me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 left-80",
            imageUrl: "/images/s-21.png",
        },
        {
            id: 4,
            name: "about-me.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-60 left-5",
            subtitle: "Meet the Developer Behind the Code",
            image: "/images/s-7.png",
            description:[ "Hey! I’m Safal 👋, a computer science graduate student and developer who enjoys building modern, interactive, and useful web experiences.",
                 "I work with JavaScript, React, Next.js, Java, Python, and AI tools—and I like creating projects that are fast, clean, and practical.",
                 "I’m interested in frontend development, AI applications, backend systems, and building creative portfolio experiences like this macOS-style web app.",
                 "Outside of coding, you’ll probably find me improving my projects late at night, learning new tech, experimenting with AI ideas, or fixing one tiny UI detail for way too long 😅", ]
        },
    ],
};

const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "Resume.pdf",
            icon: "/images/pdf.png",
            kind: "file",
            fileType: "pdf",
            // you can add `href` if you want to open a hosted resume
            // href: "/your/resume/path.pdf",
        },
    ],
};

const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: "/icons/trash.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "trash1.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-10",
            imageUrl: "/images/trash-1.png",
        },
        {
            id: 2,
            name: "trash2.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-40 left-80",
            imageUrl: "/images/trash-2.png",
        },
    ],
};

export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
    finder: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    contact: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    safari: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    photos: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    trash: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
