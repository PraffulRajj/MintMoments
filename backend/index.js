import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoutes from "./routes/auth.js";

const app = express();

// In production (Render) we’re behind a proxy; required for secure cookies
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://mintmoments.netlify.app",
];

// CORS (credentials + explicit origins)
app.use(
  cors({
    origin(origin, cb) {
      // allow non-browser tools (no origin) and our whitelisted origins
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Session (only used by passport, we auth clients with our JWT cookie)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Load passport AFTER env + session
(async () => {
  await import("./config/passport.js");

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

  app.use("/api/auth", authRoutes);

  app.get("/", (_req, res) => res.send("✅ API Running"));

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
})();
