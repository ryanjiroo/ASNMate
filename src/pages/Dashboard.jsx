import React from 'react'
import { Link } from 'react-router-dom'
import { BsCardChecklist, BsCameraVideo, BsLightbulb } from 'react-icons/bs'

function Dashboard() {
  return (
    <>
      <div className="text-center py-4 md:py-8 mb-8">
        {/* Ukuran font responsif */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#ff623f] mb-2">
          Selamat Datang di ASN Mate
        </h1>
        <p className="text-base md:text-lg text-neutral-600">
          Ekosistem Seleksi ASN Cerdas, Objektif, dan Terpadu
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kartu-kartu ini sudah responsif karena grid-cols-1 md:grid-cols-3 */}
        <Link
          to="/verifikasi"
          className="block bg-neutral-50 border border-neutral-200 border-l-4 border-l-[#feaf0c] rounded-xl p-6 no-underline text-[#000000] shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <BsCardChecklist className="text-3xl text-[#feaf0c] mb-4" />
          <h3 className="mt-0 text-xl font-semibold text-[#ff623f]">AI OCR Validator</h3>
          <p className="text-neutral-600">
            Unggah dan verifikasi dokumen pendaftaran Anda secara otomatis.
          </p>
        </Link>

        <Link
          to="/ujian"
          className="block bg-neutral-50 border border-neutral-200 border-l-4 border-l-[#feaf0c] rounded-xl p-6 no-underline text-[#000000] shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <BsCameraVideo className="text-3xl text-[#feaf0c] mb-4" />
          <h3 className="mt-0 text-xl font-semibold text-[#ff623f]">AI Proctoring</h3>
          <p className="text-neutral-600">
            Ikuti simulasi ujian online dengan pengawasan integritas berbasis AI.
          </p>
        </Link>

        <Link
          to="/rekomendasi"
          className="block bg-neutral-50 border border-neutral-200 border-l-4 border-l-[#feaf0c] rounded-xl p-6 no-underline text-[#000000] shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <BsLightbulb className="text-3xl text-[#feaf0c] mb-4" />
          <h3 className="mt-0 text-xl font-semibold text-[#ff623f]">Recommender Engine</h3>
          <p className="text-neutral-600">
            Temukan formasi jabatan yang paling sesuai dengan kualifikasi Anda.
          </p>
        </Link>
      </div>
    </>
  )
}

export default Dashboard