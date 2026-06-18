import { useEffect, useMemo, useState } from "react";
import { Heart, Mail } from "lucide-react";
import { gallery, photosLinks } from "#constants/index.js";
import WindowControls from "#components/WindowControls.jsx";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const readFavorites = () => {
    try {
        return JSON.parse(localStorage.getItem("photo-favorites")) ?? [];
    } catch {
        return [];
    }
};

const Photos = () => {
    const [selectedGallery, setSelectedGallery] = useState("Library");
    const [favorites, setFavorites] = useState(readFavorites);
    const openWindow = useWindowStore((state) => state.openWindow);
    const focusWindow = useWindowStore((state) => state.focusWindow);

    useEffect(() => {
        localStorage.setItem("photo-favorites", JSON.stringify(favorites));
    }, [favorites]);

    const visiblePhotos = useMemo(() => {
        if (selectedGallery === "Favorites") {
            return gallery.filter(({ id }) => favorites.includes(id));
        }
        if (selectedGallery === "Library") return gallery;

        return gallery.filter(({ categories }) =>
            categories.includes(selectedGallery),
        );
    }, [favorites, selectedGallery]);

    const toggleFavorite = (event, id) => {
        event.stopPropagation();
        setFavorites((current) =>
            current.includes(id)
                ? current.filter((favoriteId) => favoriteId !== id)
                : [...current, id],
        );
    };

    const openPhoto = (id, imageUrl) => {
        openWindow("imgfile", {
            id,
            name: `Gallery image ${id}`,
            imageUrl,
            kind: "file",
            fileType: "img",
        });

        requestAnimationFrame(() => focusWindow("imgfile"));
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="photos" />
                <h2 className="ml-4 font-semibold text-gray-700">Photos</h2>
                <button
                    type="button"
                    className="icon ml-auto"
                    aria-label="Open contact window"
                    onClick={() => openWindow("contact")}
                >
                    <Mail className="size-4" />
                </button>
            </div>

            <div className="flex h-[480px] w-full overflow-hidden">
                <aside className="sidebar">
                    <h2>Albums</h2>
                    <ul>
                        {photosLinks.map(({ id, icon, title }) => (
                            <li
                                key={id}
                                className={selectedGallery === title ? "active" : "not-active"}
                            >
                                <button
                                    type="button"
                                    className="flex w-full items-center gap-2"
                                    onClick={() => setSelectedGallery(title)}
                                >
                                    <img src={icon} alt="" />
                                    <p>{title}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="gallery flex-1 overflow-y-auto">
                    {visiblePhotos.length > 0 ? (
                        <ul>
                            {visiblePhotos.map(({ id, img }) => (
                                <li key={id} className="group relative cursor-pointer">
                                    <button
                                        type="button"
                                        className="block size-full cursor-pointer"
                                        onClick={() => openPhoto(id, img)}
                                    >
                                        <img src={img} alt={`Gallery ${id}`} />
                                    </button>
                                    <button
                                        type="button"
                                        className="absolute right-2 top-2 rounded-full bg-black/40 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                                        aria-label={
                                            favorites.includes(id)
                                                ? "Remove from favorites"
                                                : "Add to favorites"
                                        }
                                        onClick={(event) => toggleFavorite(event, id)}
                                    >
                                        <Heart
                                            className={`size-4 ${
                                                favorites.includes(id)
                                                    ? "fill-red-500 text-red-500"
                                                    : ""
                                            }`}
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="flex h-full items-center justify-center text-sm text-gray-400">
                            No favorite photos yet.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
