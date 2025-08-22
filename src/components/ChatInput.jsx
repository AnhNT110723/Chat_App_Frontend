import React, { useState, useEffect, useRef } from 'react'; 
import EmojiPicker from "emoji-picker-react";

const ChatInput = ({
  message,
  setMessage,
  sendMessage,
  handleKeyPress,
  selectedRecipient,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
   const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const onEmojiClick = (emojiObject) => {
    setMessage(prev => prev + emojiObject.emoji);
  };

  const handleSend = () => {
    if (message.trim()) {
      sendMessage();
      setShowEmojiPicker(false); // Đóng picker khi gửi
    }
  };

  const handleKeyPressWithClose = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      handleKeyPress(e);
      setShowEmojiPicker(false); // Đóng picker khi gửi
    }
  };
  return (
    <div className="bg-white border-t border-gray-200 p-4">
      {selectedRecipient ? (
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 rounded-full hover:bg-gray-200"
            disabled={!selectedRecipient}
          >
            😊
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-4 z-10">
              <EmojiPicker onEmojiClick={onEmojiClick} emojiStyle="native" />
            </div>
          )}
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPressWithClose}
            className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">
          Vui lòng chọn một người dùng hoặc nhóm để bắt đầu trò chuyện.
        </p>
      )}
    </div>
  );
};

export default ChatInput;
