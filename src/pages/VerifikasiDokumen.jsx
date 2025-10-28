import React, { useState } from 'react'
import { BsUpload, BsCheckCircleFill, BsXCircleFill, BsClockFill } from 'react-icons/bs'

function VerifikasiDokumen() {
  const [fileStatus, setFileStatus] = useState(null); 
  const [fileName, setFileName] = useState('');

  const handleFileUpload = () => {
    setFileName('KTP_Pelamar.jpg');
    setFileStatus('processing');
    
    setTimeout(() => {
      setFileStatus('error');
    }, 2500);
  };

  const baseResultCardClass = "flex items-center p-4 md:p-6 rounded-xl mt-6 border";

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#ff623f] mb-2">Modul Verifikasi Dokumen (AI OCR)</h2>
      <p className="text-neutral-600 mb-6">
        Unggah dokumen Anda (KTP, Ijazah, dll.) untuk diekstrak dan divalidasi secara otomatis.
      </p>
      
      <div
        onClick={handleFileUpload}
        // Padding responsif: p-8 di seluler, md:p-12 di layar lebih besar
        className="border-2 border-dashed border-neutral-300 rounded-xl p-8 md:p-12 text-center bg-gray-50 cursor-pointer transition-all hover:bg-gray-100 hover:border-[#feaf0c]"
      >
        <BsUpload className="text-4xl md:text-5xl text-[#feaf0c] mb-4 mx-auto" />
        <p className="text-base md:text-lg text-neutral-600 m-0">
          Klik atau Seret file ke sini untuk Mengunggah
        </p>
      </div>

      {fileStatus === 'processing' && (
        <div className={`${baseResultCardClass} bg-[#feaf0c]/10 border-[#feaf0c]`}>
          <BsClockFill className="text-2xl md:text-3xl mr-4 md:mr-6 text-[#feaf0c]" />
          <div>
            <strong className="text-[#000000]">{fileName}</strong>
            <p className="text-neutral-600 m-0 text-sm md:text-base">
              Sedang diproses... Pipeline AI sedang mengekstrak teks...
            </p>
          </div>
        </div>
      )}

      {fileStatus === 'success' && (
        <div className={`${baseResultCardClass} bg-green-600/10 border-green-600`}>
          <BsCheckCircleFill className="text-2xl md:text-3xl mr-4 md:mr-6 text-green-600" />
          <div>
            <strong className="text-[#000000]">{fileName}</strong>
            <p className="text-neutral-600 m-0 text-sm md:text-base">
              Verifikasi Sukses. NIK, Nama, dan Tanggal Lahir berhasil divalidasi.
            </p>
          </div>
        </div>
      )}

      {fileStatus === 'error' && (
        <div className={`${baseResultCardClass} bg-red-600/10 border-red-600`}>
          <BsXCircleFill className="text-2xl md:text-3xl mr-4 md:mr-6 text-red-600" />
          <div>
            <strong className="text-[#000000]">{fileName}</strong>
            <p className="text-neutral-600 m-0 text-sm md:text-base">
              Verifikasi Gagal. Model Quality Classifier mendeteksi foto buram. Harap unggah ulang.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerifikasiDokumen