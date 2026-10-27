import {
    FiBookOpen,
    FiGithub,
    FiInstagram,
    FiTwitter,
    FiArrowUpRight,
} from "react-icons/fi";

const Footer = () => {
    return (
        <footer id="about" className="border-t border-base-300 bg-base-100">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <a
                            href="#home"
                            className="inline-flex items-center gap-2 text-xl font-extrabold"
                        >
                            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-content">
                                <FiBookOpen size={20} />
                            </span>
                            Relato
                        </a>

                        <p className="mt-4 max-w-sm text-sm leading-7 text-base-content/65">
                            A space for curious minds, thoughtful stories, and
                            ideas that deserve to be shared.
                        </p>

                        <div className="mt-5 flex gap-2">
                            {[
                                { label: "GitHub", Icon: FiGithub, href: "https://github.com" },
                                {
                                    label: "Instagram",
                                    Icon: FiInstagram,
                                    href: "https://instagram.com",
                                },
                                {
                                    label: "Twitter",
                                    Icon: FiTwitter,
                                    href: "https://twitter.com",
                                },
                            ].map(({ label, Icon, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    className="btn btn-ghost btn-circle btn-sm"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold">Explore</h3>
                        <ul className="mt-4 space-y-3 text-sm text-base-content/65">
                            <li><a className="link-hover" href="#blogs">Latest stories</a></li>
                            <li><a className="link-hover" href="#categories">Categories</a></li>
                            <li><a className="link-hover" href="#featured">Featured posts</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold">Get started</h3>
                        <ul className="mt-4 space-y-3 text-sm text-base-content/65">
                            <li><a className="link-hover" href="#write">Write a story</a></li>
                            <li><a className="link-hover" href="#newsletter">Newsletter</a></li>
                            <li>
                                <a className="inline-flex items-center gap-1 link-hover" href="#home">
                                    Back to top <FiArrowUpRight />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-base-300 pt-6 text-sm text-base-content/60 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Relato. All rights reserved.</p>
                    <p>Made for people who love good stories.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
