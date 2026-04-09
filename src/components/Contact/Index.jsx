import React, { useState } from "react";

// --- Custom Icons ---
const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-5 h-5 ml-2 transform -rotate-45 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic here
    alert("Message Sent! (Demo)");
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFCF8] px-4 pb-24">
      
      {/* --- Header --- */}
      <div className="max-w-4xl mx-auto text-center pt-10 md:pt-20 mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 border-2 border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6">
          Contact Us
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-stone-800 font-serif mb-6 leading-tight">
          Have Questions? <br />
          <span className="relative inline-block text-emerald-600">
            Let's Chat!
            <svg className="absolute w-full h-3 -bottom-2 left-0 text-emerald-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
        </h1>
        <p className="text-lg text-stone-500 max-w-2xl mx-auto font-medium">
          Whether you need help with adoption, have feedback, or just want to share a cute pet photo, we are all ears!
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
        
        {/* --- Left Column: Contact Info --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Info Card */}
          <div className="bg-emerald-600 rounded-[2.5rem] border-2 border-black p-8 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            
            <h3 className="text-2xl font-bold font-serif mb-6">Contact Info</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                  <MailIcon />
                </div>
                <div>
                  <p className="text-emerald-100 text-sm font-bold uppercase tracking-wide">Email</p>
                  <p className="text-lg font-semibold">hello@pickmypet.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-emerald-100 text-sm font-bold uppercase tracking-wide">Phone</p>
                  <p className="text-lg font-semibold">+91 987 654 3210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                  <MapIcon />
                </div>
                <div>
                  <p className="text-emerald-100 text-sm font-bold uppercase tracking-wide">Office</p>
                  <p className="text-lg font-semibold">Jaipur, Rajasthan, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social / FAQ Prompt Card */}
          <div className="bg-[#FCD34D] rounded-[2.5rem] border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold text-stone-900 font-serif mb-2">Check our FAQ</h3>
            <p className="text-stone-800 font-medium mb-4">
              Most questions about adoption processes and fees are answered there!
            </p>
            <button className="w-full bg-white border-2 border-black rounded-xl py-3 font-bold hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Visit Help Center
            </button>
          </div>

        </div>

        {/* --- Right Column: The Form --- */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[3rem] border-2 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_#10B981]">
            <h2 className="text-3xl font-bold text-stone-800 font-serif mb-8">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-600 uppercase tracking-wide">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all font-medium placeholder-stone-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-600 uppercase tracking-wide">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all font-medium placeholder-stone-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-600 uppercase tracking-wide">Subject</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all font-medium cursor-pointer"
                >
                  <option value="">Select a topic</option>
                  <option value="adoption">Adoption Inquiry</option>
                  <option value="rehome">Rehoming Help</option>
                  <option value="support">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-600 uppercase tracking-wide">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="How can we help you today?"
                  className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all font-medium placeholder-stone-400 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-stone-900 text-white font-bold text-lg rounded-xl shadow-[4px_4px_0px_0px_#FCD34D] border-2 border-transparent hover:border-black hover:bg-stone-800 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
              >
                Send Message
                <SendIcon />
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Index;