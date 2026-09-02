import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Mail, Share2 } from "lucide-react";
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
    const [selectedPhotoId, setSelectedPhotoId] = useState(null);
    const [favorites, setFavorites] = useState(readFavorites);
    const openWindow = useWindowStore((state) => state.openWindow);

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

    const selectedIndex = visiblePhotos.findIndex(({ id }) => id === selectedPhotoId);
    const selectedPhoto = selectedIndex >= 0 ? visiblePhotos[selectedIndex] : null;

    const showPhotoAt = useCallback((index) => {
        if (visiblePhotos.length === 0) return;
        const wrappedIndex = (index + visiblePhotos.length) % visiblePhotos.length;
        setSelectedPhotoId(visiblePhotos[wrappedIndex].id);
    }, [visiblePhotos]);

    useEffect(() => {
        if (!selectedPhoto) return;

        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") showPhotoAt(selectedIndex - 1);
            if (event.key === "ArrowRight") showPhotoAt(selectedIndex + 1);
            if (event.key === "Escape") setSelectedPhotoId(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, selectedPhoto, showPhotoAt]);

    const toggleFavorite = (event, id) => {
        event.stopPropagation();
        const isRemoving = favorites.includes(id);

        setFavorites((current) =>
            isRemoving
                ? current.filter((favoriteId) => favoriteId !== id)
                : [...current, id],
        );

        if (isRemoving && selectedGallery === "Favorites") {
            setSelectedPhotoId(null);
        }
    };

    const sharePhoto = async () => {
        if (!selectedPhoto) return;
        const url = new URL(selectedPhoto.img, window.location.origin).href;

        try {
            if (navigator.share) {
                await navigator.share({ title: "Gallery photo", url });
            } else {
                await navigator.clipboard.writeText(url);
            }
        } catch {
            // Closing the native share sheet requires no follow-up.
        }
    };

    return (
        <>
            <div id="window-header" className="photos-header">
                <WindowControls target="photos" />

                {selectedPhoto ? (
                    <>
                        <button
                            type="button"
                            className="icon ml-4"
                            aria-label="Back to gallery"
                            onPointerDown={(event) => event.stopPropagation()}
                            onClick={() => setSelectedPhotoId(null)}
                        >
                            <ArrowLeft className="size-5" />
                        </button>
                        <div className="photo-title">
                            <h2>Gallery</h2>
                            <p>{selectedIndex + 1} of {visiblePhotos.length}</p>
                        </div>
                        <div
                            className="photo-toolbar-actions"
                            onPointerDown={(event) => event.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="icon"
                                aria-label="Share photo"
                                onClick={sharePhoto}
                            >
                                <Share2 className="size-5" />
                            </button>
                            <button
                                type="button"
                                className="icon"
                                aria-label={
                                    favorites.includes(selectedPhoto.id)
                                        ? "Remove from favorites"
                                        : "Add to favorites"
                                }
                                onClick={(event) => toggleFavorite(event, selectedPhoto.id)}
                            >
                                <Heart
                                    className={`size-5 ${
                                        favorites.includes(selectedPhoto.id)
                                            ? "fill-red-500 text-red-500"
                                            : ""
                                    }`}
                                />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="ml-4 font-semibold text-gray-700">Photos</h2>
                        <button
                            type="button"
                            className="icon ml-auto"
                            aria-label="Open contact window"
                            onPointerDown={(event) => event.stopPropagation()}
                            onClick={() => openWindow("contact")}
                        >
                            <Mail className="size-4" />
                        </button>
                    </>
                )}
            </div>

            <div className="photos-body">
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
                                    onClick={() => {
                                        setSelectedGallery(title);
                                        setSelectedPhotoId(null);
                                    }}
                                >
                                    <img src={icon} alt="" />
                                    <p>{title}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {selectedPhoto ? (
                    <div className="photo-viewer">
                        {visiblePhotos.length > 1 && (
                            <button
                                type="button"
                                className="slider-control previous"
                                aria-label="Previous photo"
                                onClick={() => showPhotoAt(selectedIndex - 1)}
                            >
                                <ChevronLeft />
                            </button>
                        )}
                        <img src={selectedPhoto.img} alt={`Gallery ${selectedPhoto.id}`} />
                        {visiblePhotos.length > 1 && (
                            <button
                                type="button"
                                className="slider-control next"
                                aria-label="Next photo"
                                onClick={() => showPhotoAt(selectedIndex + 1)}
                            >
                                <ChevronRight />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="gallery">
                        {visiblePhotos.length > 0 ? (
                            <ul
                                className={
                                    selectedGallery === "Library"
                                        ? "mosaic-grid"
                                        : "album-grid"
                                }
                            >
                                {visiblePhotos.map(({ id, img }) => (
                                    <li key={id} className="group relative cursor-pointer">
                                        <button
                                            type="button"
                                            className="block size-full cursor-pointer"
                                            onClick={() => setSelectedPhotoId(id)}
                                        >
                                            <img src={img} alt={`Gallery ${id}`} />
                                        </button>
                                        <button
                                            type="button"
                                            className="photo-favorite"
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
                            <p className="gallery-empty">No photos in this album.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
