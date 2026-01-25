'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string[];
  budgetRange: string;
  message: string;
}

const projectTypes = [
  'Full-Stack Development',
  'Frontend Development',
  'Backend Development',
  'GenAI Integration',
  'API Development',
  'Consulting',
];

const budgetRanges = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
  'Not Sure',
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: [],
    budgetRange: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: [],
          budgetRange: '',
          message: '',
        });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleProjectType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      projectType: prev.projectType.includes(type)
        ? prev.projectType.filter((t) => t !== type)
        : [...prev.projectType, type],
    }));
  };

  return (
    <div className="bg-[#0a0d37] border border-[#1b2c68a0] rounded-xl p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 bg-[#1b2c68a0] border ${
              errors.name ? 'border-red-500' : 'border-[#1b2c68a0]'
            } rounded-lg text-white placeholder-gray-500 focus:border-[#16f2b3] focus:outline-none transition-colors`}
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 bg-[#1b2c68a0] border ${
                errors.email ? 'border-red-500' : 'border-[#1b2c68a0]'
              } rounded-lg text-white placeholder-gray-500 focus:border-[#16f2b3] focus:outline-none transition-colors`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-[#1b2c68a0] border border-[#1b2c68a0] rounded-lg text-white placeholder-gray-500 focus:border-[#16f2b3] focus:outline-none transition-colors"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        {/* Project Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Project Type (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {projectTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => toggleProjectType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  formData.projectType.includes(type)
                    ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white'
                    : 'bg-[#1b2c68a0] text-gray-300 hover:bg-[#1b2c68]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
            Budget Range
          </label>
          <select
            id="budget"
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            className="w-full px-4 py-3 bg-[#1b2c68a0] border border-[#1b2c68a0] rounded-lg text-white focus:border-[#16f2b3] focus:outline-none transition-colors"
          >
            <option value="">Select a budget range</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Project Details *
          </label>
          <textarea
            id="message"
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`w-full px-4 py-3 bg-[#1b2c68a0] border ${
              errors.message ? 'border-red-500' : 'border-[#1b2c68a0]'
            } rounded-lg text-white placeholder-gray-500 focus:border-[#16f2b3] focus:outline-none transition-colors resize-none`}
            placeholder="Tell me about your project..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
          <p className="mt-1 text-xs text-gray-500">{formData.message.length}/500 characters</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
