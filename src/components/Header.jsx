import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BsList, BsX } from 'react-icons/bs' // Impor ikon hamburger & close

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Kelas untuk tautan navigasi
  const activeClassName = "text-[#ff623f] bg-[#ff623f]/10";
  const inactiveClassName = "text-neutral-600 hover:text-[#ff623f] hover:bg-[#ff623f]/10";
  const linkBaseClass = "no-underline font-semibold p-2 rounded-md transition-all";
  
  // Fungsi untuk menutup menu saat tautan diklik (di seluler)
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  }

  // Komponen tautan untuk menghindari duplikasi
  const NavLinks = ({ mobile = false }) => (
    <div 
      className={
        mobile 
          ? "flex flex-col gap-4 items-center" // Tata letak seluler
          : "hidden md:flex gap-6" // Tata letak desktop
      }
    >
      <NavLink
        to="/"
        className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClassName : inactiveClassName}`}
        onClick={mobile ? handleLinkClick : undefined}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/verifikasi"
        className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClassName : inactiveClassName}`}
        onClick={mobile ? handleLinkClick : undefined}
      >
        Verifikasi Dokumen
      </NavLink>
      <NavLink
        to="/ujian"
        className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClassName : inactiveClassName}`}
        onClick={mobile ? handleLinkClick : undefined}
      >
        Ujian Online
      </NavLink>
      <NavLink
        to="/rekomendasi"
        className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClassName : inactiveClassName}`}
        onClick={mobile ? handleLinkClick : undefined}
      >
        Rekomendasi
      </NavLink>
    </div>
  );

  return (
    // Tambahkan 'relative' agar menu dropdown seluler bisa diposisikan
    <nav className="relative bg-[#ffffff] p-4 px-4 md:px-8 border-b-2 border-neutral-200 shadow-sm flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-[#ff623f] no-underline">
        ASN Mate
      </Link>

      {/* Menu Desktop */}
      <NavLinks />

      {/* Tombol Hamburger (hanya tampil di seluler) */}
      <button
        className="md:hidden text-3xl text-[#000000] z-20"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <BsX /> : <BsList />}
      </button>

      {/* Menu Seluler (Dropdown) */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[#ffffff] flex flex-col items-center justify-center gap-6 pt-20 z-10 md:hidden">
          <NavLinks mobile={true} />
        </div>
      )}
    </nav>
  )
}

export default Header