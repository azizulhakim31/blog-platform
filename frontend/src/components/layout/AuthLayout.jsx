import { FiArrowLeft, FiBookOpen } from "react-icons/fi";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="grid min-h-screen bg-base-100 lg:grid-cols-2">
            <div className="relative hidden overflow-hidden bg-neutral p-12">
                <div className="absolute -right-32 -top-32 size-96 rounded-full bg-primary/20 blur-3xl" />
                <Link
                    to="/"
                    className="relative flex items-center gap-3 text-2xl font-extrabold"
                >
                    <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-content">
                        <FiBookOpen size={23} />
                    </span>
                    Relato
                </Link>

                <div className="relative max-w-lg">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                        A place for every perspective
                    </p>
                    <h1 className="mt-5 text-5xl font-black leading-tight">
                        Every great idea deserves a story
                    </h1>
                    <p className="mt-6 leading-8 text-neutral-content/70">
                        Discover new perspectives, share your experiences,
                        and connect with people through meaningful stories.
                    </p>
                </div>

                <p className="relative text-sm text-neutral-content/50">
                    &copy; {new Date().getFullYear()} Relato. All rights reserved.
                </p>
            </div>

            <div className="flex flex-col justify-center px-5 py-10 sm:px-12 lg:px-16">
                <div className="mx-auto w-full max-w-md">
                    <Link
                        to="/"
                        className="btn btn-ghost btn-sm mb-12 w-fit"
                    >
                        <FiArrowLeft /> Back to home
                    </Link>

                    <Link
                        to="/"
                        className="mb-8 inline-flex items-center gap-2 text-xl font-extrabold lg:hidden"
                    >
                        <FiBookOpen className="text-primary" size={25} />
                    </Link>
                    <h2 className="text-3xl font-extrabold tracking-tight">
                        {title}
                    </h2>
                    <p className="mt-3 text-base-content/65">
                        {subtitle}
                    </p>
                    <div className="mt-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;