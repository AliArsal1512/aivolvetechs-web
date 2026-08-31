import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, ArrowUpRight, ShieldCheck, Mail, MapPin, AlertCircle } from 'lucide-react';
import { services } from '../data';

interface ContactFormProps {
  preselectedService?: string | null;
  onClearPreselectedService?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ preselectedService = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    market: 'UAE / GCC',
    service: '',
    budget: '$5k - $15k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to transmit inquiry.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : 'Network error occurred. Please try again.';
      setErrorMessage(errText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative bg-transparent overflow-hidden">
      {/* Single Gradient Ball from bottom corner of the screen */}
      <div 
        className="absolute -bottom-20 -left-16 sm:-bottom-28 sm:-left-24 w-[480px] sm:w-[640px] lg:w-[760px] h-[480px] sm:h-[640px] lg:h-[760px] pointer-events-none rounded-full blur-2xl sm:blur-3xl"
        style={{
          background: 'radial-gradient(circle at 25% 75%, rgba(254,240,138,0.38) 0%, rgba(234,179,8,0.22) 28%, rgba(212,175,55,0.08) 55%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Minimalist Section Header */}
        <div className="flex items-center justify-between mb-16 pb-6 border-b border-slate-800">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold font-poppins">
            07 / Initiate Collaboration
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold font-poppins">
            Direct Line
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Editorial */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Ready to <span className="text-gold-gradient">Aivolve</span> your brand?
            </h2>

            <p className="text-slate-300 text-base font-light leading-relaxed">
              Tell us about your upcoming software initiative, AI integration, or advertising campaign. Every transmission is dispatched directly to our principal engineering leads at <strong className="text-[#fde68a] font-medium">support@aivolvetechs.com</strong>.
            </p>

            <div className="space-y-4 pt-6 border-t border-slate-800/80">
              <div className="p-4 bg-[#0d0d14]/70 border border-[#d4af37]/20 backdrop-blur-md flex items-start gap-4 hover:border-[#d4af37]/45 transition-colors">
                <div className="w-8 h-8 bg-[#161624] border border-[#d4af37]/25 flex items-center justify-center text-[#d4af37] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.15)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-poppins block font-semibold">Headquarters &amp; Hub</span>
                  <p className="text-xs text-slate-200 font-medium">Dubai / UAE · Serving all GCC &amp; Global Markets</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0d0d14]/70 border border-[#d4af37]/20 backdrop-blur-md flex items-start gap-4 hover:border-[#d4af37]/45 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#161624] border border-[#d4af37]/25 flex items-center justify-center text-[#d4af37] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.15)]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-poppins block font-semibold">Direct Inquiries Mail</span>
                  <a 
                    href="mailto:support@aivolvetechs.com" 
                    className="text-xs text-[#fde68a] hover:underline font-medium"
                  >
                    support@aivolvetechs.com
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0d0d14]/70 border border-[#d4af37]/20 backdrop-blur-md flex items-start gap-4 hover:border-[#d4af37]/45 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#161624] border border-[#d4af37]/25 flex items-center justify-center text-[#d4af37] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.15)]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-poppins block font-semibold">Client Confidentiality</span>
                  <p className="text-xs text-slate-400 font-light">Mutual NDAs provided prior to technical discovery.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Contact Form with Translucent Glass */}
          <div className="lg:col-span-7 rounded-xl bg-[#0d0d14]/75 border border-[#d4af37]/30 backdrop-blur-xl p-8 sm:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.7)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#d4af37]/15 to-transparent pointer-events-none" />

            {submitted ? (
              <div id="contact-success-message" className="py-16 text-center space-y-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-xl bg-[#161624] border border-[#d4af37] text-[#d4af37] mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-poppins text-2xl font-bold text-white">
                  Transmission Received.
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                  Thank you for reaching out to Aivolve Techs. Your project specifications have been dispatched to <strong className="text-[#fde68a]">support@aivolvetechs.com</strong>. Our principal architects will review and connect with you within 24 hours.
                </p>
                <button
                  id="reset-form-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      market: 'UAE / GCC',
                      service: '',
                      budget: '$5k - $15k',
                      message: '',
                    });
                  }}
                  className="gold-btn-secondary cursor-pointer mt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form id="agency-contact-form" onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-semibold font-poppins block">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Tariq Al-Mansoor"
                      className="w-full rounded-lg bg-[#12121c]/80 border border-slate-700/80 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-semibold font-poppins block">
                      Work Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. tariq@company.com"
                      className="w-full rounded-lg bg-[#12121c]/80 border border-slate-700/80 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company */}
                  <div className="space-y-2">
                    <label htmlFor="contact-company" className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-semibold font-poppins block">
                      Company / Organization
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Horizon Holdings LLC"
                      className="w-full rounded-lg bg-[#12121c]/80 border border-slate-700/80 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Target Market */}
                  <div className="space-y-2">
                    <label htmlFor="contact-market" className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-semibold font-poppins block">
                      Primary Target Region
                    </label>
                    <select
                      id="contact-market"
                      name="market"
                      value={formData.market}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-[#12121c]/80 border border-slate-700/80 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] px-4 py-3 text-xs text-white focus:outline-none transition-colors"
                    >
                      <option value="UAE / GCC">UAE / GCC (United Arab Emirates, Saudi, Qatar)</option>
                      <option value="Canada / North America">Canada / North America</option>
                      <option value="International / Global">International / Multi-Region</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Interest */}
                  <div className="space-y-2">
                    <label htmlFor="contact-service" className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-semibold font-poppins block">
                      Core Discipline Needed
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-[#12121c]/80 border border-slate-700/80 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] px-4 py-3 text-xs text-white focus:outline-none transition-colors"
                    >
                      <option value="">Select a Discipline...</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Full Retainer / Multi-Discipline">Full Agency Retainer (Engineering + AI + Ads)</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label htmlFor="contact-budget" className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-semibold font-poppins block">
                      Estimated Project Budget
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-[#12121c]/80 border border-slate-700/80 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] px-4 py-3 text-xs text-white focus:outline-none transition-colors"
                    >
                      <option value="Under $5k">Under $5k (Sprint / Advisory)</option>
                      <option value="$5k - $15k">$5,000 – $15,000 (Standard MVP / Campaign)</option>
                      <option value="$15k - $50k">$15,000 – $50,000 (Scale &amp; Enterprise)</option>
                      <option value="$50k+">$50,000+ (Comprehensive Custom Ecosystem)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-semibold font-poppins block">
                    Project Brief &amp; Scope *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your objectives, key deliverables, technical requirements, or launch timelines..."
                    className="w-full rounded-lg bg-[#12121c]/80 border border-slate-700/80 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    disabled={loading}
                    className="gold-btn-primary w-full py-3.5 flex items-center justify-center gap-2 cursor-pointer group disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 border-2 border-[#08080a] border-t-transparent rounded-full animate-spin" />
                        Transmitting Specifications...
                      </span>
                    ) : (
                      <>
                        <span>Submit Project Specifications</span>
                        <Send className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-3 font-light font-poppins">
                    Direct delivery to <span className="text-[#d4af37]">support@aivolvetechs.com</span> with SLA response &lt; 24h.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
