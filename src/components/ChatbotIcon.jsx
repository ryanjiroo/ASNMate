import React from 'react'
import { BsChatDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function ChatbotIcon() {
  return (
    <Link
      to="/chatbot"
      // Ukuran dan posisi responsif:
      // Seluler: 14x14, bottom-4, right-4
      // Desktop: 16x16, bottom-8, right-8
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-[#feaf0c] text-[#000000] rounded-full flex items-center justify-center text-2xl md:text-3xl cursor-pointer shadow-xl transition-transform hover:scale-110 z-30"
      title="Asisten Pendaftaran"
    >
      <BsChatDots />
    </Link>
  )
}

export default ChatbotIcon