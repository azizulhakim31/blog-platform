const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const engagementRoutes = require("./routes/engagementRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const profileRoutes = require("./routes/profileRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", engagementRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/users", profileRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to BlogSpace API!",
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "BlogSpace API is running!",
    });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();