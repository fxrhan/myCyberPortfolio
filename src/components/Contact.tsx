"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Contact() {
    return (
        <section id="contact" className="py-20 px-4 md:px-10 bg-black min-h-[80vh] flex flex-col justify-between">
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">
                        Got a project in mind? <br />
                        Let's talk
                    </h2>

                    <Link
                        href="mailto:fxrhanansari@gmail.com"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full text-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                        Get in touch
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-t border-white/10 pt-10"
                >
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                        <div>
                            <p className="text-muted-foreground mb-2">your friendly chaos creator</p>
                            <h1 className="text-[12vw] leading-none font-bold tracking-tighter text-white">
                                Farhan
                            </h1>
                        </div>

                        <div className="flex gap-6 mb-4">
                            <Link href="https://linkedin.com/in/ansari-farhan" target="_blank" className="text-muted-foreground hover:text-white transition-colors">LinkedIn</Link>
                            <Link href="https://github.com/fxrhan" target="_blank" className="text-muted-foreground hover:text-white transition-colors">GitHub</Link>
                            <Link href="https://x.com/fxrhanansari" target="_blank" className="text-muted-foreground hover:text-white transition-colors">X (Twitter)</Link>
                            <Link href="https://fxrhanansari.medium.com/" target="_blank" className="text-muted-foreground hover:text-white transition-colors">Medium</Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
