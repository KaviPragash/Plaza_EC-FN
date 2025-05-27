"use client";

import { useState } from "react";
import { HelpCircle, Phone, ArrowLeft, MessageCircle, Zap } from "lucide-react";

const faqs = [
  {
    question: "How can I track my package?",
    answer: "You can track your package using the tracking link sent to your email or by visiting the 'My Orders' section in your account.",
  },
  {
    question: "Can I modify my order?",
    answer: "Orders can be modified within 30 minutes of placement. Visit 'My Orders' and select the relevant order to edit.",
  },
  {
    question: "What's your return policy?",
    answer: "We accept returns within 14 days of delivery. Please ensure items are unused and in original packaging.",
  },
];

export default function HelpSupportCard() {
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 rounded-2xl shadow-xl border border-blue-100/50 p-4 md:p-6 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-lg"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
            <HelpCircle size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Need Help?
            </h3>
            <p className="text-xs text-gray-500">We&rsquo;re here to assist you</p>

          </div>
        </div>

        <div className="space-y-3 mb-6">
          {/* Customer Support Card */}
          <div className="group relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
                <Phone size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm md:text-base">Customer Support</p>
                <p className="text-blue-100 text-xs md:text-sm flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Available 24/7
                </p>
              </div>
              <a 
                href="tel:+944123456789" 
                className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors duration-200 border border-white/20"
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Order Issues Card */}
          <div className="group relative bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm md:text-base">Order Issues</p>
                <p className="text-cyan-100 text-xs md:text-sm">Need assistance?</p>
              </div>
              <button className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors duration-200 border border-white/20 flex items-center gap-1">
                <Zap size={14} />
                Get Help
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-inner">
          {selectedFAQ === null ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <p className="font-semibold text-gray-800 text-sm md:text-base">Frequently Asked Questions</p>
              </div>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedFAQ(index)}
                    className="group cursor-pointer bg-white/60 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg p-3 border border-gray-100/50 hover:border-blue-200/50 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                      <p className="text-sm md:text-base text-gray-700 group-hover:text-gray-800 font-medium">
                        {faq.question}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <button
                onClick={() => setSelectedFAQ(null)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-4 group transition-colors duration-200"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                <span className="font-medium">Back to FAQs</span>
              </button>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-l-4 border-gradient-to-b border-blue-500">
                <p className="font-bold text-gray-800 mb-3 text-sm md:text-base">
                  {faqs[selectedFAQ].question}
                </p>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {faqs[selectedFAQ].answer}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}