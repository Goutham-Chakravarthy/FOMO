import React from 'react';

// Types
interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  gradient: string;
}

// Dummy Projects Data
const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
    techStack: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'Real-time collaborative task management tool with team workspaces and live updates.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'AI Chat Application',
    description:
      'Intelligent chatbot platform powered by GPT-4 with custom training and context management.',
    techStack: ['TypeScript', 'OpenAI API', 'Redis', 'Docker'],
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-500',
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    description:
      'Comprehensive data visualization dashboard with real-time metrics and custom reporting.',
    techStack: ['React', 'D3.js', 'Python', 'FastAPI'],
    gradient: 'bg-gradient-to-br from-orange-500 to-red-500',
  },
  {
    id: 5,
    title: 'Social Media Platform',
    description:
      'Modern social networking platform with feeds, stories, messaging, and content moderation.',
    techStack: ['Next.js', 'GraphQL', 'AWS', 'Prisma'],
    gradient: 'bg-gradient-to-br from-indigo-500 to-purple-500',
  },
  {
    id: 6,
    title: 'DevOps Automation Tool',
    description:
      'Infrastructure automation and deployment pipeline management with multi-cloud support.',
    techStack: ['Go', 'Kubernetes', 'Terraform', 'Jenkins'],
    gradient: 'bg-gradient-to-br from-yellow-500 to-orange-500',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-black min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold font-mono text-green-400 mb-6">
            <span className="text-gray-400">$</span> projects --showcase
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Explore a curated selection of professional, production-ready builds across web, AI, and platform engineering.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-green-400/10"
            >
              {/* Image / Gradient Section */}
              <div
                className={[
                  'w-full h-48 aspect-video rounded-t-2xl',
                  'transition-all duration-300 brightness-100 group-hover:brightness-110',
                  project.gradient,
                ].join(' ')}
              />

              {/* Content (Glassmorphism) */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 border-t-0 p-6 rounded-b-2xl">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {project.title}
                </h3>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-green-400/10 border border-green-400/30 px-3 py-1 rounded-full text-green-400 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* CTA Button */}
                <button
                  type="button"
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-green-400/50 px-4 py-2 rounded-full text-white transition-all duration-300"
                >
                  View Project →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
