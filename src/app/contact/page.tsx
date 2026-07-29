import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export const metadata: Metadata = {
  title: 'Contact Us — TRISARA',
  description:
    'Get in touch with TRISARA to discuss your hiring needs. Based in Mumbai, we help businesses hire with speed, precision, and accountability.',
};

const contactDetails = [
  {
    label: 'Email Us',
    value: 'info@trisarahrsolutions.in',
    href: 'mailto:info@trisarahrsolutions.in',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Call Us',
    value: '9820178753',
    href: 'tel:9820178753',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'Our Location',
    value: 'Mumbai, Maharashtra',
    href: null,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        id="contact-hero"
        className="relative pt-32 pb-14 lg:pt-40 lg:pb-20 overflow-hidden bg-gradient-hero"
      >
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-trisara-blue-600/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-trisara-teal-500/10 blur-3xl" />
        </div>
        <div className="section-container relative z-10 text-center">
          <AnimateOnScroll animation="reveal">
            <p className="text-xs font-semibold uppercase tracking-widest text-trisara-teal-300 mb-3">
              Contact Us
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Let&apos;s Start a{' '}
              <span className="text-gradient-light">Conversation.</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
              Whether you have an open role today or are planning ahead — we&apos;re here. Reach out and we&apos;ll get back to you promptly.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Main content */}
      <section id="contact-main" className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Form — takes 3 cols */}
            <AnimateOnScroll animation="reveal-left" className="lg:col-span-3">
              <div className="bg-trisara-light rounded-2xl p-8 border border-gray-100 shadow-card">
                <h2 className="text-xl font-bold text-trisara-dark mb-1">
                  Send Us a Message
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Fill in the details below and our team will get back to you within one business day.
                </p>
                <ContactForm />
              </div>
            </AnimateOnScroll>

            {/* Contact info — takes 2 cols */}
            <AnimateOnScroll animation="reveal-right" className="lg:col-span-2">
              <div className="space-y-6">
                {/* Intro copy */}
                <div className="p-6 rounded-2xl bg-gradient-hero text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center">
                      <span className="text-white font-bold text-xs">T</span>
                    </div>
                    <span className="font-bold tracking-widest text-sm">TRISARA</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    We&apos;re a Mumbai-based team. Expect a prompt, human response — not an automated follow-up. Your hiring challenge gets our full attention.
                  </p>
                </div>

                {/* Contact cards */}
                {contactDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex gap-4 p-5 rounded-xl bg-trisara-light border border-gray-100 hover:border-trisara-teal-200 hover:shadow-card transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-brand text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {detail.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                        {detail.label}
                      </div>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="text-sm font-medium text-trisara-dark hover:text-trisara-teal-600 transition-colors duration-200 break-all"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-trisara-dark">
                          {detail.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
