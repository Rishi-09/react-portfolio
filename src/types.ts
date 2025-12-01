import type { ReactNode } from 'react';

export interface NavItem {
  id: string;
  label: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  externalLink: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: ReactNode;
}

export interface SectionProps {
  id: string;
  className?: string;
}