"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ArrowRight, ExternalLink, Star, Code2, Layers, Zap, Globe, Database, Terminal, CheckCircle, ChevronDown } from 'lucide-react';
import { BRAND } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  scaleIn,
  cardHover,
} from "@/lib/motion";

// ─── Inline data ──────────────────────────────────────────────────────────────

const projects = [
  {
    id: "p1",
    title: "Plataforma SaaS de Analítica",
    description:
      "Dashboard en tiempo real para equipos de marketing. Integra múltiples fuentes de datos y genera reportes automáticos con IA.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI"],
    image: "https://www.slingshotapp.io/wp-content/uploads/2023/06/slingshot-data-analytics.jpg",
    liveUrl: "https://demo.alexmoreno.dev",
    repoUrl: "https://github.com/alexmoreno",
    featured: true,
  },
  {
    id: "p2",
    title: "E-commerce de Moda Sostenible",
    description:
      "Tienda online con catálogo dinámico, carrito persistente y pasarela de pago integrada. Optimizada para conversión.",
    tags: ["React", "Node.js", "Stripe", "MongoDB", "Tailwind"],
    image: "https://m.media-amazon.com/images/I/71T5ItvfYcL._UF1000,1000_QL80_.jpg",
    liveUrl: "https://demo.alexmoreno.dev",
    repoUrl: "https://github.com/alexmoreno",
    featured: true,
  },
  {
    id: "p3",
    title: "App de Gestión de Tareas",
    description:
      "Herramienta colaborativa con tableros Kanban, notificaciones en tiempo real y sincronización entre dispositivos.",
    tags: ["Vue.js", "Socket.io", "Express", "Redis"],
    image: "https://res.cloudinary.com/monday-blogs/fl_lossy,f_auto,q_auto/wp-blog/2024/03/tareas-del-equipo.png",
    liveUrl: "https://demo.alexmoreno.dev",
    repoUrl: "https://github.com/alexmoreno",
    featured: false,
  },
  {
    id: "p4",
    title: "API REST para Fintech",
    description:
      "Backend robusto para una startup financiera. Maneja transacciones, autenticación OAuth2 y cumplimiento regulatorio.",
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS"],
    image: "https://inoxoft.com/wp-content/uploads/2023/07/2@3x-80-3-scaled.jpg",
    liveUrl: undefined,
    repoUrl: "https://github.com/alexmoreno",
    featured: false,
  },
];

const skills = [
  { name: "React / Next.js", level: 95, category: "frontend" as const },
  { name: "TypeScript", level: 92, category: "frontend" as const },
  { name: "Tailwind CSS", level: 90, category: "frontend" as const },
  { name: "Vue.js", level: 78, category: "frontend" as const },
  { name: "Node.js", level: 88, category: "backend" as const },
  { name: "PostgreSQL", level: 82, category: "backend" as const },
  { name: "MongoDB", level: 80, category: "backend" as const },
  { name: "Python", level: 72, category: "backend" as const },
  { name: "Docker", level: 85, category: "tools" as const },
  { name: "AWS", level: 76, category: "tools" as const },
  { name: "Git / CI-CD", level: 90, category: "tools" as const },
  { name: "Figma", level: 70, category: "tools" as const },
];

const experiences = [
  {
    id: "e1",
    role: "Senior Full Stack Developer",
    company: "Veritas Digital",
    period: "2022 — Presente",
    description:
      "Lideré el desarrollo de una plataforma SaaS B2B usada por más de 200 empresas en Latinoamérica.",
    highlights: [
      "Reduje el tiempo de carga en un 60% mediante SSR y optimización de queries",
      "Diseñé la arquitectura de microservicios que soporta 50k usuarios concurrentes",
      "Mentoricé a un equipo de 4 desarrolladores junior",
    ],
  },
  {
    id: "e2",
    role: "Full Stack Developer",
    company: "Nexo Labs",
    period: "2020 — 2022",
    description:
      "Desarrollé productos digitales para startups en etapa temprana, desde MVP hasta lanzamiento.",
    highlights: [
      "Construí 6 MVPs en 18 meses con stack React + Node.js",
      "Implementé pipelines de CI/CD que redujeron el tiempo de deploy en un 75%",
      "Integré pasarelas de pago en 3 mercados distintos",
    ],
  },
  {
    id: "e3",
    role: "Frontend Developer",
    company: "Agencia Pixel",
    period: "2018 — 2020",
    description:
      "Maquetación y desarrollo de sitios web para clientes de retail, educación y salud.",
    highlights: [
      "Entregué más de 30 proyectos web con puntaje Lighthouse superior a 90",
      "Migré el stack de jQuery a React, mejorando la mantenibilidad del código",
      "Colaboré directamente con diseñadores UX para implementar sistemas de diseño",
    ],
  },
];

