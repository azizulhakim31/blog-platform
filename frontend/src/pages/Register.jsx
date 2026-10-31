import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

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
        <div>

        </div>
    );
};

export default Register;