import React, { useState, useEffect } from 'react'
import { BsCameraVideoFill, BsExclamationTriangleFill, BsShieldCheck } from 'react-icons/bs'

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

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#ff623f] mb-2">Simulasi Ujian Online (AI Proctoring)</h2>
      <p className="text-neutral-600 mb-6">
        Modul ini mendeteksi perilaku integritas secara real-time.
      </p>

      {/* Grid sudah responsif (lg:grid-cols-3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Tinggi video responsif */}
        <div className="lg:col-span-2 bg-black rounded-xl h-[300px] md:h-[450px] flex flex-col items-center justify-center text-center text-white p-4">
          <BsCameraVideoFill className="text-6xl text-gray-700" />
          <p className="text-gray-400 mt-4 text-lg">(Simulasi Umpan Video Webcam)</p>
          <span className="text-[#ff623f] font-semibold mt-2">Deteksi Real-time: ON</span>
        </div>

        {/* Tinggi log responsif */}
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