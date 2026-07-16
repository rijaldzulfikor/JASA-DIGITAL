"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

const services = [
  {
    title: "Website Profesional",
    description:
      "Website modern yang siap tampil di desktop dan mobile, lengkap dengan optimasi performa dan UI visual yang elegan.",
  },
  {
    title: "Desain Brand & Konten",
    description:
      "Logo, identitas visual, banner sosial media, preview produk, dan materi pemasaran dengan sentuhan premium.",
  },
  {
    title: "Landing Page Konversi",
    description:
      "Halaman promo, paket layanan, atau event dengan tata letak 3D, CTA kuat, dan pengalaman yang menggugah.",
  },
];

const portfolio = [
  {
    title: "Studio Coffee",
    category: "Website Brand",
    highlight: "Tampilan mewah, animasi smooth, konversi tinggi.",
  },
  {
    title: "Agency Pixel",
    category: "Desain Grafis",
    highlight: "Identitas visual berkelas untuk agensi digital.",
  },
  {
    title: "Marketplace Craft",
    category: "E-commerce",
    highlight: "User journey pintar dan mekanik pesan yang jelas.",
  },
];

const clients = [
  "KopiLokal",
  "PixelAgency",
  "CraftMart",
  "StudioID",
  "Breeze",
];

const aboutPoints = [
  {
    title: "Proses Cepat",
    description: "Brief, desain, dan revisi yang cepat agar bisnis Anda bisa online tanpa menunggu lama.",
  },
  {
    title: "Desain Premium",
    description: "Fokus pada estetika brand dan pengalaman pengguna dengan sentuhan professional.",
  },
  {
    title: "Pendampingan Penuh",
    description: "Dukungan mulai dari konsep hingga final release, termasuk tips konten dan optimasi.",
  },
];

const testimonials = [
  {
    name: "Nadia",
    role: "Founder @KopiLokal",
    feedback:
      "Desainnya rapi, prosesnya mudah, dan website kami langsung mendapat respon pelanggan baru.",
  },
  {
    name: "Rian",
    role: "Marketing Lead",
    feedback:
      "Brand kit dan konten visual membuat materi promosi kami terlihat jauh lebih meyakinkan.",
  },
];

