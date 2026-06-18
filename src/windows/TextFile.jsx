import WindowControls from "#components/WindowControls.jsx";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

const TextFile = ({ data }) => (
    <>
        <div id="window-header">
            <WindowControls target="txtfile" />
            <h2>{data?.name ?? "Text file"}</h2>
        </div>
        <article className="space-y-4 p-6 text-sm leading-6 text-gray-700">
            {data?.subtitle && <h3 className="text-lg font-semibold">{data.subtitle}</h3>}
            {data?.description?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
            ))}
        </article>
    </>
);

const TextFileWindow = WindowWrapper(TextFile, "txtfile");

export default TextFileWindow;
