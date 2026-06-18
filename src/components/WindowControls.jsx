import useWindowStore from "#store/window.js";

const WindowControls = ({ target }) => {
    const closeWindow = useWindowStore((state) => state.closeWindow);

    return (
        <div id="window-controls">
            <button
                type="button"
                className="close"
                aria-label={`Close ${target}`}
                onClick={() => closeWindow(target)}
            />
            <button type="button" className="minimize" aria-label={`Minimize ${target}`} />
            <button type="button" className="maximize" aria-label={`Maximize ${target}`} />
        </div>
    );
};

export default WindowControls;
