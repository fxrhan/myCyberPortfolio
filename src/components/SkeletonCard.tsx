"use client";

import { motion } from "framer-motion";

export default function SkeletonCard() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col"
        >
            {/* Image skeleton */}
            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 border border-white/10 bg-neutral-900/50">
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/50 via-neutral-800/50 to-neutral-900/50 animate-pulse" />
            </div>

            {/* Content skeleton */}
            <div className="space-y-3">
                {/* Tags skeleton */}
                <div className="flex gap-2">
                    <div className="h-5 w-16 bg-neutral-800/50 rounded-full animate-pulse" />
                    <div className="h-5 w-20 bg-neutral-800/50 rounded-full animate-pulse" />
                </div>

                {/* Title skeleton */}
                <div className="space-y-2">
                    <div className="h-6 w-full bg-neutral-800/50 rounded animate-pulse" />
                    <div className="h-6 w-3/4 bg-neutral-800/50 rounded animate-pulse" />
                </div>

                {/* Date skeleton */}
                <div className="h-4 w-24 bg-neutral-800/50 rounded animate-pulse" />
            </div>
        </motion.div>
    );
}
