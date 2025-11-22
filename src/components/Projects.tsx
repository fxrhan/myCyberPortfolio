"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        title: "passForge",
        category: "Cybersecurity Tool",
        description: "Intelligence-driven password list generator with ML-based patterns and phonetic variations.",
        link: "https://github.com/fxrhan/passForge",
        color: "bg-red-500",
        image: "/passforge_bg.png"
    },
    {
        title: "takeover",
        category: "Open Source Contribution",
        description: "Sub-Domain TakeOver Vulnerability Scanner (edoardottt fork).",
        link: "https://github.com/edoardottt/takeover",
        color: "bg-orange-500",
        image: "/takeover_bg.png"
    },
    {
        title: "Packet-Sniffer",
        category: "Cybersecurity Tool",
        description: "A simple packet sniffer coded in pure python.",
        link: "https://github.com/fxrhan/Packet-Sniffer",
        color: "bg-green-500",
        image: "/packet_sniffer_bg.png"
    },
    {
        title: "Web-Recon-Automation",
        category: "Automation Script",
        description: "A bash script to automate the necessary Reconnaissance task for websites.",
        link: "https://github.com/fxrhan/Web-Recon-Automation",
        color: "bg-purple-500",
        image: "/recon_bg.png"
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-20 px-4 md:px-10 bg-black">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-end mb-16"
                >
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Impressive Works</h2>
                        <p className="text-muted-foreground max-w-md">
                            Here are some of the projects I've worked on. Each one was a unique challenge that helped me grow.
                        </p>
                    </div>
                    <Link href="https://github.com/fxrhan?tab=repositories" target="_blank" className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-white transition-colors">
                        View all repositories <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <Link href={project.link} target="_blank">
                                <div className={`relative h-[250px] md:h-[300px] w-full rounded-3xl overflow-hidden mb-6 border border-white/5 group-hover:border-primary/50 transition-colors`}>
                                    {/* Image */}
                                    <div className="absolute inset-0">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                                    </div>

                                    {/* Content overlay */}
                                    <div className="absolute bottom-6 left-6 right-6 z-10">
                                        <div className={`w-12 h-12 rounded-full ${project.color} flex items-center justify-center mb-4 text-white`}>
                                            <Github className="w-6 h-6" />
                                        </div>
                                        {/* Title removed from here to avoid duplication */}
                                        <p className="text-sm text-white/70 line-clamp-2">{project.description}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start px-2">
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                                        <p className="text-muted-foreground">{project.category}</p>
                                    </div>
                                    <div className="p-3 rounded-full border border-white/10 group-hover:bg-primary group-hover:border-primary transition-colors">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link
                        href="https://github.com/fxrhan"
                        target="_blank"
                        className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white font-medium flex items-center gap-2"
                    >
                        And many more <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
