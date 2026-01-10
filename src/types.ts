
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: 'AI' | 'Web App' | 'Game';
  link: string;
  github?: string;
  imageUrl: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  description?: string;
}

export interface Certificate {
  title: string;
  organization: string;
  imageUrl: string;
  link?: string;
  date: string;
  description: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  description: string[];
}

export interface FeatureCard {
  title: string;
  description: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  updated_at: string;
  language: string | null;
  fork:boolean
}
