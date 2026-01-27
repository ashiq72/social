
import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Message } from '../types.ts';

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    partner: { name: 'Sarah Chen', username: 'schen_dev', avatar: 'https://picsum.photos/seed/sarah/100/100' },
    lastMessage: 'The new design looks amazing! ✨',
    lastMessageTimestamp: '10:30 AM',
    unreadCount: 2,
    isOnline: true
  },
  {
    id: 'c2',
    partner: { name: 'Jordan Lee', username: 'jlee_ai', avatar: 'https://picsum.photos/seed/jordan/100/100' },
    lastMessage: 'Let\'s catch up later today.',
    lastMessageTimestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false
  }
];

const MOCK_MESSAGES: Message[] = [
  { id: 'm1', senderId: 'other', content: 'Hey Alex! How is the new VibeStream project going?', timestamp: '10:00 AM' },
  { id: 'm2', senderId: 'u1', content: 'It is coming along perfectly! Just finished the typography adjustments.', timestamp: '10:05 AM' },
];

const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(MOCK_CONVERSATIONS[0]);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      senderId: 'u1',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden flex h-[calc(100vh-160px)] md:h-[calc(100vh-120px)]">
      <aside className={`${!isSidebarOpen && selectedConversation ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-80 border-r border-slate-50 bg-slate-50/30`}>
        <div className="p-6 border-b border-slate-100 bg-white/50 backdrop-blur-sm">
          <h2 className="text-lg font-extrabold tracking-tight mb-4">Messages</h2>
          <div className="relative">
            <i className="fas fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-slate-100/50 border-none rounded-2xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-black/5 outline-none font-bold text-black placeholder-slate-400"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {MOCK_CONVERSATIONS.map(conv => (
            <button
              key={conv.id}
              onClick={() => { setSelectedConversation(conv); setIsSidebarOpen(false); }}
              className={`w-full p-4 flex items-center space-x-4 transition-all relative border-b border-slate-50/50 ${selectedConversation?.id === conv.id ? 'bg-white shadow-sm z-10' : 'hover:bg-white/40'}`}
            >
              <div className="relative">
                <img src={conv.partner.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt="" />
                {conv.isOnline && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-bold text-sm text-slate-900 truncate">{conv.partner.name}</h4>
                  <span className="text-[10px] font-bold text-slate-400">{conv.lastMessageTimestamp}</span>
                </div>
                <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'text-black font-bold' : 'text-slate-500 font-medium'}`}>{conv.lastMessage}</p>
              </div>
              {conv.unreadCount > 0 && (
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                  {conv.unreadCount}
                </div>
              )}
            </button>
          ))}
        </div>
      </aside>

      <main className={`${!selectedConversation ? 'hidden' : 'flex'} md:flex flex-1 flex-col relative bg-white`}>
        {selectedConversation ? (
          <>
            <header className="p-4 md:px-7 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md">
              <div className="flex items-center space-x-4">
                <button onClick={() => setIsSidebarOpen(true)} className="md:hidden w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="relative">
                  <img src={selectedConversation.partner.avatar} className="w-10 h-10 rounded-2xl border border-slate-100 shadow-sm" alt="" />
                  {selectedConversation.isOnline && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-slate-900 leading-none">{selectedConversation.partner.name}</h3>
                  <span className="text-[11px] font-bold text-slate-400 mt-1 inline-block uppercase tracking-wider">Active now</span>
                </div>
              </div>
              <div className="flex space-x-2">
                 <button className="w-10 h-10 rounded-2xl hover:bg-slate-50 text-slate-400 transition-all flex items-center justify-center"><i className="fas fa-phone"></i></button>
                 <button className="w-10 h-10 rounded-2xl hover:bg-slate-50 text-slate-400 transition-all flex items-center justify-center"><i className="fas fa-video"></i></button>
                 <button className="w-10 h-10 rounded-2xl hover:bg-slate-50 text-slate-400 transition-all flex items-center justify-center"><i className="fas fa-circle-info"></i></button>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5 bg-[#fafbfd]/50 no-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === 'u1' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-5 py-3 rounded-2xl text-[15px] font-bold shadow-sm leading-relaxed ${
                    msg.senderId === 'u1' ? 'bg-black text-white rounded-br-none shadow-black/10' : 'bg-white text-black border border-slate-100 rounded-bl-none'
                  }`}>
                    {msg.content}
                    <p className={`text-[9px] mt-1.5 font-bold uppercase tracking-widest ${msg.senderId === 'u1' ? 'text-white/60' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <footer className="p-6 bg-white border-t border-slate-100">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                <button type="button" className="w-11 h-11 flex-shrink-0 text-slate-400 hover:text-black transition-colors">
                  <i className="far fa-square-plus text-2xl"></i>
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-100/70 border-none rounded-[20px] py-3 px-6 text-sm focus:ring-2 focus:ring-black/5 outline-none font-bold text-black placeholder-slate-400"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="w-11 h-11 flex-shrink-0 bg-black hover:bg-slate-800 disabled:opacity-20 rounded-[20px] text-white transition-all flex items-center justify-center shadow-lg shadow-black/10 active:scale-95"
                >
                  <i className="fas fa-paper-plane text-sm"></i>
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300 p-12">
            <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mb-6">
              <i className="far fa-comments text-4xl"></i>
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Select a connection to chat</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;