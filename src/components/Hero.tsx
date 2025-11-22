"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col justify-center px-4 md:px-10 pt-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-sm md:text-base font-medium text-muted-foreground mb-4 tracking-wider uppercase">
                        Cyber Security Analyst
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
                        Farhan <br />
                        <span className="text-muted-foreground">Ansari</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
                        Driven by curiosity and a love for security. I create simple, functional, and secure digital experiences.
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20"></div>
                        <span className="text-sm text-muted-foreground">Based in Ahmedabad, India</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden transition-all duration-500"
                >
                    <Image
                        src="/hero.jpg"
                        alt="Farhan in Cyber"
                        fill
                        className="object-cover"
                        quality={100}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>
            </div>

            {/* Arrow removed as per request */}
        </section>
    );
}
