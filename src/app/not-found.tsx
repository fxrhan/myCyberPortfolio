"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
            {/* Background Glitch Effect */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
            >
                <ShieldAlert className="w-24 h-24 text-red-500 mx-auto mb-6 animate-pulse" />

                <h1 className="text-6xl md:text-9xl font-bold text-white mb-4 tracking-tighter">
                    404
                </h1>

                <h2 className="text-2xl md:text-4xl font-bold text-red-500 mb-6 uppercase tracking-widest">
                    Breach Detected
                </h2>

                <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
                    The signal you are looking for has been lost or intercepted.
                    Return to base immediately.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-medium group"
                >
                    <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Return to Safety
                </Link>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping delay-700" />
        </div>
    );
}
