export type NavLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
};

export type Skill = {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools";
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

// ─── Brand constants ──────────────────────────────────────────────────────────
export const BRAND = {
  name: "Alex Moreno",
  tagline: "Desarrollador Full Stack",
  email: "hola@alexmoreno.dev",
  github: "https://github.com/alexmoreno",
  linkedin: "https://linkedin.com/in/alexmoreno",
  twitter: "https://twitter.com/alexmoreno",
  accentColor: "#7c3aed",
  accentLight: "#a78bfa",
} as const;

// ─── Navigation (single source of truth) ─────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Proyectos", href: "#projects" },
  { label: "Experiencia", href: "#experience" },
  { label: "Contacto", href: "#contact" },
];

export const navCTA = {
  label: "Descargar CV",
  href: "#contact",
};