import { Minus, Pencil, Plus, Share } from "lucide-react";
import { useState } from "react";
import WindowControls from "#components/WindowControls.jsx";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

const ImageFile = ({ data }) => {
    const [zoomedImageId, setZoomedImageId] = useState(null);
    const isZoomed = zoomedImageId === data?.id;

    const shareImage = async () => {
        if (!data?.imageUrl) return;

        const url = new URL(data.imageUrl, window.location.origin).href;
        try {
            if (navigator.share) {
                await navigator.share({ title: data.name, url });
            } else {
                await navigator.clipboard.writeText(url);
            }
        } catch {
            // Closing the native share sheet does not require user feedback.
        }
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <div
                    className="image-actions"
                    onPointerDown={(event) => event.stopPropagation()}
                >
                    <button
                        type="button"
                        className="icon"
                        aria-label="Open image in a new tab"
                        onClick={() => window.open(data?.imageUrl, "_blank", "noopener,noreferrer")}
                    >
                        <Pencil className="size-4" />
                    </button>
                    <button
                        type="button"
                        className="icon"
                        aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                        onClick={() =>
                            setZoomedImageId((current) =>
                                current === data?.id ? null : data?.id,
                            )
                        }
                    >
                        {isZoomed ? (
                            <Minus className="size-4" />
                        ) : (
                            <Plus className="size-4" />
                        )}
                    </button>
                    <button
                        type="button"
                        className="icon"
                        aria-label="Share image"
                        onClick={shareImage}
                    >
                        <Share className="size-4" />
                    </button>
                </div>
            </div>
            <div className="preview">
                {data?.imageUrl && (
                    <img
                        src={data.imageUrl}
                        alt={data.name ?? "Preview"}
                        className={isZoomed ? "zoomed" : ""}
                    />
                )}
            </div>
        </>
    );
};

const ImageFileWindow = WindowWrapper(ImageFile, "imgfile");

export default ImageFileWindow;
