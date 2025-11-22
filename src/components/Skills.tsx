"use client";

import { motion } from "framer-motion";
import { FaReact, FaPython, FaAws, FaDocker, FaMicrosoft } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiSplunk, SiJavascript, SiC, SiGnubash, SiKalilinux, SiWireshark, SiBurpsuite, SiMetasploit } from "react-icons/si";
import { Shield, Users, MessageSquare, Brain, Zap } from "lucide-react";

const skills = [
    {
        category: "Security Operations & Tools",
        icon: <Shield className="w-6 h-6" />,
        items: [
            { name: "Penetration Testing", icon: <SiKalilinux /> },
            { name: "Splunk", icon: <SiSplunk /> },
            { name: "Sentinel", icon: <FaMicrosoft /> },
            { name: "Wireshark", icon: <SiWireshark /> },
            { name: "Burp Suite", icon: <SiBurpsuite /> },
            { name: "Metasploit", icon: <SiMetasploit /> },
            { name: "Nmap", icon: <SiKalilinux /> }
        ],
        className: "md:col-span-2 md:row-span-1 bg-indigo-900/20 border-indigo-500/20",
    },
    {
        category: "Cloud Security & DevOps",
        icon: <FaAws className="w-6 h-6" />,
        items: [
            { name: "Azure", icon: <FaMicrosoft /> },
            { name: "AWS", icon: <FaAws /> },
            { name: "Docker", icon: <FaDocker /> },
            { name: "Cloud Security", icon: <Shield /> }
        ],
        className: "md:col-span-2 md:row-span-1 bg-neutral-900/50 border-neutral-800",
    },
    {
        category: "Languages & Scripting",
        icon: <SiJavascript className="w-6 h-6" />,
        items: [
            { name: "Python", icon: <FaPython /> },
            { name: "Bash", icon: <SiGnubash /> },
            { name: "JavaScript", icon: <SiJavascript /> },
            { name: "C", icon: <SiC /> }
        ],
        className: "md:col-span-1 bg-neutral-900/50 border-neutral-800",
    },
    {
        category: "Front-End",
        icon: <FaReact className="w-6 h-6" />,
        items: [
            { name: "React", icon: <FaReact /> },
            { name: "Next.js", icon: <SiNextdotjs /> },
            { name: "Tailwind", icon: <SiTailwindcss /> }
        ],
        className: "md:col-span-1 bg-neutral-900/50 border-neutral-800",
    },
    {
        category: "Soft Skills",
        icon: <Users className="w-6 h-6" />,
        items: [
            { name: "Communication", icon: <MessageSquare /> },
            { name: "Problem Solving", icon: <Brain /> },
            { name: "Leadership", icon: <Users /> },
            { name: "Adaptability", icon: <Zap /> }
        ],
        className: "md:col-span-2 bg-emerald-900/20 border-emerald-500/20",
    },
];

export default function Skills() {
    return (
        <section id="skills" className="py-20 px-4 md:px-10 bg-black">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Skills that fuel my passion</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-6 rounded-3xl border flex flex-col justify-between group hover:border-primary/50 transition-colors ${skill.className}`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-white/5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    {skill.icon}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">{skill.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="relative group/tooltip"
                                        >
                                            <span className="text-sm text-muted-foreground bg-white/5 px-3 py-1.5 rounded-md flex items-center gap-2 hover:bg-white/10 transition-colors cursor-default">
                                                <span className="text-lg">{item.icon}</span>
                                                {item.name}
                                            </span>

                                            {/* Tooltip */}
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-neutral-800 text-white text-xs rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 z-20">
                                                {item.name}
                                                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-800 rotate-45 border-b border-r border-white/10"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
