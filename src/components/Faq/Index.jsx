import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// --- Custom Icons ---
const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
);

const QuestionIcon = () => (
  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const categories = ["All", "Adoption", "Selling/Rehoming", "Safety", "Account"];

  const faqs = [
    {
      id: 1,
      category: "Adoption",
      question: "How do I adopt a pet through Pick My Pet?",
      answer: "It's simple! Browse our 'Pets' section using filters for species and breed. Once you find a pet you love, click on their profile to view details and contact the owner or shelter directly to arrange a meeting."
    },
    {
      id: 2,
      category: "Selling/Rehoming",
      question: "Is there a fee to list a pet for rehoming?",
      answer: "Creating a basic listing is free! We want to encourage responsible rehoming. However, if you are a professional breeder selling pets, there may be a small verification fee to ensure platform safety."
    },
    {
      id: 3,
      category: "Safety",
      question: "How do you verify users?",
      answer: "We use a combination of email verification, phone number validation, and manual review of listings. We also encourage community reporting to keep our platform safe for everyone."
    },
    {
      id: 4,
      category: "Adoption",
      question: "Can I adopt a pet if I live in a different city?",
      answer: "Yes, you can! You can filter pets by location. However, we strongly recommend meeting the pet in person before making any decisions. Transportation arrangements are between you and the owner."
    },
    {
      id: 5,
      category: "Account",
      question: "How do I update my profile picture?",
      answer: "Go to your 'Profile' page via the user menu in the top right corner. Click on the 'Edit Profile' button, and you will see an option to upload a new photo."
    },
    {
      id: 6,
      category: "Safety",
      question: "What should I do if I suspect a scam?",
      answer: "Please report the listing immediately using the 'Report' button on the post page. Do not send money online without seeing the pet first. Our team reviews all reports within 24 hours."
    }
  ];

  const filteredFaqs = activeCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleQuestion = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFCF8] px-4 py-12 md:py-20">
      
      {/* --- Header --- */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 border-2 border-yellow-300 text-yellow-800 text-xs font-bold uppercase tracking-wider mb-6">
          Support Center
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-stone-800 font-serif mb-6">
          Frequently Asked <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            Questions
          </span>
        </h1>
        <p className="text-lg text-stone-500 font-medium">
          Everything you need to know about finding or rehoming your furry friend.
        </p>
      </div>

      {/* --- Category Filters --- */}
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-xl border-2 font-bold text-sm transition-all duration-200 ${
              activeCategory === cat
                ? "bg-stone-900 border-black text-white shadow-[4px_4px_0px_0px_#10B981] translate-x-[-1px] translate-y-[-1px]"
                : "bg-white border-stone-200 text-stone-600 hover:border-emerald-400 hover:text-emerald-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- FAQ Accordion --- */}
      <div className="max-w-3xl mx-auto space-y-4 mb-20">
        <AnimatePresence mode="wait">
          {filteredFaqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                onClick={() => toggleQuestion(faq.id)}
                className={`group bg-white border-2 border-black rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${
                  openQuestionId === faq.id 
                    ? "shadow-[6px_6px_0px_0px_#FCD34D]" 
                    : "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                {/* Question Header */}
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 p-2 rounded-lg transition-colors ${
                      openQuestionId === faq.id ? "bg-emerald-100" : "bg-stone-100 group-hover:bg-emerald-50"
                    }`}>
                      <QuestionIcon />
                    </div>
                    <h3 className={`text-lg font-bold font-serif leading-snug pt-1 ${
                      openQuestionId === faq.id ? "text-emerald-700" : "text-stone-800"
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`mt-1 transition-transform duration-300 ${
                    openQuestionId === faq.id ? "rotate-180 text-emerald-600" : "text-stone-400"
                  }`}>
                    <ChevronDownIcon className="w-6 h-6" />
                  </div>
                </div>

                {/* Answer Content */}
                <AnimatePresence>
                  {openQuestionId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 ml-[3.5rem] text-stone-600 font-medium leading-relaxed border-t-2 border-dashed border-stone-100 mt-2 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 text-stone-400 font-medium">
            No questions found in this category.
          </div>
        )}
      </div>

      {/* --- Still Have Questions? --- */}
      <div className="max-w-4xl mx-auto bg-emerald-600 rounded-[3rem] border-2 border-black p-10 md:p-14 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full -ml-10 -mt-10 blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-400/30 rounded-full -mr-10 -mb-10 blur-xl"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
            Still have questions?
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
            Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
          <Link to="/contact">
            <button className="bg-white text-stone-900 px-8 py-3.5 rounded-xl font-bold border-2 border-black shadow-[4px_4px_0px_0px_#FCD34D] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              Get in Touch
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Index;