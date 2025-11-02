import React, { useState, useRef, useEffect } from 'react'
import { BsFillSendFill, BsRobot } from 'react-icons/bs'

const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    text: "Halo! Saya Asisten ASN Mate. Ada yang bisa saya bantu?"
  },
];

// --- LOGIKA BALASAN BOT DIPERBARUI DI SINI ---
const getBotReply = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // BARU: Cek spesifik untuk pertanyaan dokumen pendaftaran CPNS
  if (msg.includes('dokumen') && (msg.includes('cpns') || msg.includes('daftar') || msg.includes('butuh'))) {
    return "Dokumen utama yang dibutuhkan adalah: KTP (atau Suket), Kartu Keluarga, Ijazah, Transkrip Nilai, Pas Foto (latar merah), dan Swafoto/Selfie. Pastikan Anda selalu mengecek persyaratan spesifik pada formasi yang Anda lamar, ya!";
  }

  // Cek untuk dokumen ditolak/buram (dipindahkan ke bawah)
  if (msg.includes('dokumen') || msg.includes('buram') || msg.includes('ditolak')) {
    return "Anda perlu mengunggah ulang dokumen tersebut. Pastikan dokumen terlihat jelas, tidak ada glare (pantulan cahaya), dan semua teks terbaca.";
  }

  // Cek lainnya
  if (msg.includes('ujian') || msg.includes('proctoring')) {
    return "Simulasi ujian online akan diawasi oleh AI Proctoring untuk memastikan integritas. Pastikan wajah Anda selalu terlihat di kamera dan tidak ada aktivitas mencurigakan.";
  }
  if (msg.includes('rekomendasi') || msg.includes('formasi')) {
    return "Rekomendasi formasi didasarkan pada profil, latar belakang pendidikan, dan hasil asesmen kompetensi Anda.";
  }
  
  // Balasan default
  return "Maaf, saya belum mengerti pertanyaan Anda. Bisakah Anda menjelaskannya lebih lanjut?";
};
// --- AKHIR BLOK PERUBAHAN ---


function ChatbotPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    
    setInput('');

    setTimeout(() => {
      const botMessageText = getBotReply(input);
      const newBotMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: botMessageText,
      };
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    }, 1000); 
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#ff623f] mb-4">
        Asisten Pendaftaran
      </h2>
      <p className="text-neutral-600 mb-6">
        Ajukan pertanyaan apa pun seputar proses seleksi ASN.
      </p>

      <div className="bg-[#ffffff] border border-neutral-200 rounded-xl shadow-lg flex flex-col h-[75vh] md:h-[70vh]">

        <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
          <BsRobot className="text-2xl text-[#ff623f]" />
          <h3 className="text-lg font-semibold text-[#000000] m-0">
            ASN Mate Assistant
          </h3>
        </div>

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
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-neutral-200 bg-[#ffffff]">
          <form className="flex gap-2" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ketik pesan Anda di sini..."
              className="flex-1 p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#feaf0c]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
