"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

// Types
type Product = {
  title: string;
  link: string;
  thumbnail: string;
};

// Stock product list (15 items)
const products: Product[] = [
  {
    title: "E‑Commerce Platform",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Task Management App",
    link: "#",
    thumbnail:
      "https://cdn.dribbble.com/userupload/43451921/file/original-59f489ccfd0c3d538e0b337e19c84178.png?resize=752x&vertical=center",
  },
  {
    title: "AI Chat Application",
    link: "#",
    thumbnail:
      "https://cdn.dribbble.com/userupload/43212483/file/original-9d5da2da50b8566ef5fd79f8ad46786e.png?resize=752x&vertical=center",
  },
  {
    title: "Analytics Dashboard",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Social Media Platform",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "DevOps Automation",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "FinTech Wallet",
    link: "#",
    thumbnail:
      "https://cdn.dribbble.com/userupload/43136770/file/original-5fc76b569606af78b9aa2c2d07693816.jpg?resize=752x&vertical=center",
  },
  {
    title: "IoT Control Center",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1553341640-9397992456f3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    title: "Video Streaming App",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "EdTech LMS",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Travel Booking",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Healthcare Portal",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Crypto Exchange",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172",
  },
  {
    title: "Food Delivery",
    link: "#",
    thumbnail:
      "https://cdn.dribbble.com/userupload/10848493/file/original-3663c8ffc97413a862d022d6c8bb9bce.png?resize=752x&vertical=center",
  },
  {
    title: "AR Showroom",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative bg-black min-h-screen overflow-hidden">
      <div className="relative">
        <HeroParallax products={products} />
      </div>
    </section>
  );
}

export const HeroParallax = ({
  products,
}: {
  products: Product[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-24 md:py-40 overflow-hidden antialiased relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 md:space-x-20 mb-12 md:mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-12 md:mb-20 space-x-10 md:space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 md:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-32 px-4 w-full left-0 top-0">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-green-400 font-mono">
        <span className="text-gray-400">$</span> projects --showcase
      </h1>
      <p className="max-w-2xl text-sm sm:text-base md:text-xl mt-6 md:mt-8 text-neutral-200">
        A curated parallax of recent builds across web, AI, DevOps, and data platforms.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: Product;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product h-72 sm:h-80 md:h-96 w-[18rem] sm:w-[24rem] md:w-[30rem] relative shrink-0 rounded-xl overflow-hidden"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          height={600}
          width={600}
          className="object-cover object-center absolute h-full w-full inset-0"
          alt={product.title}
          loading="lazy"
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black transition-opacity duration-300 pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-semibold">
        {product.title}
      </h2>
    </motion.div>
  );
};