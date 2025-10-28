import React from 'react'
import { BsBarChartFill, BsCheck2Circle } from 'react-icons/bs'

const recommendations = [
  {
    title: 'Analis Kebijakan Ahli Pertama',
    location: 'Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi',
    score: 92,
    reasons: [
      'Kecocokan tinggi pada hasil asesmen (Skor 88)',
      'Latar belakang pendidikan (S1 Administrasi Publik)',
    ]
  },
  {
    title: 'Pranata Komputer (Data Scientist)',
    location: 'Badan Pusat Statistik',
    score: 85,
    reasons: [
      'Kecocokan tinggi pada kompetensi teknis (Python, SQL)',
      'Latar belakang pendidikan (S1 Teknik Informatika)',
    ]
  },
];

function Rekomendasi() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#ff623f] mb-2">Rekomendasi Formasi (Recommender Engine)</h2>
      <p className="text-neutral-600 mb-6">
        Berdasarkan profil, kompetensi, dan hasil asesmen Anda.
      </p>

      <div className="flex flex-col gap-6">
        {recommendations.map((job, index) => (
          <div 
            key={index}
            className="bg-[#ffffff] border border-neutral-200 rounded-xl p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Grid dibuat responsif (md:grid-cols-3) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
              <div className="md:col-span-2">
                <h3 className="mt-0 mb-1 text-xl font-semibold text-[#ff623f]">{job.title}</h3>
                <p className="text-neutral-600 font-semibold text-sm">{job.location}</p>
              </div>
              
              {/* Skor: teks kiri di seluler, teks kanan di desktop */}
              <div className="text-left md:text-right">
                {/* Ukuran font skor responsif */}
                <div className="text-4xl md:text-5xl font-bold text-[#ff623f]">{job.score}%</div>
                <div className="text-sm text-neutral-600">Tingkat Kecocokan</div>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-lg p-4 mt-6">
              <h4 className="text-[#000000] mt-0 mb-3 flex items-center font-semibold">
                <BsBarChartFill className="mr-2 text-[#feaf0c]" />
                Alasan Rekomendasi (Explainability)
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {job.reasons.map((reason, i) => (
                  <li key={i} className="flex items-center text-sm text-neutral-600">
                    <BsCheck2Circle className="text-green-600 mr-2 flex-shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Rekomendasi