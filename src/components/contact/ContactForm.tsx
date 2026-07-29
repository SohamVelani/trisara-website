'use client';

import { useState, FormEvent } from 'react';

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear errors on any input change
    if (fieldErrors.length > 0) setFieldErrors([]);
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setFieldErrors([]);
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        setStatus('success');
        setServerMessage(data.message);
        setForm({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
        setServerMessage(data.message || 'Something went wrong. Please try again.');
        if (data.errors && data.errors.length > 0) {
          setFieldErrors(data.errors);
        }
      }
    } catch {
      setStatus('error');
      setServerMessage('Network error. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-6 rounded-2xl bg-trisara-teal-50 border border-trisara-teal-200">
        <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center mb-5 shadow-brand">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-trisara-dark mb-2">Message Received!</h3>
        <p className="text-gray-600 text-sm leading-relaxed max-w-sm">{serverMessage}</p>
        <button
          onClick={() => { setStatus('idle'); setServerMessage(''); }}
          className="mt-6 btn-secondary text-sm py-2 px-5"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const inputClass = `
    w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm
    placeholder:text-gray-400
    focus:outline-none focus:ring-2 focus:ring-trisara-teal-400 focus:border-transparent
    hover:border-trisara-blue-300
    transition-all duration-200
  `;

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      {/* Error banner */}
      {status === 'error' && (
        <div
          role="alert"
          className="flex gap-3 items-start p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
        >
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-medium">{serverMessage}</p>
            {fieldErrors.length > 0 && (
              <ul className="mt-1 space-y-0.5 list-disc list-inside text-red-600">
                {fieldErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          required
          maxLength={100}
          autoComplete="name"
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="jane@company.com"
          required
          maxLength={254}
          autoComplete="email"
          className={inputClass}
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="contact-company" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Company Name <span className="text-gray-400 font-normal text-xs">(optional)</span>
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          placeholder="Acme Corp"
          maxLength={200}
          autoComplete="organization"
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about the role you're hiring for, or how we can help..."
          required
          maxLength={2000}
          rows={5}
          className={`${inputClass} resize-none`}
        />
        <p className="mt-1 text-xs text-gray-400 text-right">
          {form.message.length}/2000
        </p>
      </div>

      {/* Submit */}
      <button
        id="contact-submit"
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center text-sm py-3.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {status === 'loading' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
