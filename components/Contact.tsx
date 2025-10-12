"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function Contact(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    // Simulate async submit; replace with your API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(1200px_800px_at_80%_-20%,rgba(99,102,241,0.35),transparent),radial-gradient(900px_600px_at_20%_20%,rgba(34,211,238,0.2),transparent),linear-gradient(180deg,#0b0b12,#0a0a0f)]">
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: Heading + Contact Info */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-300/90 backdrop-blur">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              We’d love to hear from you
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Let’s build something brilliant together
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300">
              Tell us about your goals and we’ll craft the solution. Whether you’re
              a startup validating ideas or an enterprise scaling globally, our team
              is ready to help you move fast with confidence.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <a
                href="mailto:hello@example.com"
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200 transition hover:border-cyan-400/30 hover:bg-white/10 backdrop-blur"
              >
                <div className="rounded-lg bg-cyan-500/15 p-2 text-cyan-300 transition group-hover:bg-cyan-500/25">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-gray-400">Email</div>
                  <div className="font-medium text-white">hello@example.com</div>
                </div>
              </a>

              <a
                href="tel:+1234567890"
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200 transition hover:border-fuchsia-400/30 hover:bg-white/10 backdrop-blur"
              >
                <div className="rounded-lg bg-fuchsia-500/15 p-2 text-fuchsia-300 transition group-hover:bg-fuchsia-500/25">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-gray-400">Phone</div>
                  <div className="font-medium text-white">+91 80955 34884</div>
                </div>
              </a>

              <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200 transition hover:border-indigo-400/30 hover:bg-white/10 backdrop-blur">
                <div className="rounded-lg bg-indigo-500/15 p-2 text-indigo-300 transition group-hover:bg-indigo-500/25">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-gray-400">Location</div>
                  <div className="font-medium text-white">Karnataka, India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form (Glassmorphism) */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              {/* gradient edges */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10" />

              <form onSubmit={onSubmit} className="relative space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-300">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 outline-none backdrop-blur transition focus:border-fuchsia-400/40 focus:ring-2 focus:ring-fuchsia-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-300">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@company.com"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 outline-none backdrop-blur transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-500/20"
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
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 outline-none backdrop-blur transition focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-300">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us a bit about your project..."
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 outline-none backdrop-blur transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-cyan-600 px-5 py-3 text-sm font-medium text-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-white/20 ${
                    loading ? "opacity-80 cursor-not-allowed" : "hover:from-fuchsia-500 hover:to-cyan-500"
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
                  {/* sheen */}
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
