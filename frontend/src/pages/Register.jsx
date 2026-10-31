import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthLayout from "../components/layout/AuthLayout";
import { FiCheckCircle, FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            return toast.error("Please fill in all fields");
        }

        if (password.length < 8) {
            return toast.error("Password must be at least 8 characters");
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        register({ name: name.trim(), email: email.trim(), password });
        navigate("/dashboard");
    }

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Join Relato and start sharing your stories."
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {/* Name */}
                <div>
                    <label
                        className="label"
                        htmlFor="name"
                    >
                        <span className="label-text font-semibold">Full name</span>
                    </label>

                    <label className="input input-bordered flex w-full items-center gap-3">
                        <FiUser className="text-base-content/50" />
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                            className="grow"
                            required
                        />
                    </label>
                </div>

                {/* Email */}
                <div>
                    <label
                        className="label"
                        htmlFor="email"
                    >
                        <span className="label-text font-semibold">Email address</span>
                    </label>

                    <label className="input input-bordered flex w-full items-center gap-3">
                        <FiMail className="text-base-content/50" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            className="grow"
                            required
                        />
                    </label>
                </div>

                {/* Password */}
                <div>
                    <label
                        className="label"
                        htmlFor="password"
                    >
                        <span className="label-text font-semibold">Password</span>
                    </label>

                    <label className="input input-bordered flex w-full items-center gap-3">
                        <FiLock className="text-base-content/50" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Minimum 8 characters"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            minLength={8}
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

                {/* Confirm password */}
                <div>
                    <label
                        className="label"
                        htmlFor="confirmPassword"
                    >
                        <span className="label-text font-semibold">Confirm password</span>
                    </label>

                    <label className="input input-bordered flex w-full items-center gap-3">
                        <FiLock className="text-base-content/50" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            className="grow"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label="Toggle confirm password visibility"
                        >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </label>
                </div>

                <div className="flex items-center gap-2 text-sm text-base-content/65">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-primary" />
                    <p>Your password must contain at least 8 characters.</p>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Create account
                </button>
            </form>

            <p className="mt-7 text-center text-sm text-base-content/65">
                Already have an account:{" "}
                <Link
                    to="/login"
                    className="font-bold text-primary hover:underline"
                >
                    Sign in
                </Link>
            </p>

        </AuthLayout>
    );
};

export default Register;