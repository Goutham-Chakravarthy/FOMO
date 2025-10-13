"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import BeamGridBackground from "@/components/ui/beam-grid-background";

export default function ContactSection(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(1200px_800px_at_80%_-20%,rgba(34,197,94,0.25),transparent),radial-gradient(900px_600px_at_20%_20%,rgba(16,185,129,0.18),transparent),linear-gradient(180deg,#0b0b12,#0a0a0f)]">
      <BeamGridBackground
        gridSize={45}
        gridColor="rgba(255,255,255,0.06)"
        darkGridColor="rgba(255,255,255,0.06)"
        beamColor="rgba(34, 197, 94, 0.85)"
        darkBeamColor="rgba(34, 197, 94, 0.95)"
        beamSpeed={0.12}
        beamThickness={3}
        glowIntensity={45}
        showFade={false}
        fadeIntensity={25}
        className="z-0"
      />

      <div className="pointer-events-none absolute -top-12 sm:-top-24 -left-12 sm:-left-24 h-48 sm:h-72 w-48 sm:w-72 rounded-full bg-green-500/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-12 sm:-bottom-24 -right-12 sm:-right-24 h-56 sm:h-96 w-56 sm:w-96 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center">
            <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-green-300/90 backdrop-blur">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-400" />
              We'd love to hear from you
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Let's build something brilliant together
            </h2>
            <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-300">
              Tell us about your goals and we'll craft the solution. Whether you're
              a startup validating ideas or an enterprise scaling globally, our team
              is ready to help you move fast with confidence.
            </p>

            <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
              <a
                href="mailto:hello@example.com"
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 text-sm text-gray-200 transition hover:border-green-400/30 hover:bg-white/10 backdrop-blur"
              >
                <div className="rounded-lg bg-green-500/15 p-2 text-green-300 transition group-hover:bg-green-500/25 flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-400">Email</div>
                  <div className="font-medium text-white text-sm sm:text-base truncate">hello@example.com</div>
                </div>
              </a>

              <a
                href="tel:+918095534884"
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 text-sm text-gray-200 transition hover:border-green-400/30 hover:bg-white/10 backdrop-blur"
              >
                <div className="rounded-lg bg-green-500/15 p-2 text-green-300 transition group-hover:bg-green-500/25 flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-400">Phone</div>
                  <div className="font-medium text-white text-sm sm:text-base">+91 80955 34884</div>
                </div>
              </a>

              <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 text-sm text-gray-200 transition hover:border-green-400/30 hover:bg-white/10 backdrop-blur">
                <div className="rounded-lg bg-green-500/15 p-2 text-green-300 transition group-hover:bg-green-500/25 flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-400">Location</div>
                  <div className="font-medium text-white text-sm sm:text-base">Karnataka, India</div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10" />

              <form onSubmit={onSubmit} className="relative space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-300">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-3 sm:px-4 py-2 sm:py-3 text-sm text-white placeholder-gray-400 outline-none backdrop-blur transition focus:border-green-400/40 focus:ring-2 focus:ring-green-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-300">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@company.com"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-3 sm:px-4 py-2 sm:py-3 text-sm text-white placeholder-gray-400 outline-none backdrop-blur transition focus:border-green-400/40 focus:ring-2 focus:ring-green-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-300">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-3 sm:px-4 py-2 sm:py-3 text-sm text-white placeholder-gray-400 outline-none backdrop-blur transition focus:border-green-400/40 focus:ring-2 focus:ring-green-500/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-300">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us a bit about your project..."
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-3 sm:px-4 py-2 sm:py-3 text-sm text-white placeholder-gray-400 outline-none backdrop-blur transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-medium text-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-white/20 ${
                    loading ? "opacity-80 cursor-not-allowed" : "hover:from-green-500 hover:to-lime-500"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {success ? (
                      <>
                        <Check size={16} className="" />
                        Sent successfully
                      </>
                    ) : (
                      <>
                        <Send size={16} className={loading ? "animate-pulse" : ""} />
                        {loading ? "Sending…" : "Send message"}
                      </>
                    )}
                  </span>
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-0" />
                </button>

                <p className="text-center text-xs text-gray-400">
                  We typically respond within 1 business day.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}