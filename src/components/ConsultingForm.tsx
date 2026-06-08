import React, { useState } from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { TranslationSet } from '../types';
import { submitConsultation } from '../firebase';

interface ConsultingFormProps {
  langSet: TranslationSet;
}

export default function ConsultingForm({ langSet }: ConsultingFormProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [specs, setSpecs] = useState('');
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setStatus('idle');

    if (!name.trim()) {
      setValidationError('Please enter your name.');
      return;
    }
    if (!contact.trim()) {
      setValidationError('Please enter your contact or email.');
      return;
    }
    if (!specs.trim()) {
      setValidationError('Please describe your motor specs.');
      return;
    }
    if (!consent) {
      setValidationError(langSet.consulting.form.consentError);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitConsultation(name, contact, specs, consent);
      setStatus('success');
      // Reset form
      setName('');
      setContact('');
      setSpecs('');
      setConsent(false);
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consulting" className="bg-[#000000] border-t border-[#2D2F31] py-20 lg:py-28 relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[64px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Descriptive Info & Bullet list */}
          <div className="lg:col-span-6 flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] font-bold tracking-[0.1em] text-[#C4FF00] uppercase block">
                {langSet.consulting.tag}
              </span>
              <h2 className="font-sans text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold tracking-[-0.022em] text-white leading-[1.2]">
                {langSet.consulting.title}
              </h2>
              <p className="font-sans text-sm sm:text-base text-gray-400 font-normal leading-[1.65] mt-2">
                {langSet.consulting.desc}
              </p>
            </div>

            {/* Checkmark Bullets */}
            <div className="flex flex-col gap-4" id="consulting-bullets">
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-[#C4FF00]/10 border border-[#C4FF00]/40 flex items-center justify-center text-[#C4FF00] shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold">✓</span>
                </div>
                <span className="font-sans text-[14px] sm:text-base font-bold text-gray-300">
                  {langSet.consulting.bullet1}
                </span>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-[#C4FF00]/10 border border-[#C4FF00]/40 flex items-center justify-center text-[#C4FF00] shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold">✓</span>
                </div>
                <span className="font-sans text-[14px] sm:text-base font-bold text-gray-300">
                  {langSet.consulting.bullet2}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Submission Form container */}
          <div className="lg:col-span-6" id="consultation-form-container">
            <div 
              className="bg-[#1A1C1E] border border-[#2D2F31] p-8 sm:p-10 text-left relative"
              style={{ borderRadius: '0px' }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Name / Contact grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] font-bold tracking-[0.1em] text-gray-400 uppercase">
                      {langSet.consulting.form.name}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={langSet.consulting.form.namePlaceholder}
                      className="bg-transparent border-b-2 border-[#2C3E50] text-[15px] text-white focus:outline-none focus:border-[#C4FF00] py-2.5 transition-colors placeholder-gray-600 font-sans"
                      disabled={isSubmitting}
                      id="input-name"
                    />
                  </div>

                  {/* Contact field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] font-bold tracking-[0.1em] text-gray-400 uppercase">
                      {langSet.consulting.form.contact}
                    </label>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={langSet.consulting.form.contactPlaceholder}
                      className="bg-transparent border-b-2 border-[#2C3E50] text-[15px] text-white focus:outline-none focus:border-[#C4FF00] py-2.5 transition-colors placeholder-gray-600 font-sans"
                      disabled={isSubmitting}
                      id="input-contact"
                    />
                  </div>
                </div>

                {/* Specs text input field */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] font-bold tracking-[0.1em] text-gray-400 uppercase">
                    {langSet.consulting.form.specs}
                  </label>
                  <textarea
                    rows={4}
                    value={specs}
                    onChange={(e) => setSpecs(e.target.value)}
                    placeholder={langSet.consulting.form.specsPlaceholder}
                    className="bg-[#0A0B0C] border-b-2 border-[#2C3E50] text-[15px] text-white focus:outline-none focus:border-[#C4FF00] p-4.5 transition-colors placeholder-gray-600 font-sans resize-none"
                    disabled={isSubmitting}
                    id="input-specs"
                  />
                </div>

                {/* Privacy policy checkbox */}
                <div className="flex items-center gap-3 select-none py-2" id="input-consent-wrapper">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    id="input-consent"
                    className="w-4 h-4 text-[#C4FF00] border-[#2D2F31] focus:ring-0 focus:ring-offset-0 bg-transparent rounded-none outline-none appearance-none cursor-pointer border relative checked:bg-[#C4FF00] checked:after:content-['✓'] checked:after:absolute checked:after:text-black checked:after:text-[10px] checked:after:font-bold checked:after:flex checked:after:items-center checked:after:justify-center checked:after:inset-0"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="input-consent" className="font-sans text-xs text-gray-400 cursor-pointer hover:text-white transition-colors select-none">
                    {langSet.consulting.form.consent}
                  </label>
                </div>

                {/* Display System Status */}
                {validationError && (
                  <div className="flex items-start gap-2 text-rose-500 font-sans text-xs border border-rose-500/10 bg-rose-500/5 p-3" id="validation-error">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    <span>{validationError}</span>
                  </div>
                )}

                {status === 'success' && (
                  <div className="flex items-start gap-2 text-[#C4FF00] font-sans text-xs border border-[#C4FF00]/10 bg-[#C4FF00]/5 p-3" id="status-success">
                    <CheckCircle size={14} className="shrink-0 mt-0.5" />
                    <span>{langSet.consulting.form.successMsg}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-start gap-2 text-rose-500 font-sans text-xs border border-rose-500/10 bg-rose-500/5 p-3" id="status-error">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    <span>{langSet.consulting.form.errorMsg}</span>
                  </div>
                )}

                {/* Submit solid block button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#C4FF00] text-black font-sans text-xs sm:text-[13px] hover:bg-white cursor-pointer font-extrabold tracking-wider py-4.5 uppercase transition-all duration-300 text-center select-none active:scale-[0.98] ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  style={{ borderRadius: '0px' }}
                  id="btn-submit"
                >
                  {isSubmitting ? 'SUBMITTING...' : langSet.consulting.form.submitBtn}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
