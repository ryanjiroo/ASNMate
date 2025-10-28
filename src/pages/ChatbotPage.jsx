import React from 'react'
import { BsFillSendFill, BsRobot } from 'react-icons/bs'

const messages = [
  { 
    id: 1, 
    sender: 'bot', 
    text: "Halo! Saya Asisten ASN Mate. Ada yang bisa saya bantu?" 
  },
  { 
    id: 2, 
    sender: 'user', 
    text: "Dokumen saya ditolak karena buram, apa yang harus saya lakukan?" 
  },
  { 
    id: 3, 
    sender: 'bot', 
    text: "Anda perlu mengunggah ulang dokumen tersebut. Pastikan dokumen terlihat jelas, tidak ada glare (pantulan cahaya), dan semua teks terbaca." 
  },
];

function ChatbotPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#ff623f] mb-4">
        Asisten Pendaftaran
      </h2>
      <p className="text-neutral-600 mb-6">
        Ajukan pertanyaan apa pun seputar proses seleksi ASN.
      </p>

      {/* Tinggi kontainer chat dibuat responsif */}
      <div className="bg-[#ffffff] border border-neutral-200 rounded-xl shadow-lg flex flex-col h-[75vh] md:h-[70vh]">
        
        <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
          <BsRobot className="text-2xl text-[#ff623f]" />
          <h3 className="text-lg font-semibold text-[#000000] m-0">
            ASN Mate Assistant
          </h3>
        </div>

        {/* Area Pesan */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-neutral-50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.sender === 'user' 
                    ? 'bg-[#feaf0c]/20 text-[#000000]'
                    : 'bg-neutral-200 text-[#000000]'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Area Input */}
        <div className="p-4 border-t border-neutral-200 bg-[#ffffff]">
          <form className="flex gap-2">
            <input
              type="text"
              placeholder="Ketik pesan Anda di sini..."
              className="flex-1 p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#feaf0c]"
            />
            <button
              type="submit"
              className="p-3 bg-[#ff623f] text-[#ffffff] rounded-lg flex items-center justify-center transition-opacity hover:opacity-90"
            >
              <BsFillSendFill className="text-xl" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatbotPage