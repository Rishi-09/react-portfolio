import ssg from './assets/ssg.png'
import syranx from './assets/chatbot.png'
import roomora from './assets/roomora.png'
import innovertex from './assets/innovertex.png'
import codeSlayer from './assets/codeslayer.png'
import HackPirate from './assets/hackpirate.png'
import hackVriksh from './assets/hackvriksh.png'
import TechJam from './assets/techjam.png'
import ideaThon from './assets/ideathon.png'
import type { Project, SkillCategory, Achievement, ExperienceItem, FeatureCard, Certificate } from './types';

export const COLORS = {
  background: '#0B0C10',
  surface: '#12141D',
  surfaceSoft: '#1A1D29',
  border: '#2A2E3B',
  textPrimary: '#F0F2F5',
  textSecondary: '#A0A5B1',
  accent: '#6D7CFF',
  secondary: '#C084FC',
  tertiary: '#2DD4BF'
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Syranx Ai',
    category: 'AI',
    description: 'Full-stack AI chatbot with persistent memory and thread-based context management.',
    tags: [ 'Groq Api','MongoDB','Express.js','React.js','Node.js'],
    link: 'https://syranx.vercel.app',
    github: 'https://github.com/rishi-09/syranx',
    imageUrl: syranx
  },
  {
    id: '2',
    title: 'Roomora',
    category: 'Web App',
    description: "Full-stack platform to monitor travel destinations and user reviews.",
    tags: ['Express.js', 'Node.js', 'MongoDB','validation','secure authentication, authorization','custom error handling'],
    link: 'https://roomora-sm0v.onrender.com/',
    github: 'https://github.com/roomora',
    imageUrl: roomora
  },
  {
    id: '3',
    title: 'Simon Says Game',
    category: 'Game',
    description: 'Interactive Simon Says game with dynamic sequence generation.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://simon-says-game-khaki-two.vercel.app/',
    github: 'https://github.com/simon-says-game',
    imageUrl: ssg
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['HTML', 'CSS','React', 'TypeScript', 'Tailwind CSS','Bootstrap'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'MongoDB', 'REST API', 'express.js','JWT'],
  },
  {
    name: 'Core & Languages',
    skills: ['JavaScript','Java', 'Python', 'Basic System Design Principles'],
  },
  {
    name:'Tools',
    skills:['Git','Github','Vercel','Postman','Render']
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    title: 'Innovertex Hackathon Participant',
    organization: 'IGDTUV',
    imageUrl: innovertex,
    link: 'https://unstop.com/certificate-preview/cf909beb-d8ec-43ad-9e92-2dcc79888b45',
    date: 'Oct 2025',
    description: ''
  },
  {
    title: 'Code Slayer Hackathon Participant',
    organization: 'NIT Delhi',
    imageUrl: codeSlayer,
    link: 'https://unstop.com/certificate-preview/369d3c03-425f-4c8e-bd22-21c7c8989470',
    date: 'Oct 2025',
    description: ''
  },
  {
    title: 'Hack-e-Pirate Hackathon Participant',
    organization: 'NSUT Delhi',
    imageUrl: HackPirate,
    link: 'https://unstop.com/certificate-preview/f8f548f4-8a92-44ec-80d9-12a98af5069c',
    date: 'Oct 2025',
    description: ''
  },
  {
    title: 'HackVriksh Hackathon Participant',
    organization: 'Tech Vriksh',
    imageUrl: hackVriksh,
    link: 'https://unstop.com/certificate-preview/6d9578b3-f3c6-48d6-afa2-cba717ca3ffd',
    date: 'Dec 2025',
    description: ''
  },
  {
    title: 'TechJam Hackathon Participant',
    organization: 'TechJam 2.0',
    imageUrl: TechJam,
    link: 'https://unstop.com/certificate-preview/c7b76fd4-910e-48f1-a166-fdaff28ab833',
    date: 'Dec 2025',
    description: ''
  },
  {
    title: 'Ideathon 1.o Participant',
    organization: 'Lloyd Institute, Greater Noida',
    imageUrl: ideaThon,
    link: 'https://unstop.com/certificate-preview/597003cc-1d05-4cb9-92b3-4ad5b4e51cfd',
    date: 'Dec 2025',
    description: ''
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Code Web Dev Member',
    organization: 'GDG On-campus',
    period: 'Sept 2025 — Present',
    description: [
    
      'Collaborated with team Members to implement workshops.'
    ]
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Vibe-a-thon Winner',
    organization: 'MGMCoEt,Noida',
    date: '2025',
    description: 'First place for developing an AI-driven Carbon footprint manager.'
  },
];

export const ABOUT_FEATURES: FeatureCard[] = [
  {
    title: 'Engineering Maturity',
    description: 'Clean, testable, and scalable code that stands the test of production.'
  },
  {
    title: 'Product Mindset',
    description: 'Solving complex technical problems with the user experience at the core.'
  },
  {
    title: 'Rapid Exploration',
    description: 'Quickly prototyping and validating ideas using modern stacks.'
  },
  {
    title: 'Systems Thinker',
    description: 'Understanding how individual components orchestrate into larger architectures.'
  }
];
