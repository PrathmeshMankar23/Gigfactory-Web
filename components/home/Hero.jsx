'use client'

import { useState, useEffect, useRef } from 'react'

// --- REUSABLE ARRIVAL ANIMATION WRAPPER ---
const AnimatedSection = ({ children, animationClass, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.unobserve(domRef.current)
        }
      },
      { threshold: 0.1 }
    )

    if (domRef.current) observer.observe(domRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : animationClass
        } ${className}`}
    >
      {children}
    </div>
  )
}

export default function Hero({ onContactClick }) {
  const [currentImg, setCurrentImg] = useState(0)

  // Array of 6 background images
  const images = [
    "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "https://images.unsplash.com/photo-1531834304451-492bb14d484b?q=80&w=2070",
    "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2070"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length)
    }, 5000) // Changes every 5 seconds
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden py-20 md:py-32 bg-zinc-950 text-white">

      {/* --- CUSTOM CSS FOR ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -50px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-blob { animation: blob 10s infinite alternate ease-in-out; }
        .animate-blink { animation: blink 2s infinite ease-in-out; }
      `}} />

      {/* --- BACKGROUND IMAGE SLIDESHOW --- */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${img})`,
              opacity: currentImg === index ? 0.2 : 0
            }}
          />
        ))}
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/40 to-zinc-950/90" />
      </div>

      {/* --- TECH GRID & GLOW LAYER --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full opacity-20 blur-[120px]">
          <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-[#6EDD4D] rounded-full mix-blend-screen filter animate-blob"></div>
          <div className="absolute bottom-[10%] left-[40%] w-72 h-72 bg-[#22c55e] rounded-full mix-blend-screen filter animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* --- FOREGROUND CONTENT --- */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">

        {/* Blinking Badge (The line above heading) */}
        <AnimatedSection animationClass="opacity-0 translate-y-4" delay={0}>
          <div className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6EDD4D]/30 bg-[#6EDD4D]/10 text-[#6EDD4D] text-xs font-bold tracking-widest uppercase animate-blink">
            <span className="w-2 h-2 rounded-full bg-[#6EDD4D] shadow-[0_0_8px_#6EDD4D]" />
            Leading Construction Tech
          </div>
        </AnimatedSection>

        {/* Heading with colored text */}
        <AnimatedSection animationClass="opacity-0 translate-y-12" delay={200}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight max-w-5xl drop-shadow-2xl">
            Global Capacity Center <br className="hidden md:block" />
            <span className="text-[#6EDD4D]">for Construction Services</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection animationClass="opacity-0 translate-y-12" delay={400}>
          <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Technology-enabled platform for integrated BIM planning, designing & engineering. Project reference across 10+ Million Sqft.
          </p>
        </AnimatedSection>

        <AnimatedSection animationClass="opacity-0 scale-50" delay={600}>
          <div className="flex justify-center">
            <button
              onClick={onContactClick}
              className="bg-[#6EDD4D] text-black font-black px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:bg-[#5bc43f] shadow-[0_0_40px_rgba(110,221,77,0.4)] flex items-center gap-3"
            >
              Let&apos;s Connect <span className="text-2xl leading-none">→</span>
            </button>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}