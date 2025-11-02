import React, { useState, useRef } from 'react'
import { BsUpload, BsCheckCircleFill, BsXCircleFill, BsClockFill } from 'react-icons/bs'
import Tesseract from 'tesseract.js';

function VerifikasiDokumen() {
  const [fileStatus, setFileStatus] = useState(null);
  const [fileName, setFileName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setImagePreview(URL.createObjectURL(file));
    setFileStatus('processing');
    setExtractedData(null); // Reset data sebelumnya

    try {
      const { data: { text } } = await Tesseract.recognize(file, 'ind', {
        logger: m => console.log(m) // Opsi untuk melihat progres di console
      });

      // ==========================================================
      // LOGIKA EKSTRAKSI DATA KTP MENGGUNAKAN REGEX YANG LEBIH BAIK
      // ==========================================================

      // Fungsi pembantu untuk membersihkan teks dan mengambil grup pertama
      const extractField = (regex, fullText) => {
        const match = fullText.match(regex);
        return match && match[1] ? match[1].replace(/\n/g, ' ').trim() : 'Tidak terdeteksi';
      };

      const data = {
        // NIK: Mencari "NIK" diikuti oleh 16 digit angka
        nik: extractField(/NIK\s*:?\s*(\d{16})/, text),

        // Nama: Mencari "Nama" diikuti oleh teks (huruf, spasi, titik, koma, apostrof)
        nama: extractField(/Nama\s*:?\s*([A-Za-z\s.,']+)/, text),

        // Tempat/Tgl Lahir: Mencari "Tempat/Tgl Lahir" diikuti oleh teks, koma, lalu tanggal
        tempatTglLahir: extractField(/Tempat\/Tgl Lahir\s*:?\s*([A-Za-z\s.,']+,\s*\d{2}-\d{2}-\d{4})/, text),
        
        // Jenis Kelamin: Mencari "Jenis Kelamin" lalu LAKI-LAKI atau PEREMPUAN
        jenisKelamin: extractField(/Jenis Kelamin\s*:?\s*(LAKI-LAKI|PEREMPUAN)/, text),

        // Alamat: Mencari "Alamat" lalu mengambil teks hingga RT/RW atau baris baru
        alamat: extractField(/Alamat\s*:?\s*([A-Za-z0-9\s.,'\/]+?)(?=\nRT\/RW|\nKel\/Desa|$)/s, text),

        // RT/RW: Mencari "RT/RW" diikuti oleh angka/garis miring
        rtRw: extractField(/RT\/RW\s*:?\s*(\d{3}\/\d{3})/, text),

        // Kel/Desa: Mencari "Kel/Desa" diikuti oleh teks
        kelDesa: extractField(/Kel\/Desa\s*:?\s*([A-Za-z\s.,']+)/, text),

        // Kecamatan: Mencari "Kecamatan" diikuti oleh teks
        kecamatan: extractField(/Kecamatan\s*:?\s*([A-Za-z\s.,']+)/, text),

        // Agama: Mencari "Agama" lalu nama agama (ISLAM, KRISTEN, dll.)
        agama: extractField(/Agama\s*:?\s*(ISLAM|KRISTEN|KATOLIK|HINDU|BUDHA|KONGHUCU)/i, text), // i = case-insensitive

        // Status Perkawinan: Mencari "Status Perkawinan" lalu status
        statusPerkawinan: extractField(/Status Perkawinan\s*:?\s*(BELUM KAWIN|KAWIN|CERAI HIDUP|CERAI MATI)/i, text),

        // Pekerjaan: Mencari "Pekerjaan" lalu mengambil teks (terkadang ada baris baru)
        pekerjaan: extractField(/Pekerjaan\s*:?\s*([A-Za-z0-9\s.,'\/\-]+)/, text),

        // Kewarganegaraan: Mencari "Kewarganegaraan" lalu WNI atau WNA
        kewarganegaraan: extractField(/Kewarganegaraan\s*:?\s*(WNI|WNA)/, text),
        
        // Berlaku Hingga: Mencari "Berlaku Hingga" lalu tanggal atau "SEUMUR HIDUP"
        berlakuHingga: extractField(/Berlaku Hingga\s*:?\s*(\d{2}-\d{2}-\d{4}|SEUMUR HIDUP)/i, text),

        fullText: text // Simpan semua teks jika perlu untuk debugging
      };

      setExtractedData(data);
      setFileStatus('success');

    } catch (error) {
      console.error("Error selama proses OCR:", error);
      setFileStatus('error');
    }
  };

  const baseResultCardClass = "flex items-center p-4 md:p-6 rounded-xl mt-6 border";

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#ff623f] mb-2">Modul Verifikasi Dokumen (AI OCR)</h2>
      <p className="text-neutral-600 mb-6">
        Unggah dokumen Anda (KTP, Ijazah, dll.) untuk diekstrak dan divalidasi secara otomatis.
      </p>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg"
      />

      <div
        onClick={handleFileClick}
        className="border-2 border-dashed border-neutral-300 rounded-xl p-8 md:p-12 text-center bg-gray-50 cursor-pointer transition-all hover:bg-gray-100 hover:border-[#feaf0c]"
      >
        <BsUpload className="text-4xl md:text-5xl text-[#feaf0c] mb-4 mx-auto" />
        <p className="text-base md:text-lg text-neutral-600 m-0">
          Klik atau Seret file ke sini untuk Mengunggah
        </p>
        <p className="text-sm text-neutral-400 m-0 mt-1">
          (Format: .jpg, .png)
        </p>
      </div>

      {imagePreview && (
        <div className="mt-6 flex flex-col items-center">
          <h4 className="text-lg font-semibold text-[#000000] mb-2">Pratinjau Dokumen:</h4>
          <img src={imagePreview} alt="Pratinjau Dokumen" className="rounded-xl border border-neutral-200 max-w-full md:max-w-md mx-auto shadow-md" />
        </div>
      )}

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
        <div className={`${baseResultCardClass} bg-green-600/10 border-green-600 flex-col items-start`}>
          <div className="flex items-center mb-4">
            <BsCheckCircleFill className="text-2xl md:text-3xl mr-4 md:mr-6 text-green-600" />
            <div>
              <strong className="text-[#000000]">{fileName}</strong>
              <p className="text-neutral-600 m-0 text-sm md:text-base">
                Verifikasi Sukses. Data berikut berhasil diekstrak:
              </p>
            </div>
          </div>
          
          {/* Tampilan Form Lengkap */}
          {extractedData && (
            <div className="text-sm bg-green-100/50 p-4 rounded-md w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <p className="m-0 col-span-2"><strong>NIK:</strong> {extractedData.nik}</p>
              <p className="m-0 col-span-2"><strong>Nama:</strong> {extractedData.nama}</p>
              <p className="m-0 col-span-2"><strong>Tempat/Tgl Lahir:</strong> {extractedData.tempatTglLahir}</p>
              <p className="m-0"><strong>Jenis Kelamin:</strong> {extractedData.jenisKelamin}</p>
              <p className="m-0"><strong>Agama:</strong> {extractedData.agama}</p>
              <p className="m-0 col-span-2"><strong>Alamat:</strong> {extractedData.alamat}</p>
              <p className="m-0"><strong>RT/RW:</strong> {extractedData.rtRw}</p>
              <p className="m-0"><strong>Kel/Desa:</strong> {extractedData.kelDesa}</p>
              <p className="m-0 col-span-2"><strong>Kecamatan:</strong> {extractedData.kecamatan}</p>
              <p className="m-0"><strong>Status Perkawinan:</strong> {extractedData.statusPerkawinan}</p>
              <p className="m-0"><strong>Pekerjaan:</strong> {extractedData.pekerjaan}</p>
              <p className="m-0 col-span-2"><strong>Kewarganegaraan:</strong> {extractedData.kewarganegaraan}</p>
              <p className="m-0 col-span-2"><strong>Berlaku Hingga:</strong> {extractedData.berlakuHingga}</p>
              
              {/* Optional: Tampilkan full text untuk debugging */}
              {/* <div className="col-span-2 mt-4 pt-4 border-t border-green-200">
                <h5 className="font-semibold mb-2">Teks Mentah Hasil OCR:</h5>
                <pre className="whitespace-pre-wrap text-xs bg-green-50 p-2 rounded">{extractedData.fullText}</pre>
              </div> */}
            </div>
          )}
        </div>
      )}

      {fileStatus === 'error' && (
        <div className={`${baseResultCardClass} bg-red-600/10 border-red-600`}>
          <BsXCircleFill className="text-2xl md:text-3xl mr-4 md:mr-6 text-red-600" />
          <div>
            <strong className="text-[#000000]">{fileName}</strong>
            <p className="text-neutral-600 m-0 text-sm md:text-base">
              Verifikasi Gagal. Gagal memproses gambar atau data tidak terdeteksi.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerifikasiDokumen
