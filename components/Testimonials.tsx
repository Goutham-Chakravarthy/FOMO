"use client";

import React from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { User } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  college: string;
  feedback: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Siddharth S",
    college: "REVA University, Bengaluru",
    feedback:
      "Working with this agency was an incredible experience. They built our project website perfectly aligned with our technical presentation goals, and the UI design stood out during our campus showcase. Their delivery speed and attention to responsive design were top-notch.",
  },
  {
    id: 2,
    name: "Shantanu S",
    college: "Dayananda Sagar College of Engineering, Bengaluru",
    feedback:
      "I approached them for our final-year project website. They not only helped develop it using React but also guided us in making the backend scalable. The communication was clear, and their documentation made our viva preparation much easier.",
  },
  {
    id: 3,
    name: "Ritwik Kumar",
    college: "MS Ramaiah Institute of Technology, Bengaluru",
    feedback:
      "As someone passionate about system design, I was impressed by their technical understanding. The team helped us deploy our prototype on Vercel and ensured everything was live before our demo. Great experience for any engineering student looking to go professional.",
  },
  {
    id: 4,
    name: "Purnachander R",
    college: "Alva's Institute of Engineering & Technology, Mijar",
    feedback:
      "Our student club wanted a simple portfolio site for event registration and updates. These developers provided a clean and easy-to-use interface, optimized for mobile access. They even added an admin page for managing event details in real time.",
  },
  {
    id: 5,
    name: "Gargee Satyam Jyottsana",
    college: "PES University, Bengaluru",
    feedback:
      "I'm from a computer science background, and I was amazed by the modern tech stack they used — Next.js, Node, and MongoDB. They made our internship submission portal look professional and helped us understand hosting and database linking.",
  },
  {
    id: 6,
    name: "Rahul D",
    college: "RV College of Engineering, Bengaluru",
    feedback:
      "Our mini-project team collaborated with this agency for a quick project showcase site. They designed it beautifully using React and Tailwind CSS. The result helped us get shortlisted in our department's innovation expo.",
  },
  {
    id: 7,
    name: "Niveditha M",
    college: "NMAM Institute of Technology, Nitte",
    feedback:
      "As students, we always struggle with deadlines. But this agency understood our needs completely. The team delivered a working prototype website in under a week with clean code and simple navigation that impressed our faculty.",
  },
];

function TestimonialCard({ testimonial, onHoverStart, onHoverEnd }: { testimonial: Testimonial; onHoverStart?: () => void; onHoverEnd?: () => void; }) {
  return (
    <div className="w-[280px] sm:w-[380px] md:w-[450px] lg:w-[500px] shrink-0 mr-4 sm:mr-6 md:mr-8 lg:mr-10 p-2" onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd}>
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-5 sm:p-6 md:p-8 min-h-[220px] sm:min-h-[230px] md:min-h-[240px] shadow-2xl hover:bg-white/15 hover:scale-105 hover:shadow-green-400/10 transition-all duration-300">
        <div className="flex items-center">
          <div className="bg-green-400/10 p-2 sm:p-3 rounded-full">
            <User className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-400" />
          </div>
          <div className="ml-3 sm:ml-4">
            <div className="text-white font-semibold text-base sm:text-lg">{testimonial.name}</div>
            <div className="text-green-400 text-xs sm:text-sm">{testimonial.college}</div>
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-6">
            {testimonial.feedback}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials(): React.JSX.Element {
  const CARD_WIDTH_MOBILE = 280 + 16; // w-[280px] + mr-4 (16px)
  const CARD_WIDTH_SM = 380 + 24; // w-[380px] + mr-6 (24px)
  const CARD_WIDTH_MD = 450 + 32; // w-[450px] + mr-8 (32px)
  const CARD_WIDTH_LG = 500 + 40; // w-[500px] + mr-10 (40px)
  
  const [cardWidth, setCardWidth] = React.useState(CARD_WIDTH_LG);
  
  React.useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) {
        setCardWidth(CARD_WIDTH_MOBILE);
      } else if (window.innerWidth < 768) {
        setCardWidth(CARD_WIDTH_SM);
      } else if (window.innerWidth < 1024) {
        setCardWidth(CARD_WIDTH_MD);
      } else {
        setCardWidth(CARD_WIDTH_LG);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  const totalWidth = testimonials.length * cardWidth;
  const doubled = [...testimonials, ...testimonials];

  // Motion value for smooth, controllable marquee
  const x = useMotionValue(0);
  const animRef = React.useRef<ReturnType<typeof animate> | null>(null);

  // Adjust duration based on screen size for consistent speed
  const duration = typeof window !== "undefined" && window.innerWidth < 640 ? 25 : typeof window !== "undefined" && window.innerWidth < 768 ? 30 : 35;

  const startAnimation = React.useCallback((from?: number) => {
    const start = typeof from === "number" ? from : x.get();
    // Normalize start within one loop for numerical stability
    const normalizedStart = ((start % -totalWidth) + -totalWidth) % -totalWidth;
    x.set(normalizedStart);
    animRef.current = animate(x, [normalizedStart, normalizedStart - totalWidth], {
      duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
  }, [x, totalWidth, duration]);

  React.useEffect(() => {
    // Start or restart animation when sizes change
    animRef.current?.stop();
    startAnimation(0);
    return () => {
      animRef.current?.stop();
    };
  }, [totalWidth, startAnimation]);

  const handleHoverStart = React.useCallback(() => {
    animRef.current?.stop();
    animRef.current = null;
  }, []);

  const handleHoverEnd = React.useCallback(() => {
    startAnimation(x.get());
  }, [startAnimation, x]);

  return (
    <section id="testimonials" className="w-full bg-black pt-0 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Header - Centered with max-width */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-mono text-green-400">
          $ feedback --latest
        </h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-2 sm:mt-3">
          What college students say about our work
        </p>
      </div>

      {/* Full-width carousel with fade effects */}
      <div className="relative overflow-hidden">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex"
          role="list"
          style={{ willChange: 'transform', x }}
          key={totalWidth}
        >
          {doubled.map((t, i) => (
            <TestimonialCard
              key={`${t.id}-${i}`}
              testimonial={t}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}