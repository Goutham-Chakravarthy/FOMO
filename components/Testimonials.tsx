"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";
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

function TestimonialCard({ testimonial, onHoverStart, onHoverEnd }: {
  testimonial: Testimonial;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <div
      className="w-[500px] shrink-0 mr-10 p-2"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 min-h-[240px] shadow-2xl hover:bg-white/15 hover:scale-105 hover:shadow-green-400/10 transition-all duration-300">
        <div className="flex items-center">
          <div className="bg-green-400/10 p-3 rounded-full">
            <User className="w-8 h-8 text-green-400" />
          </div>
          <div className="ml-4">
            <div className="text-white font-semibold text-lg">{testimonial.name}</div>
            <div className="text-green-400 text-sm">{testimonial.college}</div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-6">
            {testimonial.feedback}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials(): React.JSX.Element {
  const controls = useAnimation();

  const CARD_TOTAL_WIDTH = 500 + 40; // w-[500px] + mr-10 (40px)
  const totalWidth = testimonials.length * CARD_TOTAL_WIDTH;
  const doubled = [...testimonials, ...testimonials];

  React.useEffect(() => {
    controls.start({
      x: [0, -totalWidth],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 35,
          ease: "linear",
        },
      },
    });
  }, [controls, totalWidth]);

  const handleHoverStart = () => {
    controls.stop();
  };

  const handleHoverEnd = () => {
    controls.start({
      x: [undefined as unknown as number, -totalWidth],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 35,
          ease: "linear",
        },
      },
    });
  };

  return (
    <section id="testimonials" className="w-full bg-black py-20 overflow-hidden">
      {/* Header - Centered with max-width */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold font-mono text-green-400">
          $ feedback --latest
        </h2>
        <p className="text-gray-400 text-lg mt-3">
          What college students say about our work
        </p>
      </div>

      {/* Full-width carousel with fade effects */}
      <div className="relative overflow-hidden">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        
        <motion.div className="flex" animate={controls} role="list">
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