const stats = [
  { value: "6+", label: "Años de experiencia" },
  { value: "40+", label: "Proyectos entregados" },
  { value: "15+", label: "Clientes satisfechos" },
  { value: "99%", label: "Tasa de retención" },
];

const services = [
  {
    icon: Globe,
    title: "Desarrollo Web Full Stack",
    description:
      "Aplicaciones web completas, desde el diseño de la base de datos hasta la interfaz de usuario. Escalables, rápidas y mantenibles.",
  },
  {
    icon: Zap,
    title: "Optimización de Rendimiento",
    description:
      "Auditorías de velocidad, refactorización de código y arquitectura orientada a la performance. Resultados medibles desde el primer sprint.",
  },
  {
    icon: Layers,
    title: "Arquitectura de Software",
    description:
      "Diseño de sistemas robustos para productos en crecimiento. Microservicios, APIs REST/GraphQL y estrategias de escalado.",
  },
  {
    icon: Code2,
    title: "Consultoría Técnica",
    description:
      "Revisión de código, selección de stack tecnológico y acompañamiento en decisiones técnicas críticas para tu equipo.",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Carla Méndez",
    role: "CEO, Veritas Digital",
    avatar: "https://www.orbitaingenieria.com/wp-content/uploads/2023/09/ServicioConsultoria.jpg",
    text: "Alex transformó nuestra plataforma en tiempo récord. Su capacidad para entender el negocio y traducirlo en código es excepcional. El rendimiento mejoró un 60% en el primer mes.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Rodrigo Fuentes",
    role: "CTO, Nexo Labs",
    avatar: "https://images.squarespace-cdn.com/content/v1/52b91981e4b05c06a6ce93a0/4c18eb97-edcc-4a21-98ed-f5ceb49401c6/foto+%28Rodrigo+Fuentes3%29.jpg",
    text: "Trabajar con Alex es una garantía de calidad. Entrega código limpio, bien documentado y siempre cumple los plazos. Lo recomendaría sin dudarlo a cualquier startup seria.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Sofía Reyes",
    role: "Product Manager, Finova",
    avatar: "https://www.bmi.com/images/news/2023/_770/Latin-Spotlight-Sofia-Reyes.jpg",
    text: "Nos ayudó a lanzar nuestro MVP en 6 semanas. Su experiencia en fintech fue clave para navegar los requisitos de seguridad y cumplimiento. Un profesional de primer nivel.",
    stars: 5,
  },
];

const skillCategories = [
  { key: "frontend" as const, label: "Frontend" },
  { key: "backend" as const, label: "Backend" },
  { key: "tools" as const, label: "Herramientas" },
];

