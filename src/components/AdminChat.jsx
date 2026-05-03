import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { ref, onValue, push, serverTimestamp, set } from "firebase/database";

export default function AdminChat() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState("");
  const chatScrollRef = useRef(null);

  // 1. Fetch all active chat sessions
  useEffect(() => {
    const chatsRef = ref(db, "chats");
    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const chatList = Object.keys(data).map(key => ({
          id: key,
          ...data[key].info
        })).sort((a, b) => b.lastMessageAt - a.lastMessageAt);
        setChats(chatList);
      }
    });
  }, []);

  // 2. Fetch messages for the currently selected chat
  useEffect(() => {
    if (activeChatId) {
      const messagesRef = ref(db, `chats/${activeChatId}/messages`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const msgList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          msgList.sort((a, b) => a.timestamp - b.timestamp);
          setMessages(msgList);
        }
      });
    }
  }, [activeChatId]);

  // Auto-scroll
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 3. Send Admin Reply
  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeChatId) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messagesRef = ref(db, `chats/${activeChatId}/messages`);
    
    await push(messagesRef, {
      sender: "admin",
      text: replyText,
      time: timeNow,
      timestamp: serverTimestamp()
    });

    await set(ref(db, `chats/${activeChatId}/info/lastMessageAt`), serverTimestamp());
    setReplyText("");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans" style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
      {/* Sidebar - List of Chats */}
      <div className="w-1/3 md:w-1/4 border-r border-white/10 flex flex-col bg-[#050505]">
        <div className="p-6 border-b border-white/10 bg-[#0a0a0a]">
          <h1 className="text-xl font-bold text-[#3b82f6]">Admin Chat</h1>
          <p className="text-xs text-white/50 mt-1">Manage client messages</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChatId(chat.id)}
              className={`p-5 border-b border-white/5 cursor-pointer transition-colors ${activeChatId === chat.id ? 'bg-[#3b82f6]/10 border-l-4 border-l-[#3b82f6]' : 'hover:bg-white/5'}`}
            >
              <h3 className="font-bold text-[15px]">{chat.name}</h3>
              <p className="text-xs text-white/50 truncate mt-1">{chat.email}</p>
            </div>
          ))}
          {chats.length === 0 && <p className="p-6 text-white/40 text-center text-sm">No active chats.</p>}
        </div>
        <div className="p-4 border-t border-white/10 text-center">
            <a href="/" className="text-xs text-[#3b82f6] hover:underline">Back to Portfolio</a>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0a0a0a]">
        {activeChatId ? (
          <>
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#050505]">
              <div>
                <h2 className="text-lg font-bold">{chats.find(c => c.id === activeChatId)?.name}</h2>
                <span className="text-xs text-green-500 flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Live Connection
                </span>
              </div>
              <div className="text-sm text-white/40">{chats.find(c => c.id === activeChatId)?.email}</div>
            </div>

            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col max-w-[70%] ${msg.sender === 'admin' ? 'self-end items-end ml-auto' : 'self-start items-start'}`}>
                  <div className={`p-4 rounded-2xl ${msg.sender === 'admin' ? 'bg-[#3b82f6] text-white rounded-tr-sm' : 'bg-white/10 text-white rounded-tl-sm'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-white/40 mt-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleReply} className="p-6 border-t border-white/10 flex gap-4 bg-[#050505]">
              <input 
                type="text" 
                value={replyText} 
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply to the client..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
              <button type="submit" className="px-8 py-4 bg-[#3b82f6] rounded-full text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:bg-[#2563eb] hover:scale-105 transition-all">
                Send Reply
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/30 text-sm">
            Select a chat from the sidebar to start replying.
          </div>
        )}
      </div>
    </div>
  );
}
