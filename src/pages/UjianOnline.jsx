import React, { useState, useEffect } from 'react'
import { BsExclamationTriangleFill, BsShieldCheck } from 'react-icons/bs'

const mockLogs = [
  { type: 'normal', msg: 'Sesi ujian dimulai.', icon: <BsShieldCheck className="text-green-600" /> },
  { type: 'warning', msg: 'Peringatan: Terdeteksi aktivitas mulut.', icon: <BsExclamationTriangleFill className="text-[#feaf0c]" /> },
  { type: 'warning', msg: 'Peringatan: Wajah tidak terlihat.', icon: <BsExclamationTriangleFill className="text-[#feaf0c]" /> },
  { type: 'normal', msg: 'Aktivitas normal kembali.', icon: <BsShieldCheck className="text-green-600" /> },
];

function UjianOnline() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs([]);
    const timers = [];
    mockLogs.forEach((log, index) => {
      const timer = setTimeout(() => {
        setLogs(prevLogs => [...prevLogs, log]);
      }, (index + 1) * 2000);
      timers.push(timer);
    });
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Parameter URL sudah dioptimalkan
  const videoSrc = "https://www.youtube.com/embed/yz2deaSLwlg?autoplay=1&mute=1&controls=0&loop=1&playlist=yz2deaSLwlg&modestbranding=1&rel=0";

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#ff623f] mb-2">Simulasi Ujian Online (AI Proctoring)</h2>
      <p className="text-neutral-600 mb-6">
        Modul ini mendeteksi perilaku integritas secara real-time.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* --- BLOK INI DIMODIFIKASI --- */}
        {/* Kontainer ini harus 'relative' dan 'overflow-hidden' */}
        <div className="lg:col-span-2 bg-black rounded-xl h-[300px] md:h-[450px] relative overflow-hidden">
          <iframe 
            src={videoSrc}
            title="Simulasi Umpan Video Webcam" 
            frameBorder="0" 
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            
            // --- INI ADALAH TRIKNYA ---
            // Kita membuat iframe lebih tinggi dan menggesernya ke atas
            // untuk memotong branding di atas dan di bawah.
            style={{
              position: 'absolute',
              // Geser ke atas 78px untuk menyembunyikan judul/tombol
              top: '-78px', 
              left: '0',
              width: '100%',
              // Buat tinggi 100% + 156px (78px atas + 78px bawah)
              height: 'calc(100% + 156px)', 
              zIndex: '1' 
            }}
            // --- AKHIR TRIK ---
          ></iframe>
          
          {/* DIV OVERLAY: Tetap ada untuk mencegah klik */}
          <div className="absolute top-0 left-0 w-full h-full bg-transparent z-10"></div>
        </div>
        {/* --- AKHIR BLOK MODIFIKASI --- */}


        <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 h-[300px] md:h-[450px] overflow-y-auto">
          <h3 className="mt-0 text-xl font-semibold text-[#ff623f] mb-4">Log Aktivitas Integritas</h3>
          <div className="flex flex-col gap-2">
            {logs.length === 0 && (
              <p className="text-neutral-600">Memulai pengawasan...</p>
            )}
            {logs.map((log, index) => (
              <div
                key={index}
                className={`flex items-start text-sm p-3 rounded-md ${
                  log.type === 'warning' ? 'font-semibold text-[#000000] bg-[#feaf0c]/20' : 'text-neutral-600'
                }`}
              >
                <span className="mr-3 text-lg mt-0.5">{log.icon}</span>
                <span>[{new Date().toLocaleTimeString('id-ID')}] {log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UjianOnline
