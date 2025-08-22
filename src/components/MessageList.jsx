import React, { useEffect, useRef, useState } from 'react';

const MessageList = ({ messages, username, getInitials, isGroupChat, socket }) => {
  const messagesEndRef = useRef(null);
  const [showSeenFor, setShowSeenFor] = useState(new Set());

  // Xử lý tin nhắn cuối khi messages cập nhật
  useEffect(() => {
    if (messages.length > 0) {
      const myMessages = messages.filter(msg => msg.user === username);
      if (myMessages.length > 0) {
        const lastMessage = myMessages[myMessages.length - 1];
        if (lastMessage.seenBy && lastMessage.seenBy.length > 1) { // Có người khác xem
          setShowSeenFor(new Set([lastMessage._id])); // Chỉ hiển thị cho tin nhắn cuối
        } else {
          setShowSeenFor(new Set()); // Xóa nếu tin nhắn cuối chưa được xem
        }
      } else {
        setShowSeenFor(new Set()); // Xóa nếu không có tin nhắn của người dùng
      }
    }
  }, [messages, username]);

  // IntersectionObserver để đánh dấu đã xem khi cuộn đến cuối
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && messages.length > 0) {
          const room = isGroupChat
            ? messages[0].room
            : [username, messages[0].room.split('-').find(u => u !== username)].sort().join('-');
          socket.emit('markAsSeen', { room, isGroup: isGroupChat });
        }
      },
      { threshold: 0.1 }
    );

    if (messagesEndRef.current) {
      observer.observe(messagesEndRef.current);
    }

    return () => {
      if (messagesEndRef.current) {
        observer.unobserve(messagesEndRef.current);
      }
    };
  }, [messages, username, isGroupChat, socket]);

  // Xử lý nhấp vào tin nhắn để hiển thị/ẩn trạng thái đã xem
  const toggleSeenStatus = (messageId) => {
    setShowSeenFor(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth" id="messagesContainer">
      {messages.map((msg, index) => {
        const isMyMessage = msg.user === username;
        const seenByOthers = msg.seenBy ? msg.seenBy.filter(u => u !== msg.user) : [];
        const showSeen = isMyMessage && seenByOthers.length > 0 && showSeenFor.has(msg._id);

        return (
          <div 
            key={index} 
            className={`flex items-start space-x-3 message-bubble ${
              isMyMessage ? "justify-end" : ""
            }`}
          >
            {msg.user !== username && (
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-semibold">{getInitials(msg.user)}</span>
              </div>
            )}
            <div className="flex flex-col space-y-1 max-w-xs">
              <div 
                className={`rounded-2xl rounded-${isMyMessage ? 'tr' : 'tl'}-md px-4 py-2 shadow-sm ${
                  isMyMessage ? "bg-gradient-to-r from-blue-500 to-purple-600 cursor-pointer" : "bg-white"
                }`}
                onClick={isMyMessage ? () => toggleSeenStatus(msg._id) : undefined}
              >
                <p className={`break-words ${isMyMessage ? "text-white" : "text-gray-800"}`}>
                  {msg.text}
                </p>
              </div>
              {showSeen && (
                <div className={`text-xs text-gray-500 ${isMyMessage ? "text-right" : "text-left"} mt-1`}>
                  {isGroupChat ? (
                    <div className="flex space-x-1 justify-end">
                      {seenByOthers.map((user, i) => (
                        <div key={i} className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xxs">{getInitials(user)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-white">Đã xem</span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;