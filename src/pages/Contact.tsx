"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

interface FormData {
  name: string
  email: string
  mobile: string
  subject: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  })

  const [status, setStatus] = useState<{
    type: "success" | "error" | "loading" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });

    // Log the payload
    console.log("Payload sent to backend:", {
      name: formData.name,
      email: formData.email,
      message: `Subject: ${formData.subject}\nMobile: ${formData.mobile}\n\n${formData.message}`
    });

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error("Please fill in all required fields");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Send to backend
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Subject: ${formData.subject}\nMobile: ${formData.mobile}\n\n${formData.message}`
        })
      });

      const text = await response.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        // Not valid JSON, keep data as {}
      }

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", mobile: "", subject: "", message: "" });
      } else {
        throw new Error((data as any).error || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about our courses, need technical support, or want to discuss partnership opportunities? We'd
            love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-emerald-500/20">
              <h2 className="text-2xl font-semibold mb-6 text-emerald-400">Get in Touch</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: "📧",
                    title: "Email",
                    content: "support@tradecraft.com",
                    description: "Send us an email anytime!",
                    link: "mailto:support@tradecraft.com",
                  },
                  {
                    icon: "📞",
                    title: "Phone",
                    content: "+1 (555) 123-4567",
                    description: "Mon-Fri from 8am to 5pm EST",
                    link: "tel:+15551234567",
                  },
                  {
                    icon: "💬",
                    title: "Live Chat",
                    content: "Available 24/7",
                    description: "Get instant support",
                    link: "#",
                  },
                  {
                    icon: "📍",
                    title: "Office",
                    content: "123 Trading Street",
                    description: "Financial District, New York, NY 10004",
                    link: "https://maps.google.com",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-200">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <a
                        href={item.link}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 block"
                      >
                        {item.content}
                      </a>
                      <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-emerald-500/20"
            >
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Why Choose TradeCraft?</h3>
              <ul className="space-y-3 text-gray-300">
                {[
                  "Expert-led courses and mentorship",
                  "Real-time market analysis and insights",
                  "24/7 community support",
                  "Proven track record of success",
                  "Comprehensive learning resources",
                  "Money-back guarantee",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <span className="text-emerald-400 mr-3 text-lg">✓</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-r from-emerald-500/10 to-green-600/10 p-6 rounded-2xl border border-emerald-500/30"
            >
              <h3 className="text-lg font-semibold mb-3 text-emerald-400">⚡ Quick Response</h3>
              <p className="text-gray-300 text-sm">
                We typically respond to all inquiries within 2-4 hours during business hours. For urgent matters, please
                call us directly.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-emerald-500/20">
              <h2 className="text-2xl font-semibold mb-6 text-emerald-400">Send us a Message</h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Status Message */}
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rounded-lg p-4 ${
                      status.type === "success"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : status.type === "error"
                          ? "bg-red-500/20 text-red-300 border border-red-500/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">
                        {status.type === "success" ? "✅" : status.type === "error" ? "❌" : "⏳"}
                      </span>
                      {status.message}
                    </div>
                  </motion.div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-2">
                      Mobile Number
                    </label>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white transition-all duration-200"
                      value={formData.subject}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a subject</option>
                      <option value="course-inquiry">Course Inquiry</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 resize-vertical"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe your inquiry in detail. The more information you provide, the better we can assist you."
                  />
                  <p className="text-gray-400 text-xs mt-1">{formData.message.length}/500 characters</p>
                </div>

                {/* Privacy Notice */}
                <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                  <p className="text-gray-300 text-sm">
                    <span className="text-emerald-400">🔒 Privacy Notice:</span> Your information is secure with us.
                    We'll only use your contact details to respond to your inquiry and won't share them with third
                    parties.
                  </p>
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button
                    type="submit"
                    disabled={status.type === "loading"}
                    className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/25 transform hover:scale-[1.02]"
                  >
                    {status.type === "loading" ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending Message...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <span className="mr-2">📤</span>
                        Send Message
                      </span>
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-semibold text-center mb-12">
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly will I receive a response?",
                answer:
                  "We typically respond within 2-4 hours during business hours (Mon-Fri, 8am-5pm EST). For urgent matters, please call us directly.",
              },
              {
                question: "Do you offer refunds for courses?",
                answer:
                  "Yes, we offer a 30-day money-back guarantee for all our courses. If you're not satisfied, contact us for a full refund.",
              },
              {
                question: "Can I schedule a consultation call?",
                answer:
                  "We offer free 15-minute consultation calls to discuss your trading goals and recommend the best courses for you.",
              },
              {
                question: "Do you provide technical support?",
                answer:
                  "Yes, we provide comprehensive technical support for all platform-related issues. Our support team is available 24/7 via live chat.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-emerald-500/20"
              >
                <h3 className="text-lg font-semibold text-emerald-400 mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
