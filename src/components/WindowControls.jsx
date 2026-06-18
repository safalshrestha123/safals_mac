import useWindowStore from "#store/window.js";

const DOCK_WINDOWS = new Set([
    "finder",
    "safari",
    "photos",
    "contact",
    "terminal",
    "imgfile",
    "trash",
]);

const WindowControls = ({ target }) => {
    const closeWindow = useWindowStore((state) => state.closeWindow);
    const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
    const canMinimize = DOCK_WINDOWS.has(target);

    return (
        <div
            id="window-controls"
            onPointerDown={(event) => event.stopPropagation()}
        >
            <button
                type="button"
                className="close"
                aria-label={`Close ${target}`}
                onClick={(event) => {
                    event.stopPropagation();
                    closeWindow(target);
                }}
            />
            <button
                type="button"
                className={`minimize ${canMinimize ? "" : "cursor-default"}`}
                aria-label={`Minimize ${target}`}
                disabled={!canMinimize}
                onClick={() => minimizeWindow(target)}
            />
            <button type="button" className="maximize" aria-label={`Maximize ${target}`} />
        </div>
    );
};

export default WindowControls;
