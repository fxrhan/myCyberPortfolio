"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ArrowUpRight, Github, ChevronLeft, ChevronRight } from "lucide-react";
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
        description: "Sub-Domain TakeOver Vulnerability Scanner.",
        link: "https://github.com/edoardottt/takeover",
        color: "bg-orange-500",
        image: "/takeover_bg.png"
    },
    {
        title: "Packet-Sniffer",
        category: "Cybersecurity Tool",
        description: "A packet sniffer coded in pure python.",
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

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export default function Projects() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = (newDirection: number) => {
        const newIndex = currentIndex + newDirection;
        if (newIndex >= 0 && newIndex < projects.length) {
            setDirection(newDirection);
            setCurrentIndex(newIndex);
        }
    };

    const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
        } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 200 : -200,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 200 : -200,
            opacity: 0
        })
    };

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

                {/* Mobile Swipe Carousel */}
                <div className="md:hidden relative">
                    <div className="overflow-hidden">
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "tween", duration: 0.25, ease: "easeOut" },
                                    opacity: { duration: 0.15 }
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={handleDragEnd}
                                className="cursor-grab active:cursor-grabbing touch-pan-y"
                            >
                                <ProjectCard project={projects[currentIndex]} index={currentIndex} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Carousel Navigation */}
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                            onClick={() => paginate(-1)}
                            disabled={currentIndex === 0}
                            className="p-3 rounded-full border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                            aria-label="Previous project"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex gap-2">
                            {projects.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setDirection(idx > currentIndex ? 1 : -1);
                                        setCurrentIndex(idx);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-colors touch-manipulation ${idx === currentIndex ? "bg-primary" : "bg-white/20"
                                        }`}
                                    aria-label={`Go to project ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => paginate(1)}
                            disabled={currentIndex === projects.length - 1}
                            className="p-3 rounded-full border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                            aria-label="Next project"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link
                        href="https://github.com/fxrhan"
                        target="_blank"
                        className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white font-medium flex items-center gap-2 min-h-[44px] touch-manipulation"
                    >
                        And many more <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

interface ProjectCardProps {
    project: typeof projects[0];
    index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
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
    );
}
