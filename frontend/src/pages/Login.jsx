import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthLayout from "../components/layout/AuthLayout";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");;
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email.trim() || !password) {
            return toast.error("Please enter your email and password.");
        }

        login({ email: email.trim() });
        navigate("/dashboard")
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to continue your reading and writing journey."
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="label"
                    >
                        <span className="label-text font-semibold">Email address</span>
                    </label>

                    <label
                        className="input input-bordered flex w-full items-center gap-3"
                    >
                        <FiMail className="text-base-content/50" />
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email"
                            className="grow"
                            required
                        />
                    </label>
                </div>

                {/* Password */}
                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="label"
                        >
                            <span className="label-text font-semibold">Password</span>
                        </label>

                        <button
                            type="button"
                            onClick={() => toast("Password recovery will be added soon.")}
                            className="text-xs font-semibold text-primary hover:underline"
                        >
                            Forgot password
                        </button>
                    </div>

                    <label
                        className="input input-bordered flex w-full items-center gap-3"
                    >
                        <FiLock className="text-base-content/50" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="current-password"
                            className="grow"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </label>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Sign in
                </button>
            </form>

            <p className="mt-7 text-center text-sm text-base-content/65">
                Don't have an account:{" "}
                <Link
                    to="/register"
                    className="font-bold text-primary hover:underline"
                >
                    Create an account
                </Link>
            </p>

        </AuthLayout >
    );
};

export default Login;