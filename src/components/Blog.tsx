"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ArrowUpRight, BookOpen, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import SkeletonCard from "./SkeletonCard";

interface BlogPost {
    title: string;
    pubDate: string;
    link: string;
    thumbnail: string;
    categories: string[];
}

const CACHE_KEY = "medium_blog_posts";
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = (newDirection: number) => {
        const newIndex = currentIndex + newDirection;
        if (newIndex >= 0 && newIndex < posts.length) {
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

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Check cache first (with try-catch for SSR and private browsing)
                try {
                    const cached = localStorage.getItem(CACHE_KEY);
                    if (cached) {
                        const { data, timestamp } = JSON.parse(cached);
                        const age = Date.now() - timestamp;

                        if (age < CACHE_DURATION) {
                            setPosts(data);
                            setLoading(false);
                            return;
                        }
                    }
                } catch (storageError) {
                    // localStorage not available (SSR, private browsing, etc.)
                    // Continue to fetch from API
                }

                // Fetch from API
                const rssUrl = process.env.NEXT_PUBLIC_MEDIUM_RSS_URL || "https://medium.com/feed/@fxrhanansari";
                const apiUrl = process.env.NEXT_PUBLIC_RSS_API_URL || "https://api.rss2json.com/v1/api.json";

                const res = await fetch(`${apiUrl}?rss_url=${encodeURIComponent(rssUrl)}`);

                if (!res.ok) {
                    if (res.status === 429) {
                        throw new Error("Too many requests. Please try again later.");
                    }
                    throw new Error("Failed to fetch blog posts");
                }

                const data = await res.json();

                if (data.status === "error") {
                    throw new Error(data.message || "Failed to fetch blog posts");
                }

                if (data.items) {
                    const postsWithThumbnails = data.items.map((item: any) => {
                        // Extract image from content or description if thumbnail is missing
                        let thumbnail = item.thumbnail;
                        if (!thumbnail) {
                            // Try content first as it usually has the full HTML
                            if (item.content) {
                                const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                                if (imgMatch) {
                                    thumbnail = imgMatch[1];
                                }
                            }
                            // Fallback to description
                            if (!thumbnail && item.description) {
                                const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
                                if (imgMatch) {
                                    thumbnail = imgMatch[1];
                                }
                            }
                        }
                        return { ...item, thumbnail };
                    });

                    const latestPosts = postsWithThumbnails.slice(0, 4);
                    setPosts(latestPosts);

                    // Cache the results (with try-catch for SSR and private browsing)
                    try {
                        localStorage.setItem(CACHE_KEY, JSON.stringify({
                            data: latestPosts,
                            timestamp: Date.now()
                        }));
                    } catch (storageError) {
                        // localStorage not available, continue without caching
                    }
                }
            } catch (err) {
                console.error("Error fetching blog posts:", err);
                setError(err instanceof Error ? err.message : "Failed to load blog posts");

                // Try to use stale cache if available
                try {
                    const cached = localStorage.getItem(CACHE_KEY);
                    if (cached) {
                        const { data } = JSON.parse(cached);
                        setPosts(data);
                        setError(null); // Clear error if we have cached data
                    }
                } catch (storageError) {
                    // localStorage not available, show error state
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <section id="blog" className="py-20 px-4 md:px-10 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-end mb-12"
                >
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Latest Thoughts</h2>
                        <p className="text-muted-foreground max-w-md">
                            Insights and articles on cybersecurity, technology, and my learning journey.
                        </p>
                    </div>
                    <Link
                        href={process.env.NEXT_PUBLIC_MEDIUM_URL || "https://fxrhanansari.medium.com/"}
                        target="_blank"
                        className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                    >
                        Read more blogs on Medium <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {!loading && error && posts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="inline-flex items-center gap-2 text-muted-foreground mb-4">
                            <AlertCircle className="w-5 h-5" />
                            <p>{error}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Visit my{" "}
                            <Link
                                href={process.env.NEXT_PUBLIC_MEDIUM_URL || "https://fxrhanansari.medium.com/"}
                                target="_blank"
                                className="text-primary hover:underline"
                            >
                                Medium profile
                            </Link>{" "}
                            to read my latest articles.
                        </p>
                    </motion.div>
                )}

                {/* Posts */}
                {!loading && posts.length > 0 && (
                    <>
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
                                        <BlogCard post={posts[currentIndex]} index={currentIndex} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Carousel Navigation */}
                            <div className="flex justify-center items-center gap-4 mt-6">
                                <button
                                    onClick={() => paginate(-1)}
                                    disabled={currentIndex === 0}
                                    className="p-3 rounded-full border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                                    aria-label="Previous post"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <div className="flex gap-2">
                                    {posts.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setDirection(idx > currentIndex ? 1 : -1);
                                                setCurrentIndex(idx);
                                            }}
                                            className={`w-2 h-2 rounded-full transition-colors touch-manipulation ${idx === currentIndex ? "bg-primary" : "bg-white/20"
                                                }`}
                                            aria-label={`Go to post ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={() => paginate(1)}
                                    disabled={currentIndex === posts.length - 1}
                                    className="p-3 rounded-full border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                                    aria-label="Next post"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Desktop Grid */}
                        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {posts.map((post, index) => (
                                <BlogCard key={index} post={post} index={index} />
                            ))}
                        </div>

                        <div className="mt-8 md:hidden flex justify-center">
                            <Link
                                href={process.env.NEXT_PUBLIC_MEDIUM_URL || "https://fxrhanansari.medium.com/"}
                                target="_blank"
                                className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors min-h-[44px] touch-manipulation"
                            >
                                Read more on Medium <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

function BlogCard({ post, index }: BlogCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col h-full"
        >
            <Link href={post.link} target="_blank" className="flex-1 flex flex-col">
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 border border-white/10 group-hover:border-primary/50 transition-colors">
                    {post.thumbnail ? (
                        <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                            <BookOpen className="w-10 h-10 text-neutral-700" />
                        </div>
                    )}
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex gap-2 mb-3 flex-wrap">
                        {post.categories.slice(0, 2).map((cat, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5">
                                {cat}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-auto">
                        {new Date(post.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}
