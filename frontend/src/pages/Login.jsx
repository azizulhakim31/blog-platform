import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const { login }=useAuth();

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
        <div>

        </div>
    );
};

export default Login;