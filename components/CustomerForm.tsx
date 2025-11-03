"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { customerFormSchema, projectTypeOptions, type CustomerFormData } from "@/lib/validation";
import { Mail, Send, Loader2, CheckCircle, AlertCircle, Building, Briefcase } from "lucide-react";

export default function CustomerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    trigger,
    watch
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerFormSchema),
    mode: 'onBlur'
  });

  const projectType = watch('projectType');

  const onSubmit = async (data: CustomerFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Failed to submit your inquiry. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldBlur = async (fieldName: keyof CustomerFormData) => {
    await trigger(fieldName);
  };

  const getProjectTypeLabel = (value: string) => {
    const labels: Record<string, string> = {
      'web_development': 'Web Development',
      'mobile_app': 'Mobile App',
      'ui_ux_design': 'UI/UX Design',
      'full_stack': 'Full Stack',
      'other': 'Other'
    };
    return labels[value] || value;
  };

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10" />

      <div className="relative space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-500/15 p-3">
              <Mail className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Send Project Inquiry</h3>
          <p className="text-gray-300 text-sm">
            Fill in your details and project requirements. We'll get back to you within 24 hours.
          </p>
        </div>

        {submitStatus === 'success' && (
          <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-green-300 font-medium">Inquiry submitted successfully!</p>
                <p className="text-green-200/80 text-sm mt-1">
                  We'll review your project details and contact you soon.
                </p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-300 font-medium">Submission failed</p>
                <p className="text-red-200/80 text-sm mt-1">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                {...register('firstName')}
                onBlur={() => handleFieldBlur('firstName')}
                className="w-full px-3 py-2.5 bg-white/[0.08] border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-colors"
                placeholder="John"
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                {...register('lastName')}
                onBlur={() => handleFieldBlur('lastName')}
                className="w-full px-3 py-2.5 bg-white/[0.08] border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-colors"
                placeholder="Doe"
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              onBlur={() => handleFieldBlur('email')}
              className="w-full px-3 py-2.5 bg-white/[0.08] border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-colors"
              placeholder="john@example.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              onBlur={() => handleFieldBlur('phone')}
              className="w-full px-3 py-2.5 bg-white/[0.08] border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-colors"
              placeholder="+1 555-123-4567"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              Company Name
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                id="company"
                {...register('company')}
                onBlur={() => handleFieldBlur('company')}
                className="w-full pl-10 pr-3 py-2.5 bg-white/[0.08] border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-colors"
                placeholder="Acme Inc. (Optional)"
                disabled={isSubmitting}
              />
            </div>
            {errors.company && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.company.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
              Project Type *
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                id="projectType"
                {...register('projectType')}
                onBlur={() => handleFieldBlur('projectType')}
                className="w-full pl-10 pr-3 py-2.5 bg-white/[0.08] border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-colors appearance-none cursor-pointer disabled:opacity-50"
                disabled={isSubmitting}
              >
                <option value="" className="bg-gray-800">
                  Select project type
                </option>
                {projectTypeOptions.map((type) => (
                  <option key={type} value={type} className="bg-gray-800">
                    {getProjectTypeLabel(type)}
                  </option>
                ))}
              </select>
            </div>
            {errors.projectType && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.projectType.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-300 mb-2">
              Project Details *
            </label>
            <textarea
              id="projectDetails"
              {...register('projectDetails')}
              onBlur={() => handleFieldBlur('projectDetails')}
              rows={4}
              className="w-full px-3 py-2.5 bg-white/[0.08] border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-colors resize-none"
              placeholder="Describe your project requirements, goals, timeline, and any specific features you need..."
              disabled={isSubmitting}
            />
            {errors.projectDetails && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.projectDetails.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 px-4 sm:px-5 py-3 sm:py-4 text-base font-medium text-white shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-500 hover:to-lime-500 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={20} />
                Send Project Inquiry
              </>
            )}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-0" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-400">
          Your data is secure and will only be used for project discussions.
        </p>
      </div>
    </div>
  );
}