import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { locations } from "#constants/index.js";
import WindowControls from "#components/WindowControls.jsx";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useLocationStore from "#store/location.js";
import useWindowStore from "#store/window.js";

const Finder = ({ data }) => {
    const [query, setQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const activeLocation = useLocationStore((state) => state.activeLocation);
    const setActiveLocation = useLocationStore((state) => state.setActiveLocation);
    const openWindow = useWindowStore((state) => state.openWindow);

    useEffect(() => {
        if (data?.kind === "folder") setActiveLocation(data);
    }, [data, setActiveLocation]);

    const visibleItems = useMemo(() => {
        const children = activeLocation?.children ?? [];
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return children;

        return children.filter(({ name }) =>
            name.toLowerCase().includes(normalizedQuery),
        );
    }, [activeLocation, query]);

    const openItem = (item) => {
        if (item.kind === "folder") {
            setQuery("");
            setActiveLocation(item);
            return;
        }

        if (item.fileType === "pdf") {
            openWindow("resume", item);
            return;
        }

        if (["fig", "url"].includes(item.fileType) && item.href) {
            window.open(item.href, "_blank", "noopener,noreferrer");
            return;
        }

        if (item.fileType === "txt") openWindow("txtfile", item);
        if (item.fileType === "img") openWindow("imgfile", item);
    };

    const renderSidebarItems = (items) =>
        items.map((item) => {
            const isActive = item.name === activeLocation?.name;

            return (
                <li
                    key={`${item.type ?? "item"}-${item.id}-${item.name}`}
                    className="!p-0"
                >
                    <button
                        type="button"
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors ${
                            isActive
                                ? "active"
                                : "not-active"
                        }`}
                        onClick={() => {
                            setQuery("");
                            setActiveLocation(item);
                        }}
                    >
                        <img src={item.icon} className="w-4" alt="" />
                        <span className="truncate text-sm font-medium">{item.name}</span>
                    </button>
                </li>
            );
        });

    return (
        <>
            <div id="window-header">
                <WindowControls target="finder" />
                <div className="ml-auto">
                    {isSearchOpen ? (
                        <label className="finder-search">
                            <Search className="size-4" aria-hidden="true" />
                            <input
                                autoFocus
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                onBlur={() => !query && setIsSearchOpen(false)}
                                placeholder="Search"
                                aria-label="Search files"
                            />
                        </label>
                    ) : (
                        <button
                            type="button"
                            className="icon"
                            aria-label="Search files"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search className="size-4" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex h-[500px] bg-white">
                <aside className="sidebar">
                    <div>
                        <h3>Favorites</h3>
                        <ul>{renderSidebarItems(Object.values(locations))}</ul>
                    </div>
                    <div>
                        <h3>Work</h3>
                        <ul>{renderSidebarItems(locations.work.children)}</ul>
                    </div>
                </aside>

                <ul className="content">
                    {visibleItems.map((item) => (
                        <li
                            key={`${item.kind}-${item.id}-${item.name}`}
                            className={item.position ?? "top-8 left-8"}
                        >
                            <button
                                type="button"
                                className="group flex flex-col items-center gap-3 rounded-lg p-2 hover:bg-blue-50"
                                onClick={() => openItem(item)}
                            >
                                <img src={item.icon} alt="" />
                                <p>{item.name}</p>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
