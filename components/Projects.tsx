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
  description: string;
};

// Stock product list (15 items)
const products: Product[] = [
  {
    title: "E‑Commerce Platform",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=1200&auto=format&fit=crop",
    description:
      "Modern storefront UI\nSecure payments & orders\nAdmin analytics & inventory",
  },
  {
    title: "Task Management App",
    link: "#",
    thumbnail:
      "https://cdn.dribbble.com/userupload/43451921/file/original-59f489ccfd0c3d538e0b337e19c84178.png?resize=752x&vertical=center",
    description:
      "Plan tasks fast\nCollaborate in real-time\nBoards, chat & notifications",
  },
  {
    title: "AI Chat Application",
    link: "#",
    thumbnail:
      "https://cdn.dribbble.com/userupload/43212483/file/original-9d5da2da50b8566ef5fd79f8ad46786e.png?resize=752x&vertical=center",
    description:
      "GPT‑powered replies\nContext memory & tools\nSecure, scalable infra",
  },
  {
    title: "Analytics Dashboard",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    description:
      "KPI insights in real time\nCustom charts & filters\nExportable reports",
  },
  {
    title: "Social Media Platform",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop",
    description:
      "Feeds, stories, DMs\nCreator tools & moderation\nGraphQL API on cloud",
  },
  {
    title: "DevOps Automation",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    description:
      "Kubernetes pipelines\nIaC with Terraform\nOne‑click deployments",
  },
  {
    title: "FinTech Wallet",
    link: "#",
    thumbnail:
      "https://cdn.dribbble.com/userupload/43136770/file/original-5fc76b569606af78b9aa2c2d07693816.jpg?resize=752x&vertical=center",
    description:
      "Instant transfers\nFraud checks & limits\nInsights and budgeting",
  },
  {
    title: "IoT Control Center",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1553341640-9397992456f3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    description:
      "Device fleets at scale\nTelemetry & alerts\nRemote actions & rules",
  },
  {
    title: "Video Streaming App",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    description:
      "Adaptive bitrate video\nPlaylists & watchlists\nRealtime chat & sync",
  },
  {
    title: "EdTech LMS",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    description:
      "Courses & quizzes\nProgress tracking\nCertificates & grading",
  },
  {
    title: "Travel Booking",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=1200&auto=format&fit=crop",
    description:
      "Flights, stays & cars\nDynamic pricing\nSmart search & maps",
  },
  {
    title: "Healthcare Portal",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    description:
      "Appointments & records\nHIPAA‑ready privacy\nTelemedicine chat",
  },
  {
    title: "Crypto Exchange",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172",
    description:
      "Spot & limit orders\nLedger & cold storage\nCharts and webhooks",
  },
  {
    title: "Food Delivery",
    link: "#",
    thumbnail:
      "https://cdn.dribbble.com/userupload/10848493/file/original-3663c8ffc97413a862d022d6c8bb9bce.png?resize=752x&vertical=center",
    description:
      "Multi‑vendor menus\nLive courier tracking\nRatings & promos",
  },
  {
    title: "AR Showroom",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop",
    description:
      "Immersive product views\nTrue‑to‑scale models\nOne‑tap purchase",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative bg-black min-h-screen overflow-hidden scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-24">
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

  // Responsive values computed on client safely
  const [shift, setShift] = React.useState(1000);
  const [shiftNeg, setShiftNeg] = React.useState(-1000);
  const [shiftYStart, setShiftYStart] = React.useState(-700);
  const [shiftYEnd, setShiftYEnd] = React.useState(500);

  React.useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const isSm = w < 640;
      const isMd = w < 1024;
      const x = isSm ? 400 : isMd ? 700 : 1000;
      setShift(x);
      setShiftNeg(-x);
      setShiftYStart(isSm ? -400 : -700);
      setShiftYEnd(isSm ? 300 : 500);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Responsive translation values - reduced movement on mobile
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, shift]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, shiftNeg]),
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
    useTransform(scrollYProgress, [0, 0.2], [shiftYStart, shiftYEnd]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[250vh] sm:h-[280vh] md:h-[300vh] py-16 sm:py-20 md:py-24 lg:py-40 overflow-hidden antialiased relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
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
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-6 md:space-x-10 lg:space-x-20 mb-8 sm:mb-10 md:mb-12 lg:mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-8 sm:mb-10 md:mb-12 lg:mb-20 space-x-4 sm:space-x-6 md:space-x-10 lg:space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-6 md:space-x-10 lg:space-x-20">
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
    <div className="max-w-7xl relative mx-auto py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 w-full left-0 top-0">
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-green-400 font-mono">
        <span className="text-gray-400">$</span> projects --showcase
      </h1>
      <p className="max-w-2xl text-xs sm:text-sm md:text-base lg:text-xl mt-4 sm:mt-5 md:mt-6 lg:mt-8 text-neutral-200">
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
  const isDisabled = !product.link || product.link === "#";
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product h-56 sm:h-64 md:h-80 lg:h-96 w-56 sm:w-72 md:w-80 lg:w-[30rem] relative shrink-0 rounded-lg sm:rounded-xl overflow-hidden"
    >
      {isDisabled ? (
        <div className="block group-hover/product:shadow-2xl" role="button" aria-disabled="true">
          <img
            src={product.thumbnail}
            height={600}
            width={600}
            className="object-cover object-center absolute h-full w-full inset-0"
            alt={product.title}
            loading="lazy"
          />
        </div>
      ) : (
        <a
          href={product.link}
          className="block group-hover/product:shadow-2xl"
          onClick={(e) => {
            if (product.link === "#") e.preventDefault();
          }}
        >
          <img
            src={product.thumbnail}
            height={600}
            width={600}
            className="object-cover object-center absolute h-full w-full inset-0"
            alt={product.title}
            loading="lazy"
          />
        </a>
      )}
      {/* Top-left description shown on hover */}
      <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 right-3 sm:right-4 md:right-6 z-10 text-white/90 text-[10px] sm:text-xs md:text-sm lg:text-base font-medium whitespace-pre-line opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
        {product.description}
      </div>
      <div className="absolute inset-0 h-full w-full z-0 opacity-0 group-hover/product:opacity-80 bg-black transition-opacity duration-300 pointer-events-none"></div>
      <h2 className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 z-10 opacity-0 group-hover/product:opacity-100 text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg">
        {product.title}
      </h2>
    </motion.div>
  );
};