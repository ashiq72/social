
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
    lastMessage: 'Did you see the latest update?',
    lastMessageTimestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false
  }
];

const MOCK_MESSAGES: Message[] = [
  { id: 'm1', senderId: 'other', content: 'Hey Alex! How is the project going?', timestamp: '10:00 AM' },
  { id: 'm2', senderId: 'u1', content: 'Going great! Just polishing the UI right now.', timestamp: '10:05 AM' },
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
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex h-[calc(100vh-140px)] md:h-[calc(100vh-100px)]">
      <aside className={`${!isSidebarOpen && selectedConversation ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-64 border-r border-gray-50`}>
        <div className="p-4 border-b border-gray-50">
          <h2 className="text-xl font-black mb-3">Chats</h2>
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-gray-50 border-none rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-black outline-none"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_CONVERSATIONS.map(conv => (
            <button
              key={conv.id}
              onClick={() => { setSelectedConversation(conv); setIsSidebarOpen(false); }}
              className={`w-full p-3 flex items-center space-x-3 transition-colors ${selectedConversation?.id === conv.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
            >
              <img src={conv.partner.avatar} className="w-10 h-10 rounded-lg object-cover" alt="" />
              <div className="flex-1 text-left min-w-0">
                <h4 className="font-bold text-xs text-gray-900 truncate">{conv.partner.name}</h4>
                <p className="text-[10px] truncate text-gray-500">{conv.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <main className={`${!selectedConversation ? 'hidden' : 'flex'} md:flex flex-1 flex-col relative`}>
        {selectedConversation ? (
          <>
            <header className="p-3 md:px-6 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button onClick={() => setIsSidebarOpen(true)} className="md:hidden w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                  <i className="fas fa-chevron-left text-xs"></i>
                </button>
                <img src={selectedConversation.partner.avatar} className="w-8 h-8 rounded-lg" alt="" />
                <div>
                  <h3 className="font-bold text-xs text-gray-900 leading-none">{selectedConversation.partner.name}</h3>
                  <span className="text-[8px] font-bold text-green-500 uppercase mt-1 inline-block">Online</span>
                </div>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/20">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === 'u1' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2 rounded-xl text-xs font-medium shadow-sm ${
                    msg.senderId === 'u1' ? 'bg-black text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <footer className="p-3 bg-white border-t border-gray-50">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Message..."
                  className="flex-1 bg-gray-50 border-none rounded-lg py-2 px-4 text-xs focus:ring-1 focus:ring-black outline-none"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="w-9 h-9 flex-shrink-0 bg-black hover:bg-gray-800 disabled:opacity-20 rounded-lg text-white transition-all flex items-center justify-center"
                >
                  <i className="fas fa-paper-plane text-xs"></i>
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6">
            <p className="text-xs font-bold uppercase tracking-widest">Select a chat</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
