import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ChatbotIcon from './components/ChatbotIcon'
import Dashboard from './pages/Dashboard'
import VerifikasiDokumen from './pages/VerifikasiDokumen'
import UjianOnline from './pages/UjianOnline'
import Rekomendasi from './pages/Rekomendasi'
import ChatbotPage from './pages/ChatbotPage'

function App() {
  return (
    <>
      <Header />
      {/* Padding diubah: px-4 di mobile, md:px-6 di layar lebih besar */}
      <main className="max-w-[1100px] mx-auto my-8 px-4 md:px-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/verifikasi" element={<VerifikasiDokumen />} />
          <Route path="/ujian" element={<UjianOnline />} />
          <Route path="/rekomendasi" element={<Rekomendasi />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
      </main>
      <ChatbotIcon />
    </>
  )
}

export default App