const faqs = [
  {
    question: "Berapa lama waktu pengerjaan?",
    answer: "Biasanya 2–3 minggu untuk paket website + desain, tergantung kebutuhan dan revisi.",
  },
  {
    question: "Apakah bisa revisi desain?",
    answer: "Ya, setiap paket sudah termasuk revisi agar hasil akhir sesuai ekspektasi.",
  },
  {
    question: "Apakah ada dukungan purna jual?",
    answer: "Kami menyediakan panduan penggunaan dan dukungan ringan setelah proyek selesai.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Rp3.500.000",
    description: "Website landing page profesional dengan optimasi mobile dan konten dasar.",
    perks: ["Desain responsif", "3 revisi", "Form kontak & email"],
  },
  {
    name: "Pro",
    price: "Rp7.500.000",
    description: "Website brand + konten visual profesional, lengkap dengan strategi tampilan.",
    perks: ["Brand identity", "Animasi ringan", "Hosting-ready"],
  },
  {
    name: "Custom",
    price: "Mulai dari Rp12.000.000",
    description: "Solusi custom untuk e-commerce, platform, atau brand experience interaktif.",
    perks: ["UI/UX premium", "3D asset visual", "Integrasi lanjutan"],
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Website",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const toggleFaq = (index: number) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const initialTheme = storedTheme === "light" ? "light" : "dark";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-light", theme === "light");
    document.documentElement.classList.toggle("theme-dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!revealElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || "Gagal mengirim permintaan. Silakan coba lagi.");
      }

      setFormStatus({ type: "success", message: "Permintaan terkirim. Kami akan menghubungi Anda segera." });
      setFormData({ name: "", email: "", service: "Website", message: "" });
    } catch (error) {
      setFormStatus({ type: "error", message: error instanceof Error ? error.message : "Terjadi kesalahan." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_45%)]" />
      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 -translate-x-1/3 rounded-full bg-cyan-500/10 blur-3xl" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-300/20">
              <span className="text-lg">JD</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Jasa Digital</p>
              <p className="text-xs text-slate-400">Web & Desain 3D</p>
            </div>
          </div>
          <nav className="hidden items-center gap-10 text-sm text-slate-300 lg:flex">
            <a href="#services" className="transition hover:text-white">Layanan</a>
            <a href="#portfolio" className="transition hover:text-white">Portofolio</a>
            <a href="#testimonials" className="transition hover:text-white">Testimonial</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
            <a href="#booking" className="transition hover:text-white">Booking</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="hidden rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 lg:inline-flex"
            >
              Pesan Sekarang
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden rounded-full border border-slate-700/80 bg-slate-900/90 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-white lg:inline-flex"
              aria-label="Ganti mode tampilan"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/90 px-4 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-white lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label="Buka menu navigasi"
            >
              {menuOpen ? "Tutup" : "Menu"}
            </button>
          </div>
        </div>

        <div
          className={
            menuOpen
              ? "lg:hidden animate-menu-slide border-t border-white/10 bg-slate-950/95"
              : "hidden lg:hidden"
          }
        >
          <div className="mx-auto max-w-7xl px-6 py-4 sm:px-10">
            <nav className="flex flex-col gap-3 text-sm text-slate-300">
              {[
                ["Layanan", "#services"],
                ["Portofolio", "#portfolio"],
                ["Testimonial", "#testimonials"],
                ["FAQ", "#faq"],
                ["Booking", "#booking"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-3xl border border-slate-800/80 bg-slate-900/90 px-5 py-3 transition hover:bg-slate-800 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <section data-reveal className="reveal reveal-visible relative mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold tracking-[0.24em] text-cyan-200 backdrop-blur-md">
              Platform Pemesanan Jasa Web & Desain
            </span>
            <div className="space-y-5">
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Solusi elegan untuk pemesanan website dan desain grafis yang berkelas.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Bangun identitas digital yang meyakinkan, dengan pengalaman pesan yang cepat, desain 3D, dan langkah kerja transparan.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#booking"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_20px_60px_-25px_rgba(34,211,238,0.45)]"
              >
                Pesan Sekarang
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 px-7 py-3 text-sm font-semibold text-slate-100 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-slate-900 hover:text-white"
              >
                Lihat Portofolio
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-800/80 bg-slate-900/85 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.6)]">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Proyek custom</p>
                <p className="mt-3 text-3xl font-semibold text-white">3D visual & brand impact</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-800/80 bg-slate-900/85 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.55)]">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Dukungan</p>
                <p className="mt-3 text-3xl font-semibold text-white">Konsultasi dan revisi mudah</p>
              </div>
            </div>              <div className="mt-10 flex flex-wrap items-center gap-3">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Trusted by</p>
                {clients.map((client) => (
                  <span
                    key={client}
                    className="rounded-full border border-slate-800/80 bg-slate-900/80 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400/60 hover:text-white"
                  >
                    {client}
                  </span>
                ))}
              </div>          </div>

          <div className="relative">
            <div className="hero-3d-orb absolute -right-14 top-10 hidden sm:block" />
            <div className="scene rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_-70px_rgba(34,211,238,0.45)] backdrop-blur-2xl">
              <div className="card-3d rounded-[2.25rem] border border-slate-800/70 bg-slate-950/95 p-8 shadow-[0_40px_130px_-80px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between gap-3 rounded-[2rem] bg-gradient-to-br from-cyan-400/15 to-slate-900/30 p-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Design Preview</p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">Elegant 3D Interface</h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-300/10 text-cyan-300 ring-1 ring-cyan-300/20">
                    <span className="text-xl">✨</span>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] bg-slate-900/90 p-5 ring-1 ring-slate-700/70">
                    <p className="text-sm text-slate-400">Website cepat</p>
                    <p className="mt-2 text-lg font-semibold text-white">UX halus</p>
                  </div>
                  <div className="rounded-[1.75rem] bg-slate-900/90 p-5 ring-1 ring-slate-700/70">
                    <p className="text-sm text-slate-400">Brand design</p>
                    <p className="mt-2 text-lg font-semibold text-white">Identitas premium</p>
                  </div>
                </div>

                <div className="mt-8 rounded-[2rem] bg-slate-950/90 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Highlight</p>
                  <p className="mt-4 text-slate-300">
                    Desain antarmuka yang terasa futuristik dengan depth lembut, warna kontras, dan tombol CTA yang kuat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <a
            href="#services"
            className="scroll-hint inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-slate-900/90 px-5 py-3 text-sm font-semibold text-cyan-200 shadow-[0_20px_50px_-25px_rgba(34,211,238,0.55)] transition hover:bg-slate-800"
          >
            Gulir ke bawah
            <span className="text-lg">↓</span>
          </a>
        </div>
      </section>

      <section id="services" data-reveal className="reveal border-t border-slate-800/80 bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Layanan Kami</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Apa yang bisa Anda pesan</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Pilih layanan sesuai kebutuhan: website, brand design, hingga paket lengkap pemasaran digital.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="group rounded-[2rem] border border-slate-800/80 bg-slate-900/90 p-8 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.75)] transition duration-300 ease-out hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95 hover:shadow-[0_30px_90px_-40px_rgba(34,211,238,0.18)]">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-300/20">
                  <span className="text-2xl">★</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{service.title}</h3>
                <p className="mt-4 text-slate-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" data-reveal className="reveal bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Portofolio</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Proyek terpilih</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {portfolio.map((item) => (
              <div key={item.title} className="scene rounded-[2rem] border border-slate-800/80 bg-slate-900/90 p-6 shadow-[0_25px_80px_-45px_rgba(0,0,0,0.7)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_32px_90px_-45px_rgba(34,211,238,0.18)]">
                <div className="card-3d rounded-[1.75rem] bg-slate-950/95 p-6">
                  <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">{item.category}</p>
                  <h3 className="mt-5 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-slate-300">{item.highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" data-reveal className="reveal border-t border-slate-800/80 bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Tentang Kami</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Kenapa memilih Jasa Digital</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Kami menggabungkan estetika premium, proses cepat, dan dukungan penuh supaya setiap proyek tampil profesional dan mudah dikelola.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {aboutPoints.map((point) => (
              <div key={point.title} className="rounded-[2rem] border border-slate-800/80 bg-slate-900/95 p-8 shadow-[0_20px_70px_-40px_rgba(0,0,0,0.6)] transition duration-300 ease-out hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/90">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">{point.title}</p>
                <p className="mt-4 text-slate-300">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" data-reveal className="reveal bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Paket Harga</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Pilih paket sesuai kebutuhan</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Mulai dari landing page sederhana hingga solusi brand dan platform custom. Harga sudah termasuk desain, optimasi, dan support.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className="rounded-[2rem] border border-slate-800/80 bg-slate-900/95 p-8 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.75)] transition duration-300 ease-out hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_32px_90px_-45px_rgba(34,211,238,0.18)]">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-base font-semibold uppercase tracking-[0.24em] text-cyan-300">{plan.name}</p>
                  <p className="text-lg font-semibold text-white">{plan.price}</p>
                </div>
                <p className="mt-5 text-slate-300">{plan.description}</p>
                <ul className="mt-6 space-y-3 text-slate-400">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-sm">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-300/20">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href="#booking"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-cyan-300"
                >
                  Pilih Paket
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" data-reveal className="reveal border-t border-slate-800/80 bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Testimonial</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Ulasan klien</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-[2rem] border border-slate-800/80 bg-slate-900/95 p-8 shadow-[0_20px_80px_-50px_rgba(0,0,0,0.7)] transition duration-300 ease-out hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900/90 hover:shadow-[0_24px_90px_-50px_rgba(34,211,238,0.16)]">
                  <p className="text-slate-300">“{testimonial.feedback}”</p>
                  <div className="mt-6">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" data-reveal className="reveal bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Pertanyaan umum</h2>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {faqs.map((faq, index) => (
              <button
                key={faq.question}
                type="button"
                onClick={() => toggleFaq(index)}
                className="overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-900/95 p-6 text-left transition duration-300 ease-out hover:border-cyan-400/40 hover:bg-slate-900/90"
                aria-expanded={activeFaq === index}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-white">{faq.question}</p>
                  <span className="text-2xl text-cyan-300">{activeFaq === index ? "−" : "+"}</span>
                </div>
                <div className={`mt-4 text-slate-400 transition-all duration-300 ${activeFaq === index ? "max-h-40" : "max-h-0 text-opacity-0"}`}>
                  <p className="leading-7">{faq.answer}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" data-reveal className="reveal border-t border-slate-800/80 bg-slate-950 py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="rounded-[2.5rem] border border-cyan-400/10 bg-slate-900/95 p-10 shadow-[0_35px_90px_-45px_rgba(34,211,238,0.4)] sm:p-14">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Form Pemesanan</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Kirim brief Anda</h2>
                <p className="mt-4 text-slate-400">
                  Isi informasi singkat untuk memulai proyek, tim kami akan segera menghubungi Anda dengan penawaran khusus.
                </p>
              </div>
              <div className="space-y-4 rounded-[2rem] bg-slate-950/90 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-300">Nama Anda</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={submitting}
                      className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                      placeholder="Nama lengkap"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-300">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={submitting}
                      className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                      placeholder="email@domain.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-300">Layanan yang diinginkan</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={submitting}
                      className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <option>Website</option>
                      <option>Desain Grafis</option>
                      <option>Website + Brand</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-300">Pesan singkat</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={submitting}
                      className="mt-3 h-28 w-full rounded-[1.5rem] border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                      placeholder="Ceritakan kebutuhan atau ide singkat Anda"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 w-full rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700"
                  >
                    {submitting ? "Mengirim..." : "Kirim Brief"}
                  </button>
                  {formStatus.message ? (
                    <p
                      className={`mt-3 text-sm ${
                        formStatus.type === "success" ? "text-emerald-300" : "text-rose-300"
                      }`}
                    >
                      {formStatus.message}
                    </p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer data-reveal className="reveal border-t border-slate-800/80 bg-slate-950 py-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Jasa Digital</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Bersiap untuk proyek digital Anda?</h2>
              <p className="mt-4 max-w-xl text-slate-400">
                Hubungi kami untuk konsultasi, estimasi proyek, atau kolaborasi brand dan website yang siap tampil profesional.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Layanan</h3>
                <ul className="mt-5 space-y-3 text-slate-400">
                  <li>Website Profesional</li>
                  <li>Desain Brand & Konten</li>
                  <li>Landing Page Konversi</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Kontak</h3>
                <ul className="mt-5 space-y-3 text-slate-400">
                  <li>Email: halo@jasadigital.id</li>
                  <li>WA: +62 812-3456-7890</li>
                  <li>Instagram: @jasadigital</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800/80 pt-6 text-sm text-slate-500">
            © 2026 Jasa Digital. Semua hak cipta dilindungi.
          </div>
        </div>
      </footer>
      <a
        href="https://wa.me/6281234567890?text=Halo%20Jasa%20Digital%2C%20saya%20ingin%20membahas%20proyek%20website%20atau%20desain%20grafis."
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Kontak WhatsApp Jasa Digital"
      >
        <span className="text-lg">💬</span>
        <span>Chat WA</span>
      </a>
    </main>
  );
}
