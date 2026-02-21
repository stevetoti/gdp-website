'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getSupabase, GDP_SITE_ID } from '@/lib/supabase';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Loader2, 
  Globe, 
  Smartphone, 
  Bot, 
  Megaphone, 
  Rocket,
  Monitor
} from 'lucide-react';

type ProjectType = 'website' | 'webapp' | 'mobile' | 'ai' | 'social' | 'full-package' | '';

interface FormData {
  // Step 1: Project Type
  projectType: ProjectType;
  projectDescription: string;
  
  // Step 2: Website/App Details
  numberOfPages: string;
  needsEcommerce: boolean;
  needsCMS: boolean;
  needsBlog: boolean;
  designStyle: string;
  hasExistingSite: boolean;
  existingSiteUrl: string;
  
  // Step 3: AI & Automation
  needsChatbot: boolean;
  needsAIAssistant: boolean;
  needsProcessAutomation: boolean;
  needsCRM: boolean;
  aiFeatureDescription: string;
  
  // Step 4: Social Media
  socialPlatforms: string[];
  needsContentCreation: boolean;
  needsPaidAds: boolean;
  currentFollowers: string;
  
  // Step 5: Budget & Timeline
  budgetRange: string;
  timeline: string;
  urgency: string;
  
  // Step 6: Contact
  name: string;
  email: string;
  phone: string;
  company: string;
  preferredContact: string;
  bestTimeToCall: string;
  additionalNotes: string;
}

const initialFormData: FormData = {
  projectType: '',
  projectDescription: '',
  numberOfPages: '',
  needsEcommerce: false,
  needsCMS: false,
  needsBlog: false,
  designStyle: '',
  hasExistingSite: false,
  existingSiteUrl: '',
  needsChatbot: false,
  needsAIAssistant: false,
  needsProcessAutomation: false,
  needsCRM: false,
  aiFeatureDescription: '',
  socialPlatforms: [],
  needsContentCreation: false,
  needsPaidAds: false,
  currentFollowers: '',
  budgetRange: '',
  timeline: '',
  urgency: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  preferredContact: '',
  bestTimeToCall: '',
  additionalNotes: '',
};

const projectTypes = [
  { value: 'website', label: 'Website', icon: Globe, description: 'Business website, portfolio, or landing pages' },
  { value: 'webapp', label: 'Web Application', icon: Monitor, description: 'Custom web app with user accounts, dashboards' },
  { value: 'mobile', label: 'Mobile App', icon: Smartphone, description: 'iOS and/or Android mobile application' },
  { value: 'ai', label: 'AI Automation', icon: Bot, description: 'Chatbots, AI assistants, process automation' },
  { value: 'social', label: 'Social Media', icon: Megaphone, description: 'Social media management and marketing' },
  { value: 'full-package', label: 'Full Digital Package', icon: Rocket, description: 'Complete digital transformation solution' },
];

const designStyles = [
  { value: 'modern', label: 'Modern & Minimalist' },
  { value: 'corporate', label: 'Professional & Corporate' },
  { value: 'creative', label: 'Creative & Bold' },
  { value: 'traditional', label: 'Traditional & Classic' },
  { value: 'unsure', label: 'Not sure - need guidance' },
];

const budgetRanges = [
  { value: '1000-3000', label: '$1,000 - $3,000' },
  { value: '3000-5000', label: '$3,000 - $5,000' },
  { value: '5000-10000', label: '$5,000 - $10,000' },
  { value: '10000-20000', label: '$10,000 - $20,000' },
  { value: '20000+', label: '$20,000+' },
  { value: 'unsure', label: 'Not sure - need quote' },
];

const timelines = [
  { value: 'asap', label: 'ASAP (Rush project)' },
  { value: '1-2weeks', label: '1-2 weeks' },
  { value: '1month', label: '1 month' },
  { value: '2-3months', label: '2-3 months' },
  { value: '3months+', label: '3+ months' },
  { value: 'flexible', label: 'Flexible' },
];

