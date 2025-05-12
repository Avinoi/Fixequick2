import { useState } from 'react';
import { Send, User } from 'lucide-react';

const ChatSection = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  
  // Mock chats data
  const chats = [
    {
      id: 'chat1',
      workerId: 'worker1',
      workerName: 'Manoj Verma',
      avatar: 'https://i.pravatar.cc/300?img=70',
      lastMessage: 'I will be arriving at 2 PM',
      lastMessageTime: '10:30 AM',
      unread: 2,
      service: 'Plumbing'
    },
    {
      id: 'chat2',
      workerId: 'worker2',
      workerName: 'Sara Iyer',
      avatar: 'https://i.pravatar.cc/300?img=47',
      lastMessage: 'Do you have the required tools?',
      lastMessageTime: 'Yesterday',
      unread: 0,
      service: 'Electrical'
    }
  ];
  
  // Mock messages for the selected chat
  const messages = [
    {
      id: 'm1',
      chatId: 'chat1',
      senderId: 'customer1',
      text: 'Hello, I have a leak under my sink',
      timestamp: '2024-04-07T09:30:00Z',
      read: true
    },
    {
      id: 'm2',
      chatId: 'chat1',
      senderId: 'worker1',
      text: 'I can fix that for you. I am available tomorrow',
      timestamp: '2024-04-07T09:32:00Z',
      read: true
    },
    {
      id: 'm3',
      chatId: 'chat1',
      senderId: 'customer1',
      text: 'Great! What time can you come?',
      timestamp: '2024-04-07T09:33:00Z',
      read: true
    },
    {
      id: 'm4',
      chatId: 'chat1',
      senderId: 'worker1',
      text: 'I will be arriving at 2 PM',
      timestamp: '2024-04-07T10:30:00Z',
      read: false
    }
  ];
  
  // Function to format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getChatMessages = (chatId: string) => {
    return messages.filter(message => message.chatId === chatId);
  };
  
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;
    
    // Here you would normally send the message to your backend
    // For this example, we'll just clear the input
    setNewMessage('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Chat</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-12rem)]">
        <div className="flex h-full">
          {/* Chat list */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            {chats.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No conversations yet</p>
              </div>
            ) : (
              <div>
                {chats.map(chat => (
                  <div 
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat === chat.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        {chat.avatar ? (
                          <img 
                            src={chat.avatar} 
                            alt={chat.workerName} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500 text-xl font-bold">
                            {chat.workerName.charAt(0)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium truncate">{chat.workerName}</h3>
                          <span className="text-xs text-gray-500 flex-shrink-0">{chat.lastMessageTime}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        <p className="text-xs text-gray-500">{chat.service}</p>
                      </div>
                      
                      {chat.unread > 0 && (
                        <div className="bg-blue-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                          {chat.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Chat messages */}
          <div className="w-2/3 flex flex-col">
            {!selectedChat ? (
              <div className="flex-grow flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Select a conversation to start chatting</p>
                </div>
              </div>
            ) : (
              <>
                {/* Chat header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      {chats.find(c => c.id === selectedChat)?.avatar ? (
                        <img 
                          src={chats.find(c => c.id === selectedChat)?.avatar} 
                          alt={chats.find(c => c.id === selectedChat)?.workerName} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500 text-xl font-bold">
                          {chats.find(c => c.id === selectedChat)?.workerName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{chats.find(c => c.id === selectedChat)?.workerName}</h3>
                      <p className="text-xs text-gray-500">{chats.find(c => c.id === selectedChat)?.service}</p>
                    </div>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto">
                  <div className="space-y-3">
                    {getChatMessages(selectedChat).map(message => (
                      <div 
                        key={message.id} 
                        className={`max-w-[70%] ${
                          message.senderId === 'customer1' 
                            ? 'ml-auto bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                            : 'bg-gray-100 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg'
                        } p-3 relative`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className={`text-xs absolute bottom-1 right-2 ${
                          message.senderId === 'customer1' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Message input */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;