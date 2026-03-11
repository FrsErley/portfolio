import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { SoundService } from '../shared/services/sound.service';

type SkillGroupKey = 'frontend' | 'backend' | 'devops' | 'database';

interface Skill {
  name: string;
  level: number;
  max: number;
  tags: string[];
}

interface SkillGroup {
  key: SkillGroupKey;
  title: string;
  icon: string;
  skills: Skill[];
  spellTitle: string;
  spellBadges: string[];
}

@Component({
  selector: 'app-skills',
  imports: [NgFor],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  constructor(public sound: SoundService) {}

  pointsAvailable = 3;

  // Se quiser simular points, mude pra 3 ou 5:
  // pointsAvailable = 5;

  groups: SkillGroup[] = [
    {
      key: 'frontend',
      title: 'Habilidades Frontend',
      icon: '🧩',
      spellTitle: '📚 UI Habilidades',
      spellBadges: ['JavaScript', 'TypeScript', 'Tailwind', 'Bootstrap', 'Axios', 'Context API'],
      skills: [
        {
          name: 'Angular',
          level: 8,
          max: 10,
          tags: ['TypeScript', 'RxJS', 'Componentização', 'Performance'],
        },
        { name: 'React', level: 8, max: 10, tags: ['Context API', 'Axios', 'Tailwind'] },
        { name: 'Next.js', level: 8, max: 10, tags: ['SSR', 'Routes', 'TypeScript'] },
        { name: 'Vue', level: 5, max: 10, tags: ['SPA', 'Components'] },
      ],
    },
    {
      key: 'backend',
      title: 'Habilidades Backend',
      icon: '🛡️',
      spellTitle: '🧪 Testes & Qualidade',
      spellBadges: ['Jest', 'Unittest', 'xUnit'],
      skills: [
        { name: '.NET 8', level: 8, max: 10, tags: ['APIs', 'Arquitetura', 'Performance', 'SQL'] },
        { name: 'Node.js', level: 8, max: 10, tags: ['JavaScript', 'TypeScript', 'APIs'] },
        { name: 'NestJS', level: 8, max: 10, tags: ['Modules', 'Guards', 'Interceptors'] },
        { name: 'Laravel', level: 7, max: 10, tags: ['REST', 'MVC'] },
        { name: 'Python', level: 7, max: 10, tags: ['FastAPI', 'REST APIs', 'SQLAlchemy'] },
      ],
    },
    {
      key: 'devops',
      title: 'Cloud & DevOps',
      icon: '☁️',
      spellTitle: '🧰 Ferramentas',
      spellBadges: ['Git', 'Git Flow', 'GitHub Actions', 'CI/CD'],
      skills: [
        { name: 'AWS', level: 7, max: 10, tags: ['EC2', 'ECS', 'Elastic Beanstalk'] },
        { name: 'Docker', level: 7, max: 10, tags: ['Compose', 'Containers'] },
        { name: 'CI/CD', level: 6, max: 10, tags: ['Git', 'Git Flow', 'GitHub Actions'] },
        { name: 'Kubernetes', level: 6, max: 10, tags: ['Git', 'Git Flow', 'GitHub Actions'] },
      ],
    },
    {
      key: 'database',
      title: 'Database & Data',
      icon: '🗃️',
      spellTitle: '🧙 ORMs / Ferramentas de dados',
      spellBadges: ['Prisma', 'Sequelize', 'SQLAlchemy', 'Entity Framework Core'],
      skills: [
        { name: 'SQL', level: 8, max: 10, tags: ['Queries', 'Relatórios', 'Performance'] },
        { name: 'NoSQL', level: 8, max: 10, tags: ['Queries', 'Relatórios', 'Performance'] },
        { name: 'PostgreSQL', level: 8, max: 10, tags: ['Views', 'Indexes'] },
        { name: 'MongoDB', level: 6, max: 10, tags: ['Documents', 'Collections'] },
        { name: 'Redis', level: 7, max: 10, tags: ['Cache', 'Queues', 'Sessions'] },
      ],
    },
  ];

  passiveSkills = [
    'Clean Architecture',
    'SOLID',
    'Clean code',
    'Performance & UX',
    'Escalabilidade',
    'Scrum/Kanban',
  ];

  // Helpers
  width(skill: Skill) {
    return `${Math.round((skill.level / skill.max) * 100)}%`;
  }

  canAdd(skill: Skill) {
    return this.pointsAvailable > 0 && skill.level < skill.max;
  }

  canRemove(skill: Skill) {
    return skill.level > 0;
  }

  addPoint(skill: Skill) {
    if (!this.canAdd(skill)) return;
    skill.level += 1;
    this.pointsAvailable -= 1;
  }

  removePoint(skill: Skill) {
    if (!this.canRemove(skill)) return;
    skill.level -= 1;
    this.pointsAvailable += 1;
  }
}
