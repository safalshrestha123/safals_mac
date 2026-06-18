import { useMemo, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    MoveRight,
    PanelLeft,
    Plus,
    Search,
    Share,
    ShieldHalf,
} from "lucide-react";
import { blogPosts } from "#constants/index.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";

const Safari = () => {
    const [query, setQuery] = useState("");
    const filteredPosts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return blogPosts;

        return blogPosts.filter(({ title }) =>
            title.toLowerCase().includes(normalizedQuery),
        );
    }, [query]);

    return (
        <>
            <div id="window-header">
                <WindowControls target="safari" />

                <PanelLeft className="ml-10 icon" aria-hidden="true" />

                <div className="flex items-center gap-1 ml-5" aria-hidden="true">
                    <ChevronLeft className="icon" />
                    <ChevronRight className="icon" />
                </div>

                <div className="flex-1 flex-center gap-3">
                    <ShieldHalf className="icon" aria-hidden="true" />
                    <label className="search">
                        <Search className="icon" aria-hidden="true" />
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search Safal's blog posts"
                            className="flex-1 outline-none"
                            aria-label="Search blog posts"
                        />
                    </label>
                </div>

                <div className="flex items-center gap-5" aria-hidden="true">
                    <Share className="icon" />
                    <Plus className="icon" />
                    <Copy className="icon" />
                </div>
            </div>

            <div className="blog">
                <h2>Safal&apos;s Developer Blog</h2>

                {filteredPosts.length > 0 ? (
                    <div className="space-y-8">
                        {filteredPosts.map(({ id, image, title, date, link }) => (
                            <article key={id} className="blog-post">
                                <div className="col-span-2">
                                    <img src={image} alt="" />
                                </div>

                                <div className="content">
                                    <p>{date}</p>
                                    <h3>{title}</h3>
                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                        Read the full post
                                        <MoveRight className="size-4" aria-hidden="true" />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="py-10 text-center text-sm text-gray-500">
                        No posts match &ldquo;{query}&rdquo;.
                    </p>
                )}
            </div>
        </>
    );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
