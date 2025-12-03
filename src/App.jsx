import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";

const reasons = [
  {
    id: 1,
    img: "/images/pilihan-terpercaya.png",
    title: "Pilihan Terpercaya",
    desc: (
      <>
        Dipercaya banyak customer dengan kurma Sukkari{" "}
        <span className="font-bold text-[#9A4234]">Nuran, Aldayfe,</span> dan{" "}
        <span className="font-bold text-[#9A4234]">Golden Valley</span>
      </>
    ),
  },
  {
    id: 2,
    img: "/images/garansi-kualitas.png",
    title: "Garansi Kualitas",
    desc: (
      <>
        Setiap langkah kami pastikan berkualitas, setiap kendala kami selesaikan{" "}
        <span className="font-bold text-[#9A4234]">bersama</span>
      </>
    ),
  },
  {
    id: 3,
    img: "/images/respon-cepat.png",
    title: "Respon Cepat",
    desc: (
      <>
        Dalam <span className="font-bold text-[#9A4234]">sehari</span>, pesanan
        diproses cepat dan segera dikirim
      </>
    ),
  },
];

const ReasonSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = React.useRef(null);

  // Auto slide for tablet only
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        handleNext();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const scrollToSlide = (index) => {
    if (sliderRef.current) {
      // Calculate scroll position based on card width + gap
      // Assuming card is centered, we scroll to its position
      const container = sliderRef.current;
      const cards = container.children;
      if (cards[index]) {
        const card = cards[index];
        const containerCenter = container.offsetWidth / 2;
        const cardCenter = card.offsetWidth / 2;
        const scrollLeft = card.offsetLeft - containerCenter + cardCenter;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
        setActiveIndex(index);
      }
    }
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % reasons.length;
    scrollToSlide(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + reasons.length) % reasons.length;
    scrollToSlide(prevIndex);
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const scrollCenter = container.scrollLeft + container.offsetWidth / 2;

      // Find which card is closest to center
      const cards = Array.from(container.children);
      let closestIndex = activeIndex;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(scrollCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    }
  };

  return (
    <section
      id="why-us"
      className="py-16 md:py-24 bg-[#15723D] transition-all duration-500 scroll-mt-12 md:scroll-mt-16 min-h-screen flex flex-col justify-center"
    >
      <div
        className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16"
        data-aos="fade-up"
      >
        {/* Section Title */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Alasan Memilih Kami?
          </h2>
          <p className="text-white/90 text-xl md:text-3xl mb-8">
            Pelanggan adalah prioritas kami
          </p>

          {/* Controls for Tablet Only */}
          <div className="hidden md:flex lg:hidden items-center justify-center gap-8 mb-8">
            {/* Dots */}
            <div className="flex gap-2">
              {reasons.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "bg-white w-8" : "bg-white/40 w-2"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white/10 transition"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white/10 transition"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Slider Container (Tablet) & Grid (Desktop) & Stack (Mobile) */}
        <div className="relative">
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex flex-col md:flex-row lg:grid lg:grid-cols-3 gap-6 md:gap-8 md:overflow-x-auto md:snap-x md:snap-mandatory md:scroll-smooth md:no-scrollbar pb-8 lg:pb-0 md:px-[20%] lg:px-0"
          >
            {reasons.map((item) => (
              <div
                key={item.id}
                className="w-full md:min-w-full lg:min-w-0 md:snap-center bg-[#FFF6F2] rounded-br-[3rem] overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 flex flex-col min-h-[542px]"
              >
                <div className="h-[300px] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="py-8 px-6 flex-1 flex flex-col items-center text-center">
                  <h3 className="text-[35px] font-bold text-[#9A4234] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[#9A4234] text-2xl leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // null | 'submitting' | 'success' | 'error'

  // Scroll listener for navbar background
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize AOS for scroll animations
  React.useEffect(() => {
    AOS.init({
      once: false,
      mirror: true, // Allow animation to trigger when scrolling back up
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactClick = () => {
    setIsMenuOpen(false);
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check rate limit (2 submissions per 24 hours)
    const submissionHistory = JSON.parse(
      localStorage.getItem("submissionHistory") || "[]"
    );
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const now = Date.now();

    // Filter submissions from the last 24 hours
    const recentSubmissions = submissionHistory.filter(
      (timestamp) => now - timestamp < twentyFourHours
    );

    if (recentSubmissions.length >= 2) {
      setFormStatus("rate-limited");
      e.target.reset();
      setTimeout(() => setFormStatus(null), 5000);
      return;
    }

    setFormStatus("submitting");

    // Get credentials from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      // Send form directly using emailjs.sendForm
      // This automatically collects all input values from the form reference
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        e.target,
        publicKey
      );

      if (result.text === "OK") {
        setFormStatus("success");

        // Update submission history
        const updatedHistory = [...recentSubmissions, now];
        localStorage.setItem(
          "submissionHistory",
          JSON.stringify(updatedHistory)
        );

        e.target.reset();
        setTimeout(() => setFormStatus(null), 5000); // Hide after 5 seconds
      } else {
        setFormStatus("error");
        console.error("EmailJS Error:", result.text);
      }
    } catch (error) {
      setFormStatus("error");
      console.error("EmailJS Error:", error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Notification Toast */}
      {formStatus === "success" && (
        <div className="fixed top-24 right-6 z-[10000] bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 animate-fade-in-down">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <div>
            <h4 className="font-bold">Berhasil!</h4>
            <p className="text-sm">Pesan anda telah terkirim.</p>
          </div>
        </div>
      )}

      {formStatus === "error" && (
        <div className="fixed top-24 right-6 z-[10000] bg-red-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 animate-fade-in-down">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div>
            <h4 className="font-bold">Gagal!</h4>
            <p className="text-sm">Terjadi kesalahan, silakan coba lagi.</p>
          </div>
        </div>
      )}

      {formStatus === "rate-limited" && (
        <div className="fixed top-24 right-6 z-[10000] bg-yellow-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 animate-fade-in-down">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="font-bold">Mohon Maaf</h4>
            <p className="text-sm">
              Anda sudah mengirim pesan hari ini. Silakan coba lagi besok.
            </p>
          </div>
        </div>
      )}
      {/* Navbar - Transparan di atas, Putih saat di-scroll */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-0" : "bg-transparent py-2"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 ${
            isMenuOpen ? "" : isScrolled ? "" : "border-b border-[#414651]"
          } lg:border-b-0 transition-all duration-300`}
        >
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo - Kiri */}
            <a href="#" onClick={handleLogoClick} className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Fattah Logo"
                className="h-7 md:h-10 lg:h-12 w-auto object-contain"
              />
            </a>

            {/* Menu Desktop - Tengah (hanya di desktop) */}
            <nav className="hidden lg:flex gap-8 items-center">
              <a
                href="#why-us"
                onClick={(e) => handleNavClick(e, "why-us")}
                className="text-[#15723D] hover:text-green-400 transition text-xl xl:text-2xl font-medium"
              >
                Kenapa Kami
              </a>
              <a
                href="#brands"
                onClick={(e) => handleNavClick(e, "brands")}
                className="text-[#15723D] hover:text-green-400 transition text-xl xl:text-2xl font-medium"
              >
                Brands Tersedia
              </a>
              <a
                href="#quality"
                onClick={(e) => handleNavClick(e, "quality")}
                className="text-[#15723D] hover:text-green-400 transition text-xl xl:text-2xl font-medium"
              >
                Kualitas Storage
              </a>
            </nav>

            {/* Button Kontak Kami - Kanan (hanya di desktop) */}
            <div className="hidden lg:block">
              <button
                onClick={handleContactClick}
                className="text-[#15723D] text-xl xl:text-2xl font-medium px-5 xl:px-6 py-2 border border-[#15723D] rounded transition transform hover:scale-105"
              >
                Kontak Kami
              </button>
            </div>

            {/* Menu Burger untuk Tablet & Mobile */}
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-7 h-7 md:w-8 md:h-8"
                fill="none"
                stroke="#15723D"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Mobile & Tablet Menu */}
          {isMenuOpen && (
            <div className="lg:hidden fixed left-0 right-0 top-16 bg-[#FFF6F2] backdrop-blur-sm p-4 md:p-6">
              <a
                href="#why-us"
                className="block text-[#15723D] hover:text-green-400 py-3 md:py-4 font-medium text-xl md:text-2xl"
                onClick={(e) => handleNavClick(e, "why-us")}
              >
                Kenapa Kami
              </a>
              <a
                href="#brands"
                className="block text-[#15723D] hover:text-green-400 py-3 md:py-4 font-medium text-xl md:text-2xl"
                onClick={(e) => handleNavClick(e, "brands")}
              >
                Brands Tersedia
              </a>
              <a
                href="#quality"
                className="block text-[#15723D] hover:text-green-400 py-3 md:py-4 font-medium text-xl md:text-2xl"
                onClick={(e) => handleNavClick(e, "quality")}
              >
                Kualitas Storage
              </a>
              <button
                className="w-full bg-[#15723D] hover:bg-[#115A30] text-white px-6 py-3 md:py-4 rounded-lg font-semibold transition mt-4 text-xl md:text-2xl"
                onClick={handleContactClick}
              >
                Kontak Kami
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section Full Screen - Disesuaikan untuk mobile dan tablet lebih ke atas */}
      <section
        id="home"
        className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-12 md:pt-14 lg:pt-20"
      >
        {/* Background Image dengan custom position untuk hp, tablet, dan desktop */}
        <img
          src="/images/hero.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover object-[15%_bottom] md:object-[20%_bottom] lg:object-center"
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0"></div>

        {/* Content - Dinaikkan posisinya untuk mobile dan tablet dengan margin tambahan di tablet */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-8 flex items-center justify-center h-full"
          data-aos="fade-up"
        >
          <div className="text-center max-w-2xl md:max-w-3xl lg:max-w-3xl -mt-8 md:-mt-10 lg:mt-0">
            {/* Tagline - Diperkecil untuk desktop */}
            <p className="text-lg md:text-3xl lg:text-lg xl:text-xl font-medium text-[#226A38] mb-4 md:mb-6">
              Bersama <span className="font-bold">Fattah</span>
            </p>

            {/* Heading - Diperkecil untuk desktop */}
            <h1 className="text-4xl md:text-6xl lg:text-4xl xl:text-5xl font-bold mb-6 md:mb-8 leading-tight text-[#226A38]">
              <span className="block">Dapatkan kurma terbaik</span>
              <span className="block">dengan harga termurah</span>
            </h1>

            {/* Button - Diperkecil untuk desktop */}
            <a
              href="https://wa.me/6288805599004"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#226A38] hover:bg-[#1B552E] text-white px-8 md:px-14 py-2 md:py-4 rounded-md font-semibold text-lg md:text-3xl lg:text-lg xl:text-xl transition transform hover:scale-105 shadow-lg mb-10 md:mb-8 inline-block"
            >
              WA kami
            </a>

            {/* Promo Text - Diperkecil untuk desktop */}
            <p className="text-base md:text-2xl lg:text-base xl:text-lg text-[#226A38] font-medium">
              Satu box <span className="font-bold">GRATIS</span> untuk <br />
              pesanan pertama
            </p>
          </div>
        </div>
      </section>

      {/* Alasan Memilih Kami Section */}
      <ReasonSection />

      {/* Brands Section */}
      <section
        id="brands"
        className="min-h-screen flex flex-col justify-center py-16 md:py-24 bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat scroll-mt-12 md:scroll-mt-16"
      >
        <div
          className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16"
          data-aos="fade-up"
        >
          {/* Section Title */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl  font-bold text-[#226A38] mb-3">
              Brands Tersedia
            </h2>
            <p className="text-xl sm:text-3xl text-[#226A38]/80">
              Brands terbaik untuk bisnis anda
            </p>
          </div>

          {/* Brands Grid - 1 gambar full width di atas, 2 gambar di bawah */}
          <div className="flex flex-col gap-6 lg:gap-6 min-h-[600px] lg:min-h-[700px]">
            {/* Gambar pertama full width */}
            <div className="w-full h-[350px] lg:h-[450px] overflow-hidden ">
              <img
                src="/images/product1.png"
                alt="ALDAYFE Brand"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            {/* Grid untuk 2 gambar di bawah - sebelah kiri lebih kecil */}
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-5">
              <div className="lg:col-span-1 h-[300px] lg:h-[350px] overflow-hidden  bg-white">
                <img
                  src="/images/product2.png"
                  alt="Golden Valley Brand"
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
              <div className="lg:col-span-2 h-[300px] lg:h-[350px] overflow-hidden  bg-white">
                <img
                  src="/images/product3.jpg"
                  alt="Nuran Brand"
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Storage Section */}
      <section
        id="quality"
        className="min-h-screen flex flex-col justify-center py-16 md:py-24 bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat scroll-mt-12 md:scroll-mt-16"
      >
        <div
          className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16"
          data-aos="fade-up"
        >
          {/* Mobile/Tablet Title (Visible < lg) */}
          <h2 className="lg:hidden text-2xl sm:text-3xl md:text-4xl font-bold text-[#15723D] mb-6 text-center">
            Kualitas Storage
          </h2>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-6 order-2 lg:order-none">
              <h2 className="hidden lg:block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#15723D] mb-6">
                Kualitas Storage
              </h2>
              <p className="leading-relaxed md:text-2xl lg:text-2xl text-[#226A38] text-justify">
                Produk kami disimpan pada <strong>suhu -20°C</strong> untuk
                menjaga kualitas dan kesegarannya tetap maksimal. Suhu dingin
                ini membantu mempertahankan <strong>cita rasa, tekstur </strong>
                , dan <strong>aroma produk </strong> seperti saat baru dibuat.
                Kami juga menjaga suhu -20°C tersebut secara konsisten, mulai
                dari proses penyimpanan, selama pengiriman, hingga produk
                diterima oleh <strong>pelanggan</strong>.
              </p>

              <div className="flex justify-center lg:justify-start">
                <button className="bg-[#15723D] hover:bg-[#0F5329] text-white px-8 py-3 rounded-md font-semibold transition transform hover:scale-105 shadow-md mt-4">
                  Hubungi kami
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative order-1 lg:order-none">
              <div className="bg-[#15723D]/10 rounded-lg md:aspect-[4/3] lg:aspect-[3.7/4] flex items-center justify-center overflow-hidden">
                <img
                  src="/images/storage.png"
                  alt="Storage Facility Image"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  section importir resmi  */}
      <section
        id="importir"
        className="min-h-screen bg-[url('/images/import.png')] bg-cover bg-center bg-no-repeat py-16 md:py-24 flex items-center"
      >
        <div
          className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 w-full"
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Title */}
            <div className="text-white text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl lg:text-4xl font-bold leading-tight">
                Importir Resmi
              </h2>
            </div>

            {/* Right Side - Description */}
            <div className="text-white">
              <p className="text-xl md:text-4xl lg:text-3xl leading-relaxed text-justify font-medium">
                Kami Adalah Importir Resmi Yang Menghadirkan Produk Pilihan Dari
                Timur Tengah Dengan Sistem Logistik Yang Terintegrasi Dan
                Layanan Distribusi Efisien, Kami Siap Menjadi Mitra Bisnis Anda
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen bg-[#E8E8E8] py-16 md:py-24 flex items-center scroll-mt-12 md:scroll-mt-12"
      >
        <div
          className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 w-full"
          data-aos="fade-up"
        >
          {/* Section Title */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#15723D] mb-3">
              Kontak Kami
            </h2>
            <p className="text-xl md:text-3xl text-[#15723D]/70">
              Siap menjadi mitra bisnis anda
            </p>
          </div>

          {/* Contact Content - Overlapping Layout */}
          <div className="relative max-w-5xl mx-auto">
            {/* Form Section - Left Side (Behind) */}
            <div className="relative z-10 bg-[#15723D] p-6 md:p-8 lg:p-12 rounded-lg shadow-xl lg:w-[92%]">
              <form onSubmit={handleSubmit} className="space-y-4 lg:pr-[20%]">
                {/* EmailJS Form */}

                {/* Name and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="nama"
                    placeholder="Nama"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                  />
                  <input
                    type="tel"
                    name="telepon"
                    placeholder="Nomor Telepon"
                    required
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                  />
                </div>

                {/* Store Name */}
                <input
                  type="text"
                  name="nama_toko"
                  placeholder="Nama Toko"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                />

                {/* Store Location */}
                <textarea
                  name="lokasi_toko"
                  placeholder="Lokasi Toko"
                  rows="6"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none text-sm"
                ></textarea>

                {/* Submit Button */}
                <div className="flex justify-center md:justify-start">
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="bg-white text-[#15723D] px-10 py-3 rounded-xl font-semibold hover:bg-gray-50 transition transform hover:scale-105 shadow-md text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus === "submitting" ? "Mengirim..." : "Kirim"}
                  </button>
                </div>
              </form>
            </div>

            {/* Info Section - Right Side (On Top) */}
            <div className="relative lg:absolute lg:right-[-3%] lg:top-[6%] lg:w-[30%] z-10 bg-[#15723D] border-white border-1  p-8 md:p-10 rounded-lg  shadow-2xl text-white mt-8 lg:mt-0">
              <h3 className="text-sm md:text-xl lg:text-base font-semibold mb-8 leading-relaxed">
                Have questions? Our team is ready to help you
              </h3>

              <div className="flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-[1fr_auto] md:gap-x-8 md:gap-y-6 lg:flex lg:flex-col lg:space-y-2 lg:gap-0">
                {/* Phone - Order 1 on Tablet */}
                <div className="flex items-center gap-3 md:col-start-1 md:order-1 lg:order-none lg:col-start-auto">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img
                      src="/images/phone-icon.png"
                      alt="Phone"
                      className="w-8 h-8 object-contain brightness-0 invert"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-xl lg:text-lg">Nomor</p>
                    <p className="text-white/90 text-xl lg:text-lg leading-tight">
                      088805599004
                    </p>
                  </div>
                </div>

                {/* Email - Order 2 on Tablet (Below Phone) */}
                <div className="flex items-center gap-3 md:col-start-1 md:order-2 lg:order-none lg:col-start-auto">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img
                      src="/images/Email.png"
                      alt="Email"
                      className="w-8 h-8 object-contain brightness-0 invert"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-xl lg:text-lg">Email:</p>
                    <p className="text-white/90 text-xl lg:text-lg leading-tight">
                      info@fattah.co.id
                    </p>
                  </div>
                </div>

                {/* Address - Order 3 on Tablet (Below Email) */}
                <div className="flex items-center gap-3 md:col-start-1 md:order-3 lg:order-none lg:col-start-auto">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img
                      src="/images/Address.png"
                      alt="Address"
                      className="w-8 h-8 object-contain brightness-0 invert"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-xl lg:text-lg">Address:</p>
                    <p className="text-white/90 text-xl lg:text-lg leading-tight">
                      Jawa Timur -
                      <br />
                      Surabaya, Indonesia
                    </p>
                  </div>
                </div>

                {/* Social Media - Order 4 on Tablet (Right Column, Spanning Top 2 Rows) */}
                <div className="flex gap-2.5 mt-8 pt-2 justify-center md:flex-col  md:mt-0 md:pt-0 md:gap-2 md:items-center md:col-start-2 md:row-start-1 md:row-span-2 md:order-4 lg:flex-row lg:gap-1 lg:mt-4 lg:pt-2 lg:justify-center lg:order-none lg:row-span-1 lg:col-start-auto lg:row-start-auto">
                  <a
                    href="#"
                    className="w-9 h-9  hover:bg-white/30 rounded-lg flex items-center justify-center transition"
                    aria-label="LinkedIn"
                  >
                    <img
                      src="/images/LinkedIn.png"
                      alt="Instagram"
                      className="w-12 h-12 object-contain brightness-0 invert"
                    />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 hover:bg-white/30 rounded-lg flex items-center justify-center transition"
                    aria-label="Instagram"
                  >
                    <img
                      src="/images/instagram-icon.png"
                      alt="Instagram"
                      className="w-12 h-12 object-contain brightness-0 invert"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#15723D] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:grid-cols-4 lg:gap-16">
            {/* Company Info - paling bawah di mobile & tablet, tetap center */}
            <div
              className="order-last md:order-last md:col-span-3 text-center md:flex md:flex-col md:items-center lg:order-first lg:col-span-1 lg:flex lg:flex-col lg:items-center lg:justify-center"
              data-aos="fade-up"
            >
              <a
                href="#home"
                onClick={handleLogoClick}
                className="flex flex-col items-center"
              >
                <img
                  src="/images/logo.png"
                  alt="Fattah Logo"
                  className="h-16 w-auto object-contain mb-4 brightness-0 invert"
                />
                <p className="text-white/80 text-xl leading-relaxed whitespace-nowrap">
                  PT. Pattah Niaga Mandiri
                </p>
              </a>
            </div>

            {/* Quick Links */}
            <div
              className="order-1 lg:order-none text-left md:flex md:flex-col md:items-center lg:block lg:items-start"
              data-aos="fade-up"
            >
              <h3 className="font-bold text-xl mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-base">
                <li>
                  <a
                    href="#why-us"
                    className="text-white/80 hover:text-white transition cursor-pointer"
                  >
                    Kenapa Kami
                  </a>
                </li>
                <li>
                  <a
                    href="#brands"
                    className="text-white/80 hover:text-white transition"
                  >
                    Produk Kami
                  </a>
                </li>
                <li>
                  <a
                    href="#quality"
                    className="text-white/80 hover:text-white transition"
                  >
                    Kualitas Storage
                  </a>
                </li>
                <li>
                  <a
                    href="#importir"
                    className="text-white/80 hover:text-white transition"
                  >
                    Import Resmi
                  </a>
                </li>
              </ul>
            </div>

            <div
              className="order-2 lg:order-none text-left md:flex md:flex-col md:items-center lg:block lg:items-start lg:pl-8"
              data-aos="fade-up"
            >
              <h3 className="font-bold text-xl mb-4">Media Sosial</h3>
              <ul className="space-y-2 text-base">
                <li>
                  <a
                    href="#why-us"
                    className="text-white/80 hover:text-white transition cursor-pointer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#brands"
                    className="text-white/80 hover:text-white transition"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div
              className="order-3 lg:order-none text-left md:flex md:flex-col md:items-center lg:block lg:items-start lg:pl-8"
              data-aos="fade-up"
            >
              <h3 className="font-bold text-xl mb-4">Contact</h3>
              <ul className="space-y-3 text-base">
                <li>
                  <a
                    href="#contact"
                    className="text-white/80 hover:text-white transition"
                  >
                    Kontak Kami
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