// ─── Sub-components (inline) ──────────────────────────────────────────────────

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const shouldReduce = useReducedMotion();
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">{name}</span>
        <span className="text-xs text-slate-500 tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={
            shouldReduce
              ? { duration: 0 }
              : { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
          }
        />
      </div>
    </div>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-violet-400 text-violet-400" />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduce = useReducedMotion();
  const [activeSkillTab, setActiveSkillTab] = useState<"frontend" | "backend" | "tools">("frontend");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const motionProps = (variants: Variants) =>
    shouldReduce
      ? {}
      : {
          variants,
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-80px" },
        };

  const filteredSkills = skills.filter((s) => s.category === activeSkillTab);

  return (
    <main className="bg-[#0a0a0f] text-slate-100 overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16"
      >
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-900/10 rounded-full blur-[100px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-600/15 border border-violet-500/25 text-violet-300 text-xs font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Disponible para proyectos
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05]"
            >
              Hola, soy{" "}
              <span className="bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">
                Alex Moreno
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-400 leading-relaxed max-w-lg text-pretty"
            >
              Desarrollador Full Stack con 6 años construyendo productos digitales que escalan. Especializado en React, Node.js y arquitecturas modernas que combinan rendimiento con experiencia de usuario.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:shadow-[0_0_32px_rgba(124,58,237,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                Ver proyectos
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/40 text-slate-200 font-semibold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <Mail size={16} />
                Contactar
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-5 pt-2">
              {[
                { icon: Github, href: BRAND.github, label: "GitHub" },
                { icon: Linkedin, href: BRAND.linkedin, label: "LinkedIn" },
                { icon: Twitter, href: BRAND.twitter, label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-slate-500 hover:text-violet-300 transition-colors duration-200"
                >
                  <Icon size={20} />
                </a>
              ))}
              <span className="w-px h-5 bg-white/10" />
              <span className="text-xs text-slate-500">
                {BRAND.email}
              </span>
            </motion.div>
          </motion.div>

          {/* Right: avatar + stats */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-8"
          >
            {/* Avatar frame */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/40 to-violet-900/20 blur-2xl scale-110" />
              <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_48px_rgba(0,0,0,0.5)]">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5603AQGCX4mBAGcKow/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1683327678972?e=2147483647&v=beta&t=hJTqQAVa0UqW9O4ZCaane1zqnDJ4WEYe5fiH6q5qiN8"
                  alt="Alex Moreno, Desarrollador Full Stack"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background = "linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)";
                      parent.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:5rem;font-weight:700;color:rgba(167,139,250,0.6)">AM</div>`;
                    }
                  }}
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#13131f] border border-white/10 rounded-xl px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-slate-300">Open to work</span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/[0.03] border border-white/8 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-violet-300 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            {...motionProps(fadeInLeft)}
            className="relative order-2 md:order-1"
          >
            <div className="absolute -inset-4 bg-violet-600/5 rounded-3xl blur-xl" />
            <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-[0_8px_48px_rgba(0,0,0,0.4)] aspect-[4/3]">
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQG96KTy5XDh5w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1702087082297?e=2147483647&v=beta&t=LNehWyJsG9Xc5yRfEgCEg2xWTlcBlAVab98C7a1Vgk0"
                alt="Espacio de trabajo de Alex Moreno"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #1e1b4b 0%, #0f0f1a 100%)";
                  e.currentTarget.style.display = "block";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />
            </div>
            {/* Floating tech pill */}
            <div className="absolute -top-4 -left-4 bg-[#13131f] border border-violet-500/30 rounded-xl px-4 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-violet-400" />
                <span className="text-xs font-mono text-violet-300">npm run build</span>
              </div>
            </div>
          </motion.div>

          {/* Copy side */}
          <motion.div
            {...motionProps(fadeInRight)}
            className="space-y-6 order-1 md:order-2"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                Sobre mí
              </span>
              <h2 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-balance">
                Código que resuelve problemas reales
              </h2>
            </div>
            <p className="text-slate-400 leading-relaxed text-pretty">
              Soy un desarrollador Full Stack con base en Madrid, apasionado por construir productos que la gente realmente usa. Empecé programando sitios web para pequeños negocios locales y hoy diseño arquitecturas que soportan decenas de miles de usuarios.
            </p>
            <p className="text-slate-400 leading-relaxed text-pretty">
              Me especializo en el ecosistema JavaScript moderno: React y Next.js en el frontend, Node.js y PostgreSQL en el backend. Valoro el código limpio, las revisiones honestas y los equipos que se comunican bien.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                "Código limpio y documentado",
                "Entregas puntuales",
                "Comunicación clara",
                "Orientado a resultados",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle size={15} className="text-violet-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200 transition-colors duration-200 group"
            >
              Hablemos de tu proyecto
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...motionProps(fadeInUp)} className="text-center mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
              Servicios
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Lo que puedo hacer por ti
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto leading-relaxed text-pretty">
              Desde la idea hasta el lanzamiento. Trabajo contigo en cada etapa del desarrollo para entregar un producto que supere expectativas.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 gap-4"
          >
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={scaleIn}
                  whileHover={shouldReduce ? {} : { y: -4, transition: { duration: 0.25 } }}
                  className={`group relative p-7 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-violet-500/25 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] ${i === 0 ? "md:col-span-1" : ""}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center mb-5 group-hover:bg-violet-600/25 transition-colors duration-300">
                    <Icon size={20} className="text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...motionProps(fadeInUp)} className="mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
              Habilidades
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Stack tecnológico
            </h2>
          </motion.div>

          {/* Tab switcher */}
          <motion.div {...motionProps(fadeIn)} className="flex gap-2 mb-10">
            {skillCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveSkillTab(cat.key)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  activeSkillTab === cat.key
                    ? "bg-violet-600 text-white shadow-[0_0_16px_rgba(124,58,237,0.35)]"
                    : "bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/8"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          <motion.div
            key={activeSkillTab}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-x-12 gap-y-5"
          >
            {filteredSkills.map((skill, i) => (
              <motion.div key={skill.name} variants={fadeInUp}>
                <SkillBar name={skill.name} level={skill.level} delay={i * 0.07} />
              </motion.div>
            ))}
          </motion.div>

          {/* Tech logos strip */}
          <motion.div
            {...motionProps(fadeInUp)}
            className="mt-16 pt-10 border-t border-white/5"
          >
            <p className="text-xs text-slate-600 uppercase tracking-widest text-center mb-6">
              Tecnologías con las que trabajo a diario
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS", "Tailwind", "Prisma", "Redis"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/8 text-xs text-slate-400 font-medium"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-32 px-6 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...motionProps(fadeInUp)} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                Proyectos
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Trabajo seleccionado
              </h2>
            </div>
            <a
              href={BRAND.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-300 transition-colors duration-200 group shrink-0"
            >
              <Github size={16} />
              Ver todos en GitHub
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>

          {/* Featured projects (large) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6 mb-6"
          >
            {projects
              .filter((p) => p.featured)
              .map((project, i) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  whileHover={shouldReduce ? {} : { y: -3, transition: { duration: 0.25 } }}
                  className={`group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] hover:border-violet-500/25 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_32px_-8px_rgba(0,0,0,0.3)]`}
                >
                  {/* Image */}
                  <div className={`relative aspect-video md:aspect-auto overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.background = "linear-gradient(135deg, #2e1065 0%, #1e1b4b 100%)";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/40 to-transparent" />
                  </div>
                  {/* Content */}
                  <div className={`p-8 flex flex-col justify-center space-y-4 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <h3 className="text-xl font-bold text-slate-100">{project.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-violet-600/10 border border-violet-500/20 text-xs text-violet-300 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-1">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300 hover:text-violet-200 transition-colors duration-200"
                        >
                          <ExternalLink size={13} />
                          Ver demo
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors duration-200"
                        >
                          <Github size={13} />
                          Código
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Secondary projects (small grid) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {projects
              .filter((p) => !p.featured)
              .map((project) => (
                <motion.div
                  key={project.id}
                  variants={scaleIn}
                  whileHover={shouldReduce ? {} : { y: -4, transition: { duration: 0.25 } }}
                  className="group p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-violet-500/25 hover:bg-white/[0.04] transition-all duration-300 space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-slate-100">{project.title}</h3>
                    <div className="flex gap-2 shrink-0">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ver demo"
                          className="text-slate-500 hover:text-violet-300 transition-colors duration-200"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ver código"
                          className="text-slate-500 hover:text-violet-300 transition-colors duration-200"
                        >
                          <Github size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs text-slate-500 bg-white/5 border border-white/8"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...motionProps(fadeInUp)} className="mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
              Trayectoria
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Experiencia profesional
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-[200px] top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-transparent hidden md:block" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-10"
            >
              {experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  variants={fadeInUp}
                  className="md:grid md:grid-cols-[200px_1fr] gap-8 items-start"
                >
                  {/* Period */}
                  <div className="hidden md:block text-right pr-8 pt-1">
                    <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                    <div className="absolute left-[196px] mt-1 w-2.5 h-2.5 rounded-full bg-violet-500 border-2 border-[#0a0a0f] shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
                  </div>
                  {/* Content */}
                  <div className="p-6 rounded-2xl border border-white/8 bg-white/[0.02] space-y-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)]">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <h3 className="text-base font-bold text-slate-100">{exp.role}</h3>
                      <span className="hidden sm:block text-slate-600">·</span>
                      <span className="text-sm text-violet-300 font-medium">{exp.company}</span>
                      <span className="text-xs font-mono text-slate-600 md:hidden">{exp.period}</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{exp.description}</p>
                    <ul className="space-y-1.5 pt-1">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...motionProps(fadeInUp)} className="text-center mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
              Testimonios
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Lo que dicen quienes trabajaron conmigo
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-5"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={scaleIn}
                whileHover={shouldReduce ? {} : { y: -4, transition: { duration: 0.25 } }}
                className={`p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-violet-500/20 transition-all duration-300 space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] ${i === 1 ? "md:mt-6" : ""}`}
              >
                <StarRating count={t.stars} />
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-1 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-violet-600/20 border border-violet-500/20 shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <motion.div {...motionProps(fadeInLeft)} className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                Contacto
              </span>
              <h2 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-balance">
                Hablemos de tu próximo proyecto
              </h2>
            </div>
            <p className="text-slate-400 leading-relaxed text-pretty">
              Estoy disponible para proyectos freelance, colaboraciones y posiciones full-time. Si tienes una idea o un problema que resolver, me encantaría escucharte.
            </p>
            <div className="space-y-3">
              {[
                { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
                { icon: Github, label: "GitHub", value: "github.com/alexmoreno", href: BRAND.github },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/alexmoreno", href: BRAND.linkedin },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/8 hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-violet-600/15 border border-violet-500/20 flex items-center justify-center shrink-0 group-hover:bg-violet-600/25 transition-colors duration-200">
                    <Icon size={16} className="text-violet-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">{label}</div>
                    <div className="text-sm font-medium text-slate-300">{value}</div>
                  </div>
                  <ArrowRight size={14} className="ml-auto text-slate-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-200" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div {...motionProps(fadeInRight)}>
            {formSent ? (
              <div className="p-8 rounded-2xl border border-violet-500/30 bg-violet-600/10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle size={24} className="text-violet-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Mensaje enviado</h3>
                <p className="text-sm text-slate-400">
                  Gracias por escribir. Te responderé en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                className="space-y-4 p-8 rounded-2xl border border-white/8 bg-white/[0.02] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_32px_-8px_rgba(0,0,0,0.3)]"
              >
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleFormChange}
                    placeholder="Tu nombre completo"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all duration-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleFormChange}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all duration-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleFormChange}
                    placeholder="Cuéntame sobre tu proyecto, idea o pregunta..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all duration-200 resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={shouldReduce ? {} : { scale: 1.02 }}
                  whileTap={shouldReduce ? {} : { scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:shadow-[0_0_32px_rgba(124,58,237,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  Enviar mensaje
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...motionProps(scaleIn)}
            className="relative rounded-3xl overflow-hidden border border-violet-500/20 bg-gradient-to-br from-violet-900/30 via-violet-800/10 to-transparent p-12 text-center space-y-6"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

            <div className="relative space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
                Listo para construir algo increíble
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto leading-relaxed text-pretty">
                Cada gran producto empieza con una conversación. Cuéntame tu idea y encontremos juntos la mejor forma de hacerla realidad.
              </p>
            </div>
            <div className="relative flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${BRAND.email}`}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_24px_rgba(124,58,237,0.4)] hover:shadow-[0_0_36px_rgba(124,58,237,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <Mail size={16} />
                Escribir ahora
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href={BRAND.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/40 text-slate-200 font-semibold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <Github size={16} />
                Ver GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}