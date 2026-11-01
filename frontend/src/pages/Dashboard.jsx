import { Link, useNavigate } from "react-router-dom";
import {
    FiBookOpen,
    FiLogOut,
    FiPenTool,
    FiUser,
    FiBookmark,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-base-200">
            <header className="border-b border-base-300 bg-base-100">
                <nav className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Link to="/" className="flex flex-1 items-center gap-2 text-xl font-extrabold">
                        <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-content">
                            <FiBookOpen size={21} />
                        </span>
                        Blog<span className="text-primary">Space</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="btn btn-outline btn-sm"
                    >
                        <FiLogOut /> Logout
                    </button>
                </nav>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-base-100 p-6 shadow-sm sm:p-10">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
                            <FiUser size={30} />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-primary">
                                Your personal workspace
                            </p>
                            <h1 className="mt-1 text-3xl font-extrabold">
                                Welcome, {user?.name}!
                            </h1>
                            <p className="mt-1 text-base-content/65">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="card border border-base-300 bg-base-100">
                            <div className="card-body">
                                <FiPenTool className="text-2xl text-primary" />
                                <h2 className="card-title mt-3">Write an article</h2>
                                <p className="text-sm text-base-content/65">
                                    Share your ideas and experiences.
                                </p>
                                <div className="card-actions mt-4">
                                    <Link to="/write" className="btn btn-primary btn-sm">
                                        Start writing
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="card border border-base-300 bg-base-100">
                            <div className="card-body">
                                <FiBookmark className="text-2xl text-primary" />
                                <h2 className="card-title mt-3">Bookmarks</h2>
                                <p className="text-sm text-base-content/65">
                                    Find the stories you want to read again.
                                </p>
                                <div className="card-actions mt-4">
                                    <Link to="/bookmarks" className="btn btn-outline btn-sm">
                                        View bookmarks
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="card border border-base-300 bg-base-100">
                            <div className="card-body">
                                <FiBookOpen className="text-2xl text-primary" />
                                <h2 className="card-title mt-3">Explore blogs</h2>
                                <p className="text-sm text-base-content/65">
                                    Discover articles from other writers.
                                </p>
                                <div className="card-actions mt-4">
                                    <Link to="/" className="btn btn-outline btn-sm">
                                        Explore
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
