import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { db } from "../firebase";
import { ref, push, onValue, set, serverTimestamp } from "firebase/database";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const formRef = useRef(null);
  const linksRef = useRef(null);
  const headerRef = useRef(null);
  const chatScrollRef = useRef(null);

  // Form & Chat State
  const [chatMode, setChatMode] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [formData, setFormData] = useState({ user_name: "", user_email: "", message: "" });
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  // Check for existing chat session on load
  useEffect(() => {
    const savedChatId = localStorage.getItem("portfolio_chat_id");
    if (savedChatId) {
      setChatId(savedChatId);
      setChatMode(true);
      
      // Listen to Real-Time messages from Firebase
      const messagesRef = ref(db, `chats/${savedChatId}/messages`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const msgList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          msgList.sort((a, b) => a.timestamp - b.timestamp);
          setMessages(msgList);
        }
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Start Chat (Initial Form Submit)
  const handleStartChat = async (e) => {
    e.preventDefault();
    if (!formData.user_name || !formData.user_email || !formData.message) return;

    const newChatId = Date.now().toString();
    localStorage.setItem("portfolio_chat_id", newChatId);
    setChatId(newChatId);
    setChatMode(true);
    
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Create chat metadata in Firebase
    await set(ref(db, `chats/${newChatId}/info`), {
      name: formData.user_name,
      email: formData.user_email,
      startedAt: serverTimestamp(),
      lastMessageAt: serverTimestamp(),
    });

    const messagesRef = ref(db, `chats/${newChatId}/messages`);

    // 2. Push user's initial message
    await push(messagesRef, {
      sender: "user",
      text: formData.message,
      time: timeNow,
      timestamp: serverTimestamp()
    });

    // 3. Listen to messages for this chat
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const msgList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        msgList.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(msgList);
      }
    });

    // 4. Simulate System/Admin Auto-Reply
    setTimeout(async () => {
      await push(messagesRef, {
        sender: "admin", 
        text: `Hi ${formData.user_name.split(' ')[0]}! Message received. I usually respond within a few hours. Keep this tab open to chat directly with me right here!`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: serverTimestamp()
      });
    }, 1500);
  };

  // Send subsequent messages in chat
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim() || !chatId) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    
    await push(messagesRef, {
      sender: "user",
      text: currentMessage,
      time: timeNow,
      timestamp: serverTimestamp()
    });

    // Update last active time
    await set(ref(db, `chats/${chatId}/info/lastMessageAt`), serverTimestamp());
    
    setCurrentMessage("");
  };

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      tl.fromTo(headerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .fromTo(formRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .fromTo(linksRef.current.children, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }, "-=0.6");

      gsap.to(contentWrapperRef.current, {
        y: -12, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1
      });

      if (linksRef.current) {
        Array.from(linksRef.current.children).forEach((link, idx) => {
          gsap.to(link, { y: -8 - (idx % 3), duration: 2.5 + (idx * 0.3), ease: "sine.inOut", yoyo: true, repeat: -1, delay: idx * 0.15 });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen py-32 bg-transparent z-10 overflow-hidden">
      <div className="section-container" ref={contentWrapperRef}>
        
        {/* Header */}
        <div ref={headerRef} className="mb-20 md:mb-28 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, #3b82f6)" }} />
            <span className="font-mono text-[10px] tracking-[0.40em] uppercase text-[#3b82f6]">Live Chat</span>
          </div>
          <h2 className="heading-primary" style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)" }}>Let's Work Together</h2>
          <p className="mt-4 text-[#a1a1aa] text-base max-w-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
            Start a direct, private live chat with me right here on the website. No third-party apps required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* ── Chat/Form Container ── */}
          <div ref={formRef} className="p-8 md:p-10 rounded-3xl w-full relative overflow-hidden transition-all duration-500"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(16px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                height: "600px",
                display: "flex",
                flexDirection: "column"
              }}>
            
            {!chatMode ? (
              // ── STEP 1: INITIAL CONTACT FORM ──
              <form className="flex flex-col gap-6 h-full justify-center animate-[fadeIn_0.5s_ease-in-out]" onSubmit={handleStartChat}>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/30 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  </div>
                  <h3 className="text-white text-xl font-bold font-display">Start a Private Chat</h3>
                  <p className="text-[#a1a1aa] text-sm mt-2">Enter your details to open a secure chat line.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#3b82f6] transition-all" />
                  <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} required placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#3b82f6] transition-all" />
                </div>
                
                <textarea name="message" value={formData.message} onChange={handleChange} required rows="3" placeholder="What would you like to discuss?" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#3b82f6] transition-all resize-none"></textarea>

                <button type="submit" className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white w-full mt-2"
                  style={{ background: "linear-gradient(135deg,#3b82f6 0%,#2563eb 100%)", boxShadow: "0 0 0 1px rgba(59,130,246,0.5),0 4px 24px rgba(59,130,246,0.35)" }}>
                  Start Live Chat
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </form>
            ) : (
              // ── STEP 2: LIVE CHAT INTERFACE ──
              <div className="flex flex-col h-full animate-[fadeIn_0.5s_ease-in-out]">
                {/* Chat Header */}
                <div className="flex items-center gap-4 pb-4 border-b border-white/10 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    A
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Ahsan Ullah</h4>
                    <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Online
                    </div>
                  </div>
                </div>

                {/* Chat History */}
                <div ref={chatScrollRef} className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar flex flex-col">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                      <div className={`p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-[#3b82f6] text-white rounded-tr-sm' : 'bg-white/10 text-white border border-white/5 rounded-tl-sm'}`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-[#a1a1aa] mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="mt-4 pt-4 border-t border-white/10 flex gap-3 relative">
                  <input 
                    type="text" 
                    value={currentMessage} 
                    onChange={(e) => setCurrentMessage(e.target.value)} 
                    placeholder="Type a message..." 
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#3b82f6] transition-all text-sm" 
                  />
                  <button type="submit" className="w-12 h-12 rounded-full bg-[#3b82f6] flex items-center justify-center text-white hover:bg-[#2563eb] transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0">
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Social Links Side */}
          <div ref={linksRef} className="flex flex-col gap-6 lg:pl-10">
            {[
              { name: "GitHub", url: "https://github.com/Ahsan-Ullah-49", icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.84-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" },
              { name: "LinkedIn", url: "https://www.linkedin.com/in/ahsan-ullah-a168a525a/", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              { name: "Instagram", url: "https://www.instagram.com/dolla_g49/?utm_source=ig_web_button_share_sheet", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
              { name: "WhatsApp", url: "https://wa.me/923265075365", icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
            ].map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-6 rounded-2xl transition-all duration-300"
                style={{ background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.15)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.2)"; e.currentTarget.style.transform = "scale(1.03) translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "scale(1) translateY(0)"; }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: "#3b82f6" }}>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-[#ffffff] mb-1 group-hover:text-[#3b82f6] transition-colors duration-300">{social.name}</h4>
                  <p className="text-[#a1a1aa] text-sm font-mono tracking-wide group-hover:text-[#ffffff] transition-colors duration-300">Connect on {social.name}</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.5); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.8); }
      `}</style>
    </section>
  );
}
