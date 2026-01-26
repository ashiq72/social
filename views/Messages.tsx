
import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Message } from '../types';

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    partner: { name: 'Sarah Chen', username: 'schen_dev', avatar: 'https://picsum.photos/seed/sarah/100/100' },
    lastMessage: 'The new React hooks are game-changing!',
    lastMessageTimestamp: '10:30 AM',
    unreadCount: 2,
    isOnline: true
  },
  {
    id: 'c2',
    partner: { name: 'Jordan Lee', username: 'jlee_ai', avatar: 'https://picsum.photos/seed/jordan/100/100' },
    lastMessage: 'Did you see the latest Gemini update?',
    lastMessageTimestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false
  },
  {
    id: 'c3',
    partner: { name: 'Maya Smith', username: 'maya_design', avatar: 'https://picsum.photos/seed/maya/100/100' },
    lastMessage: 'Sent you the UI concepts.',
    lastMessageTimestamp: 'Mon',
    unreadCount: 0,
    isOnline: true
  }
];

const MOCK_MESSAGES: Message[] = [
  { id: 'm1', senderId: 'other', content: 'Hey Alex! How is the project going?', timestamp: '10:00 AM' },
  { id: 'm2', senderId: 'u1', content: 'Going great! Just polishing the UI right now.', timestamp: '10:05 AM' },
  { id: 'm3', senderId: 'other', content: 'Nice! Are you using Tailwind?', timestamp: '10:06 AM' },
  { id: 'm4', senderId: 'u1', content: 'Absolutely, it is my favorite for rapid prototyping.', timestamp: '10:10 AM' },
  { id: 'm5', senderId: 'other', content: 'The new React hooks are game-changing!', timestamp: '10:30 AM' },
];

const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(MOCK_CONVERSATIONS[0]);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex h-[calc(100vh-160px)] md:h-[calc(100vh-120px)] transition-all">
      {/* Conversation List Pane */}
      <aside className={`${!isSidebarOpen && selectedConversation ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-80 border-r border-gray-50`}>
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-2xl font-black mb-4">Messages</h2>
          <div className="relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full bg-gray-50 border-none rounded-2xl py-2.5 pl-10 pr-4 text-xs focus:ring-1 focus:ring-black transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {MOCK_CONVERSATIONS.map(conv => (
            <button
              key={conv.id}
              onClick={() => {
                setSelectedConversation(conv);
                setIsSidebarOpen(false);
              }}
              className={`w-full p-4 flex items-center space-x-4 transition-colors ${selectedConversation?.id === conv.id ? 'bg-black/5' : 'hover:bg-gray-50'}`}
            >
              <div className="relative flex-shrink-0">
                <img src={conv.partner.avatar} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white" alt="" />
                {conv.isOnline && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-sm text-gray-900 truncate">{conv.partner.name}</h4>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{conv.lastMessageTimestamp}</span>
                </div>
                <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'text-black font-bold' : 'text-gray-500'}`}>
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unreadCount > 0 && (
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-[10px] text-white font-black">
                  {conv.unreadCount}
                </div>
              )}
            </button>
          ))}
        </div>
      </aside>

      {/* Chat Interface Pane */}
      <main className={`${!selectedConversation ? 'hidden' : 'flex'} md:flex flex-1 flex-col relative`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <header className="p-4 md:px-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => setIsSidebarOpen(true)} className="md:hidden w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="flex items-center space-x-3">
                  <img src={selectedConversation.partner.avatar} className="w-10 h-10 rounded-xl" alt="" />
                  <div>
                    <h3 className="font-black text-sm text-gray-900 leading-none">{selectedConversation.partner.name}</h3>
                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mt-1">
                      {selectedConversation.isOnline ? 'Online now' : 'Active recently'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-10 h-10 rounded-xl hover:bg-gray-50 text-gray-400 transition-colors">
                  <i className="fas fa-phone"></i>
                </button>
                <button className="w-10 h-10 rounded-xl hover:bg-gray-50 text-gray-400 transition-colors">
                  <i className="fas fa-video"></i>
                </button>
                <button className="w-10 h-10 rounded-xl hover:bg-gray-50 text-gray-400 transition-colors">
                  <i className="fas fa-info-circle"></i>
                </button>
              </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-gray-50/30">
              <div className="text-center py-4">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-gray-100">
                  Today
                </span>
              </div>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === 'u1' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] md:max-w-[70%] px-5 py-3 rounded-3xl text-sm font-medium shadow-sm transition-all ${
                    msg.senderId === 'u1' 
                      ? 'bg-black text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}>
                    {msg.content}
                    <div className={`text-[9px] mt-1.5 font-bold uppercase ${msg.senderId === 'u1' ? 'text-white/40' : 'text-gray-300'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <footer className="p-4 md:p-6 bg-white border-t border-gray-50">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <button type="button" className="w-11 h-11 flex-shrink-0 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
                  <i className="fas fa-plus"></i>
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write a message..."
                    className="w-full bg-gray-50 border-none rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-black/5 transition-all outline-none"
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black transition-colors">
                    <i className="far fa-face-smile text-lg"></i>
                  </button>
                </div>
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="w-11 h-11 flex-shrink-0 bg-black hover:bg-gray-800 disabled:opacity-20 rounded-2xl text-white shadow-lg shadow-gray-200 transition-all flex items-center justify-center active:scale-95"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-gray-400">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
              <i className="far fa-comment-dots text-4xl"></i>
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-2">Your Conversations</h3>
            <p className="max-w-xs text-sm font-bold leading-relaxed">Select a chat to start vibing with your connections.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