const socialPlatformOptions = [
  'Facebook', 'Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'YouTube'
];

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const updateForm = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const toggleSocialPlatform = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      socialPlatforms: prev.socialPlatforms.includes(platform)
        ? prev.socialPlatforms.filter(p => p !== platform)
        : [...prev.socialPlatforms, platform]
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.projectType !== '';
      case 2: return true;
      case 3: return true;
      case 4: return true;
      case 5: return formData.budgetRange !== '' && formData.timeline !== '';
      case 6: return formData.name !== '' && formData.email !== '';
      default: return true;
    }
  };

  const generateProjectSummary = (data: FormData): string => {
    const typeLabel = projectTypes.find(t => t.value === data.projectType)?.label || data.projectType;
    let summary = `## Project Summary\n\n`;
    summary += `**Project Type:** ${typeLabel}\n`;
    summary += `**Client:** ${data.name} (${data.company || 'Individual'})\n`;
    summary += `**Budget:** ${budgetRanges.find(b => b.value === data.budgetRange)?.label || data.budgetRange}\n`;
    summary += `**Timeline:** ${timelines.find(t => t.value === data.timeline)?.label || data.timeline}\n\n`;

    if (data.projectDescription) {
      summary += `**Description:** ${data.projectDescription}\n\n`;
    }

    summary += `### Requirements\n`;
    if (['website', 'webapp', 'full-package'].includes(data.projectType)) {
      summary += `- Pages: ${data.numberOfPages || 'TBD'}\n`;
      if (data.needsEcommerce) summary += `- E-commerce: Yes\n`;
      if (data.needsCMS) summary += `- CMS: Yes\n`;
      if (data.needsBlog) summary += `- Blog: Yes\n`;
      if (data.designStyle) summary += `- Design: ${data.designStyle}\n`;
    }

    if (data.needsChatbot || data.needsAIAssistant || data.needsProcessAutomation || data.needsCRM) {
      summary += `\n### AI & Automation\n`;
      if (data.needsChatbot) summary += `- Chatbot\n`;
      if (data.needsAIAssistant) summary += `- AI Assistant\n`;
      if (data.needsProcessAutomation) summary += `- Process Automation\n`;
      if (data.needsCRM) summary += `- CRM Integration\n`;
      if (data.aiFeatureDescription) summary += `- Notes: ${data.aiFeatureDescription}\n`;
    }

    if (data.socialPlatforms.length > 0) {
      summary += `\n### Social Media\n`;
      summary += `- Platforms: ${data.socialPlatforms.join(', ')}\n`;
      if (data.needsContentCreation) summary += `- Content Creation: Yes\n`;
      if (data.needsPaidAds) summary += `- Paid Ads: Yes\n`;
    }

    summary += `\n### Contact\n`;
    summary += `- Email: ${data.email}\n`;
    if (data.phone) summary += `- Phone: ${data.phone}\n`;
    if (data.preferredContact) summary += `- Preferred: ${data.preferredContact}\n`;
    if (data.bestTimeToCall) summary += `- Best time: ${data.bestTimeToCall}\n`;

    if (data.additionalNotes) {
      summary += `\n### Additional Notes\n${data.additionalNotes}\n`;
    }

    return summary;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const summary = generateProjectSummary(formData);

      // Save to Supabase with GDP site_id
      try {
        const supabase = getSupabase();
        const { error: dbError } = await supabase
          .from('project_submissions')
          .insert({
          site_id: GDP_SITE_ID,
          project_type: formData.projectType,
          project_description: formData.projectDescription,
          website_details: {
            pages: formData.numberOfPages,
            ecommerce: formData.needsEcommerce,
            cms: formData.needsCMS,
            blog: formData.needsBlog,
            design: formData.designStyle,
            existingSite: formData.hasExistingSite,
            existingUrl: formData.existingSiteUrl,
          },
          ai_automation: {
            chatbot: formData.needsChatbot,
            aiAssistant: formData.needsAIAssistant,
            processAutomation: formData.needsProcessAutomation,
            crm: formData.needsCRM,
            description: formData.aiFeatureDescription,
          },
          social_media: {
            platforms: formData.socialPlatforms,
            contentCreation: formData.needsContentCreation,
            paidAds: formData.needsPaidAds,
            followers: formData.currentFollowers,
          },
          budget_range: formData.budgetRange,
          timeline: formData.timeline,
          urgency: formData.urgency,
          contact_name: formData.name,
          contact_email: formData.email,
          contact_phone: formData.phone,
          company_name: formData.company,
          preferred_contact: formData.preferredContact,
          best_time_to_call: formData.bestTimeToCall,
          additional_notes: formData.additionalNotes,
          ai_summary: summary,
          status: 'new',
        });

        if (dbError) {
          console.error('Database error:', dbError);
        }
      } catch (supabaseErr) {
        console.error('Supabase not configured or error:', supabaseErr);
        // Continue anyway - form submission should still work for notification
      }

      // Send notification
      try {
        await fetch('/api/notify-submission', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contact_name: formData.name,
            contact_email: formData.email,
            contact_phone: formData.phone,
            company_name: formData.company,
            project_type: formData.projectType,
            budget_range: formData.budgetRange,
            timeline: formData.timeline,
            project_description: formData.projectDescription,
          }),
        });
      } catch (notifyErr) {
        console.error('Notification error:', notifyErr);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-deep-blue mb-4">Thank You, {formData.name}!</h1>
          <p className="text-gray-600 mb-6">
            We&apos;ve received your project details. Our team will review your requirements and get back to you within 24 hours.
          </p>
          <div className="bg-light-blue rounded-xl p-4 mb-8 text-left">
            <p className="text-sm text-deep-blue">
              <strong>What happens next?</strong><br />
              1. We&apos;ll review your project requirements<br />
              2. Prepare a custom proposal<br />
              3. Schedule a discovery call with you
            </p>
          </div>
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-blue via-white to-soft-gray py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Global Digital Prime"
              width={180}
              height={50}
              className="mx-auto mb-4"
            />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-deep-blue mb-2">Start Your Project</h1>
          <p className="text-gray-600">Tell us about your project and we&apos;ll create a custom growth strategy</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-vibrant-orange to-orange-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {/* Step indicators */}
          <div className="flex justify-between mt-3">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  s <= step
                    ? 'bg-vibrant-orange text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600"
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Project Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-deep-blue mb-2">What type of project do you need?</h2>
                <p className="text-gray-500 mb-6">Select the option that best describes your project</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {projectTypes.map((type) => (
                    <motion.button
                      key={type.value}
                      onClick={() => updateForm({ projectType: type.value as ProjectType })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        formData.projectType === type.value
                          ? 'border-vibrant-orange bg-orange-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                        formData.projectType === type.value
                          ? 'bg-vibrant-orange text-white'
                          : 'bg-light-blue text-deep-blue'
                      }`}>
                        <type.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-deep-blue">{type.label}</h3>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </motion.button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brief project description (optional)
                  </label>
                  <textarea
                    value={formData.projectDescription}
                    onChange={(e) => updateForm({ projectDescription: e.target.value })}
                    placeholder="Tell us a bit about what you're looking to build..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Website/App Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-deep-blue mb-2">Website & App Details</h2>
                <p className="text-gray-500 mb-6">Help us understand your technical requirements</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated number of pages
                    </label>
                    <select
                      value={formData.numberOfPages}
                      onChange={(e) => updateForm({ numberOfPages: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                    >
                      <option value="">Select...</option>
                      <option value="1-5">1-5 pages (Simple)</option>
                      <option value="5-10">5-10 pages (Standard)</option>
                      <option value="10-20">10-20 pages (Medium)</option>
                      <option value="20+">20+ pages (Large)</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What features do you need?
                    </label>
                    <div className="space-y-3">
                      {[
                        { key: 'needsEcommerce', label: 'E-commerce / Online Store', icon: '🛒' },
                        { key: 'needsCMS', label: 'Content Management System', icon: '📝' },
                        { key: 'needsBlog', label: 'Blog Section', icon: '📰' },
                      ].map((feature) => (
                        <label key={feature.key} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-soft-gray transition-colors">
                          <input
                            type="checkbox"
                            checked={formData[feature.key as keyof FormData] as boolean}
                            onChange={(e) => updateForm({ [feature.key]: e.target.checked })}
                            className="w-5 h-5 rounded text-vibrant-orange focus:ring-vibrant-orange"
                          />
                          <span className="text-xl">{feature.icon}</span>
                          <span className="text-gray-700">{feature.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred design style
                    </label>
                    <select
                      value={formData.designStyle}
                      onChange={(e) => updateForm({ designStyle: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                    >
                      <option value="">Select...</option>
                      {designStyles.map((style) => (
                        <option key={style.value} value={style.value}>{style.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-soft-gray transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.hasExistingSite}
                        onChange={(e) => updateForm({ hasExistingSite: e.target.checked })}
                        className="w-5 h-5 rounded text-vibrant-orange focus:ring-vibrant-orange"
                      />
                      <span className="text-gray-700">I have an existing website</span>
                    </label>
                    {formData.hasExistingSite && (
                      <motion.input
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        type="url"
                        value={formData.existingSiteUrl}
                        onChange={(e) => updateForm({ existingSiteUrl: e.target.value })}
                        placeholder="https://your-current-site.com"
                        className="mt-3 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: AI & Automation */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-deep-blue mb-2">AI & Automation</h2>
                <p className="text-gray-500 mb-6">Supercharge your business with intelligent automation</p>

                <div className="space-y-4 mb-6">
                  {[
                    { key: 'needsChatbot', label: 'AI Chatbot', desc: 'Automated customer support and FAQ', icon: '💬' },
                    { key: 'needsAIAssistant', label: 'AI Business Assistant', desc: 'Smart assistant for your team', icon: '🤖' },
                    { key: 'needsProcessAutomation', label: 'Business Process Automation', desc: 'Automate repetitive tasks', icon: '⚡' },
                    { key: 'needsCRM', label: 'CRM Integration', desc: 'Connect with your customer data', icon: '📊' },
                  ].map((feature) => (
                    <label key={feature.key} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-soft-gray transition-colors">
                      <input
                        type="checkbox"
                        checked={formData[feature.key as keyof FormData] as boolean}
                        onChange={(e) => updateForm({ [feature.key]: e.target.checked })}
                        className="w-5 h-5 mt-1 rounded text-vibrant-orange focus:ring-vibrant-orange"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{feature.icon}</span>
                          <span className="font-medium text-deep-blue">{feature.label}</span>
                        </div>
                        <p className="text-sm text-gray-500">{feature.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your automation needs (optional)
                  </label>
                  <textarea
                    value={formData.aiFeatureDescription}
                    onChange={(e) => updateForm({ aiFeatureDescription: e.target.value })}
                    placeholder="Tell us about specific processes you'd like to automate..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Social Media */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-deep-blue mb-2">Social Media</h2>
                <p className="text-gray-500 mb-6">Let us help grow your online presence</p>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Which platforms do you need help with?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {socialPlatformOptions.map((platform) => (
                      <motion.button
                        key={platform}
                        onClick={() => toggleSocialPlatform(platform)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full border-2 font-medium transition-all ${
                          formData.socialPlatforms.includes(platform)
                            ? 'border-vibrant-orange bg-orange-50 text-vibrant-orange'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {platform}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-soft-gray transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.needsContentCreation}
                      onChange={(e) => updateForm({ needsContentCreation: e.target.checked })}
                      className="w-5 h-5 rounded text-vibrant-orange focus:ring-vibrant-orange"
                    />
                    <div>
                      <span className="text-gray-700 font-medium">Content Creation</span>
                      <p className="text-sm text-gray-500">Graphics, videos, posts, and captions</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-soft-gray transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.needsPaidAds}
                      onChange={(e) => updateForm({ needsPaidAds: e.target.checked })}
                      className="w-5 h-5 rounded text-vibrant-orange focus:ring-vibrant-orange"
                    />
                    <div>
                      <span className="text-gray-700 font-medium">Paid Advertising</span>
                      <p className="text-sm text-gray-500">Facebook Ads, Google Ads, etc.</p>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current social media following (optional)
                  </label>
                  <select
                    value={formData.currentFollowers}
                    onChange={(e) => updateForm({ currentFollowers: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="0-100">0-100 followers</option>
                    <option value="100-1000">100-1,000 followers</option>
                    <option value="1000-10000">1,000-10,000 followers</option>
                    <option value="10000+">10,000+ followers</option>
                    <option value="starting">Just getting started</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 5: Budget & Timeline */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-deep-blue mb-2">Budget & Timeline</h2>
                <p className="text-gray-500 mb-6">Help us tailor a solution that fits your needs</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Budget Range *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {budgetRanges.map((budget) => (
                        <motion.button
                          key={budget.value}
                          onClick={() => updateForm({ budgetRange: budget.value })}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                            formData.budgetRange === budget.value
                              ? 'border-vibrant-orange bg-orange-50 text-vibrant-orange shadow'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {budget.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Desired Timeline *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {timelines.map((timeline) => (
                        <motion.button
                          key={timeline.value}
                          onClick={() => updateForm({ timeline: timeline.value })}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                            formData.timeline === timeline.value
                              ? 'border-vibrant-orange bg-orange-50 text-vibrant-orange shadow'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {timeline.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => updateForm({ urgency: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                    >
                      <option value="">Select...</option>
                      <option value="critical">🔴 Critical - Need it yesterday</option>
                      <option value="high">🟠 High - Important deadline</option>
                      <option value="normal">🟡 Normal - Standard timeline</option>
                      <option value="low">🟢 Low - Flexible, no rush</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 6: Contact Information */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-deep-blue mb-2">Contact Information</h2>
                <p className="text-gray-500 mb-6">How can we reach you?</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => updateForm({ company: e.target.value })}
                        placeholder="Your Company Inc"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateForm({ email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateForm({ phone: e.target.value })}
                      placeholder="+1 234 567 890"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <select
                        value={formData.preferredContact}
                        onChange={(e) => updateForm({ preferredContact: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                      >
                        <option value="">Select...</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone Call</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="video">Video Call</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Best Time to Contact
                      </label>
                      <select
                        value={formData.bestTimeToCall}
                        onChange={(e) => updateForm({ bestTimeToCall: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                      >
                        <option value="">Select...</option>
                        <option value="morning">Morning (8am - 12pm EST)</option>
                        <option value="afternoon">Afternoon (12pm - 5pm EST)</option>
                        <option value="evening">Evening (5pm - 8pm EST)</option>
                        <option value="anytime">Anytime</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Anything else we should know?
                    </label>
                    <textarea
                      value={formData.additionalNotes}
                      onChange={(e) => updateForm({ additionalNotes: e.target.value })}
                      placeholder="Special requirements, questions, or additional context..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setStep(s => s - 1)}
              disabled={step === 1}
              className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                step === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {step < totalSteps ? (
              <motion.button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                className={`px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 ${
                  canProceed()
                    ? 'bg-vibrant-orange text-white hover:bg-orange-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                whileHover={{ scale: canProceed() && !isSubmitting ? 1.02 : 1 }}
                whileTap={{ scale: canProceed() && !isSubmitting ? 0.98 : 1 }}
                className={`px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 ${
                  canProceed() && !isSubmitting
                    ? 'bg-vibrant-orange text-white hover:bg-orange-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Project
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-4">Trusted by 2000+ businesses worldwide</p>
          <div className="flex justify-center gap-6 text-gray-400 text-sm">
            <span className="flex items-center gap-1">🔒 Secure</span>
            <span className="flex items-center gap-1">⚡ 24h Response</span>
            <span className="flex items-center gap-1">💯 No Obligation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
