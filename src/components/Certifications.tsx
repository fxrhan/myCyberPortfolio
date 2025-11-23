"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certifications = [
    {
        name: "(ISC)² Certified in Cybersecurity",
        issuer: "(ISC)²",
        year: "2023",
        logo: "/isc2_logo.png"
    },
    {
        name: "EC Council CICT",
        issuer: "EC Council",
        year: "2023",
        logo: "/eccouncil_logo.png"
    },
    {
        name: "Stanford Web Security Professional",
        issuer: "Stanford University",
        year: "2022",
        logo: "/stanford_logo.png"
    },
    {
        name: "Azure AZ-900",
        issuer: "Microsoft",
        year: "2022",
        logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
        transparentBg: true
    },
    {
        name: "Google Digital Marketing",
        issuer: "Google",
        year: "2021",
        logo: "/google_logo.png"
    }
];

export default function Certifications() {
    return (
        <section className="py-20 px-4 md:px-10 bg-black">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 flex items-center gap-4">
                        <Award className="w-8 h-8 md:w-12 md:h-12 text-primary" />
                        Certifications
                    </h2>
                    <p className="text-muted-foreground max-w-md">
                        Professional credentials that validate my knowledge and dedication to industry standards.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors flex items-center gap-4"
                        >
                            <div className={`w-12 h-12 rounded-full p-1 flex items-center justify-center overflow-hidden shrink-0 ${
                                // @ts-ignore
                                cert.transparentBg ? '' : 'bg-white'
                                }`}>
                                <img
                                    src={cert.logo}
                                    alt={`${cert.issuer} logo`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">{cert.name}</h3>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>{cert.issuer}</span>
                                    {/* <span>{cert.year}</span> */}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
