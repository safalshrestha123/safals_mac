import { useState } from "react";
import { Trash2 } from "lucide-react";
import { locations } from "#constants/index.js";
import WindowControls from "#components/WindowControls.jsx";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const Trash = () => {
    const [items, setItems] = useState(locations.trash.children);
    const openWindow = useWindowStore((state) => state.openWindow);

    return (
        <>
            <div id="window-header">
                <WindowControls target="trash" />
                <h2>Trash</h2>
                <button
                    type="button"
                    className="ml-auto rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-40"
                    disabled={items.length === 0}
                    onClick={() => setItems([])}
                >
                    Empty Trash
                </button>
            </div>

            <div className="trash-content">
                {items.length > 0 ? (
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                <button
                                    type="button"
                                    onDoubleClick={() => openWindow("imgfile", item)}
                                >
                                    <img src={item.icon} alt="" />
                                    <p>{item.name}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="trash-empty">
                        <Trash2 className="size-14" />
                        <p>Trash is empty</p>
                    </div>
                )}
            </div>
        </>
    );
};

const TrashWindow = WindowWrapper(Trash, "trash");

export default TrashWindow;
