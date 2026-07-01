"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ArrowUp } from 'lucide-react';
import { navLinks, BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socialLinks = [
  { icon: Github, href: BRAND.github, label: "GitHub" },
  { icon: Linkedin, href: BRAND.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: BRAND.twitter, label: "Twitter" },
  { icon: Mail, href: `mailto:${BRAND.email}`, label: "Email" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#08080e]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_16px_rgba(124,58,237,0.4)]">
                AM
              </span>
              <span className="font-space-grotesk font-semibold text-slate-100 tracking-tight">
                {BRAND.name}
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {BRAND.tagline}. Construyendo experiencias digitales que combinan
              diseño elegante con código de calidad.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-violet-300 hover:bg-violet-600/15 hover:border-violet-500/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Navegación
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-slate-400 hover:text-violet-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact column */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Contacto
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Disponible para proyectos freelance y oportunidades de tiempo
              completo.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
            >
              <Mail size={14} />
              {BRAND.email}
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; 2024 {BRAND.name}. Todos los derechos reservados.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Volver al inicio"
            className="group flex items-center gap-2 text-xs text-slate-600 hover:text-violet-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
          >
            Volver arriba
            <span className="w-6 h-6 rounded-md bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-violet-600/15 group-hover:border-violet-500/30 transition-all duration-200">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}