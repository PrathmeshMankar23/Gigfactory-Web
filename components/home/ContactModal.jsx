'use client';

import React, { useEffect, useState } from 'react';

export default function ContactModal({ isOpen, onClose, preSelectedService }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset form state when modal is closed
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSending(false);
      }, 300);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate an API call
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">

      {/* Blurred Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content Box */}
      <div className="relative w-full max-w-2xl bg-zinc-900/90 backdrop-blur-xl border border-[#6EDD4D]/30 rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(110,221,77,0.15)] animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh] no-scrollbar">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-[#6EDD4D] hover:border-[#6EDD4D] transition-colors z-10"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        {!isSubmitted ? (
          <>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Let&apos;s Talk</h3>
            <p className="text-zinc-400 mb-8">
              {preSelectedService
                ? `Inquiring about: ${preSelectedService}`
                : 'Fill out the form below and our team will get back to you.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Name & Company (Optional) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Name <span className="text-zinc-600 font-normal normal-case ml-1">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-[#6EDD4D] focus:shadow-[0_0_15px_rgba(110,221,77,0.1)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Company <span className="text-zinc-600 font-normal normal-case ml-1">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-[#6EDD4D] focus:shadow-[0_0_15px_rgba(110,221,77,0.1)] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone (Required) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                    Email <span className="text-[#6EDD4D]">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#6EDD4D] focus:shadow-[0_0_15px_rgba(110,221,77,0.2)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                    Phone Number <span className="text-[#6EDD4D]">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#6EDD4D] focus:shadow-[0_0_15px_rgba(110,221,77,0.2)] transition-all"
                  />
                </div>
              </div>

              {/* Message (Required) */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  Message <span className="text-[#6EDD4D]">*</span>
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder="Tell us about your project requirements..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 resize-none focus:outline-none focus:border-[#6EDD4D] focus:shadow-[0_0_15px_rgba(110,221,77,0.2)] transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-[#6EDD4D] text-zinc-950 font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(110,221,77,0.4)] hover:bg-[#5bc43f] disabled:opacity-70 disabled:cursor-not-allowed transition-all uppercase tracking-widest text-sm mt-4 group"
              >
                {isSending ? (
                  <span className="flex items-center justify-center gap-2">
                    Sending... <i className="fa-solid fa-circle-notch animate-spin"></i>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message <i className="fa-solid fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                  </span>
                )}
              </button>
            </form>
          </>
        ) : (
          /* SUCCESS VIEW */
          <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-90 duration-500">
            <div className="w-24 h-24 bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 rounded-full flex items-center justify-center mb-8">
              <i className="fa-solid fa-check text-5xl text-[#6EDD4D]"></i>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Message Received!</h3>
            <p className="text-zinc-400 text-lg max-w-sm mb-10">
              Thank you for reaching out.
            </p>
            <button
              onClick={onClose}
              className="px-10 py-4 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all uppercase tracking-widest text-xs"
            >
              Back to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
}