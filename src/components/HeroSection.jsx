import React from "react";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const captions = [
  ["THIS", "is", "EXACTLY", "what", "VIRAL", "looks like"],
  ["YOUR", "best", "MOMENTS", "found", "BY", "AI"],
  ["HOOKS", "that", "STOP", "the", "SCROLL"],
];

const stats = [
  { num: "2.4M+", label: "clips created" },
  { num: "180K", label: "creators" },
  { num: "10×", label: "faster output" },
];

export default function HeroSection() {
  const [captionIdx, setCaptionIdx] = useState(0);
  const [viralScore] = useState(94);

  useEffect(() => {
    const interval = setInterval(() => {
      setCaptionIdx((i) => (i + 1) % captions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const words = captions[captionIdx];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(108,92,231,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,210,168,0.07) 0%, transparent 70%)",
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,239,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,239,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent2 animate-pulse-dot" />
              <span className="text-xs font-medium text-violet-300">
                AI-powered video repurposing
              </span>
            </div>

            <h1 className="font-display font-extrabold text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.05] mb-6">
              Turn any video
              <br />
              into <span className="text-gradient">viral content</span>
              <br />
              in seconds.
            </h1>

            <p className="text-white/45 text-lg leading-relaxed font-light mb-8 max-w-lg">
              VIRA automatically finds your best moments, adds captions,
              voiceovers, and creates social-ready short clips — no editing
              skills needed.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                to="/auth"
                className="btn-primary flex items-center gap-2 no-underline"
              >
                Try VIRA Free
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/demo"
                className="btn-secondary flex items-center gap-2 no-underline"
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <Play size={8} fill="white" className="ml-0.5" />
                </div>
                Watch Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-6 border-t border-white/[0.07]">
              {stats.map(({ num, label }) => (
                <div key={label}>
                  <p className="font-display font-bold text-2xl text-white">
                    {num}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – phone mockup */}
          <div className="flex justify-center lg:justify-end animate-fade-up animation-delay-200">
            <div className="relative">
              {/* Phone */}
              <div className="relative bg-card border border-white/[0.07] rounded-[2.5rem] p-3 w-[220px] shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
                {/* Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/10 rounded-full" />
                <div
                  className="bg-off-black rounded-[2rem] overflow-hidden"
                  style={{ aspectRatio: "9/16" }}
                >
                  {/* Video content */}
                  <div className="relative w-full h-full flex flex-col">
                    <div
                      className="flex-1 flex items-center justify-center relative"
                      style={{
                        background:
                          "linear-gradient(160deg, #1a1a2e, #16213e, #0f3460)",
                      }}
                    >
                      {/* Play button */}
                      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play
                          size={18}
                          fill="white"
                          className="ml-1 text-white"
                        />
                      </div>

                      {/* Animated captions */}
                      <div className="absolute bottom-3 left-2 right-2 text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {words.map((word, i) => {
                            const isHighlight =
                              word === word.toUpperCase() && word.length > 1;
                            return (
                              <span
                                key={i}
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded transition-all duration-300 ${
                                  isHighlight
                                    ? "bg-accent2/90 text-black"
                                    : "bg-white/80 text-black/80"
                                }`}
                                style={{ fontFamily: "Syne, sans-serif" }}
                              >
                                {word}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Viral score tag */}
                      <div className="absolute top-3 right-2 bg-black/50 backdrop-blur-sm rounded-md px-1.5 py-1 border border-white/10">
                        <div className="flex items-center gap-1">
                          <Zap size={8} className="text-yellow-400" />
                          <span className="text-[8px] font-bold text-white">
                            VIRAL
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Waveform footer */}
                    <div className="bg-off-black px-3 py-2 flex items-center gap-2">
                      <div className="flex items-end gap-[2px] flex-1">
                        {[12, 18, 8, 16, 10, 20, 7, 14, 11, 17, 9, 15].map(
                          (h, i) => (
                            <div
                              key={i}
                              className="wave-bar"
                              style={{
                                height: `${h}px`,
                                animationDelay: `${i * 80}ms`,
                              }}
                            />
                          ),
                        )}
                      </div>
                      <span className="text-[8px] font-display font-bold text-white/40">
                        AI Voice
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -right-16 top-[15%] bg-card border border-white/[0.07] rounded-xl px-3 py-2.5 animate-float shadow-card">
                <p className="text-[9px] text-white/40 mb-1">Viral score</p>
                <p className="font-display font-bold text-base text-accent2">
                  {viralScore}%
                </p>
                <div className="h-1 bg-white/10 rounded-full mt-1.5 w-20">
                  <div
                    className="h-full bg-accent2 rounded-full"
                    style={{ width: `${viralScore}%` }}
                  />
                </div>
              </div>

              <div className="absolute -left-24 bottom-[20%] bg-card border border-white/[0.07] rounded-xl px-3 py-2.5 animate-float-delayed shadow-card">
                <p className="text-[9px] text-white/40 mb-0.5">
                  Clips generated
                </p>
                <p className="font-display font-bold text-base text-violet-300">
                  12 clips
                </p>
                <div className="flex gap-0.5 mt-1.5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-2 h-3 rounded-sm bg-accent/40" />
                  ))}
                </div>
              </div>

              {/* Processing badge */}
              <div className="absolute -left-8 top-[8%] bg-off-black border border-white/[0.07] rounded-lg px-2.5 py-1.5 flex items-center gap-2 animate-float animation-delay-300">
                <div className="w-1.5 h-1.5 rounded-full bg-accent2 animate-pulse" />
                <span className="text-[9px] text-white/60 font-medium">
                  AI processing…
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #080810)",
        }}
      />
    </section>
  );
}
