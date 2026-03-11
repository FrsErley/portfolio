import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { ProjectModal } from '../shared/components/project-modal/project-modal';
import { Dialog } from '@angular/cdk/dialog';

type QuestStatus = 'Finalizado' | 'Em Andamento';
type Difficulty = 'Fácil' | 'Normal' | 'Difícil' | 'Chefe';

interface QuestLink {
  label: string;
  url: string;
}

interface QuestImage {
  src: string;
  alt: string;
}

interface Quest {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: QuestStatus;
  difficulty: Difficulty;
  xp: number;
  reward: string;
  tech: string[];
  highlights: string[];
  links?: QuestLink[];
  images: QuestImage[];
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule, NgIf, NgFor, ProjectModal],
  standalone: true,
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private dialog = inject(Dialog);

  quests: Quest[] = [
    {
      id: 'quest-finance-ai',
      title: 'Finance AI',
      subtitle: 'Plataforma financeira com IA, dashboards e recursos premium',
      description:
        'Projeto voltado para gestão financeira com recursos visuais, autenticação, tabelas, formulários e integração com IA. A stack mostra um produto mais robusto, com uso de Clerk para autenticação, Stripe para pagamentos e OpenAI para recursos inteligentes.',
      status: 'Finalizado',
      difficulty: 'Chefe',
      xp: 4200,
      reward: '+1 AI Product',
      tech: [
        'Next.js',
        'React',
        'TypeScript',
        'Prisma',
        'Clerk',
        'Stripe',
        'OpenAI',
        'Recharts',
        'React Hook Form',
        'Zod',
        'Tailwind CSS',
        'Radix UI',
      ],
      highlights: [
        'Autenticação de usuários com Clerk e experiência moderna de onboarding',
        'Integração com OpenAI para funcionalidades inteligentes dentro do produto',
        'Dashboards e visualização de dados com Recharts',
        'Fluxos de pagamento e recursos premium com Stripe',
      ],
      images: [
        { src: 'financeAI/image1.png', alt: 'Tela de login' },
        { src: 'financeAI/image2.png', alt: 'Dashboard principal do Finance AI' },
        { src: 'financeAI/image3.png', alt: 'Tela de gerenciamento financeiro' },
        { src: 'financeAI/image4.png', alt: 'Tela de adição de transações' },
        { src: 'financeAI/image5.png', alt: 'Fluxo com IA ou insights financeiros' },
        { src: 'financeAI/image6.png', alt: 'Tela de gerenciamento de planos' },
      ],
      links: [
        { label: 'GitHub', url: 'https://github.com/FrsErley/finance-ai' },
        { label: 'Demo', url: 'https://finance-ai-three-xi.vercel.app' },
      ],
    },
    {
      id: 'quest-fsw-foods',
      title: 'FSW Foods',
      subtitle: 'Clone do iFood com foco em experiência de pedidos e autenticação',
      description:
        'Aplicação inspirada no iFood, desenvolvida com foco em experiência moderna de pedidos, autenticação de usuários e estrutura escalável no ecossistema Next.js. O projeto utiliza Prisma para persistência e componentes modernos para uma interface mais refinada.',
      status: 'Finalizado',
      difficulty: 'Difícil',
      xp: 2600,
      reward: '+1 Product UI',
      tech: ['Next.js', 'React', 'TypeScript', 'Prisma', 'NextAuth', 'Tailwind CSS', 'Radix UI'],
      highlights: [
        'Interface inspirada em aplicativos de delivery, com foco em experiência do usuário',
        'Autenticação integrada com NextAuth e Prisma Adapter',
        'Estrutura moderna com componentes reutilizáveis e estilização escalável',
        'Uso de Prisma para modelagem e integração com banco de dados',
      ],
      images: [
        { src: 'fswfoods/image1.png', alt: 'Tela inicial do FSW Foods' },
        { src: 'fswfoods/image2.png', alt: 'Listagem de restaurantes ou produtos' },
        { src: 'fswfoods/image3.png', alt: 'Detalhe de produto no FSW Foods' },
        { src: 'fswfoods/image4.png', alt: 'Fluxo de autenticação ou pedido' },
      ],
      links: [
        { label: 'GitHub', url: 'https://github.com/FrsErley/fsw-foods' },
        { label: 'Demo', url: 'https://fsw-foods-ruby.vercel.app/' },
      ],
    },
    {
      id: 'quest-todo-list',
      title: 'To-Do List',
      subtitle: 'Sistema de tarefas com autenticação, API própria e frontend separado',
      description:
        'Aplicação full stack de gerenciamento de tarefas com backend em Express e TypeScript, autenticação com JWT e frontend em React com Vite. O projeto mostra domínio de separação entre front e back, validação de dados e organização de fluxo de usuário.',
      status: 'Finalizado',
      difficulty: 'Normal',
      xp: 1800,
      reward: '+1 Full Stack',
      tech: [
        'React',
        'Vite',
        'TypeScript',
        'Express',
        'Prisma',
        'JWT',
        'Zod',
        'Axios',
        'Tailwind CSS',
      ],
      highlights: [
        'Backend com Express, autenticação JWT e estrutura organizada em TypeScript',
        'Frontend separado com React + Vite e integração via Axios',
        'Validação de dados com Zod no fluxo da aplicação',
        'Persistência com Prisma e gerenciamento de autenticação do usuário',
      ],
      images: [
        { src: 'to-do-list/image1.png', alt: 'Tela principal do To-Do List' },
        { src: 'to-do-list/image2.png', alt: 'Fluxo de login ou autenticação' },
        { src: 'to-do-list/image3.png', alt: 'Criação e organização de tarefas' },
      ],
      links: [
        { label: 'GitHub Frontend', url: 'https://github.com/FrsErley/to-do-list-project' },
        { label: 'GitHub Backend', url: 'https://tasks-front-murex.vercel.app/' },
      ],
    },
  ];

  selected: Quest | null = null;
  activeImageIndex = 0;

  get completedCount() {
    return this.quests.filter((q) => q.status === 'Finalizado').length;
  }

  get inProgressCount() {
    return this.quests.filter((q) => q.status === 'Em Andamento').length;
  }

  openQuest(q: Quest) {
    this.dialog.open(ProjectModal, {
      data: { project: q },
      panelClass: 'quest-dialog-panel',
      backdropClass: 'quest-dialog-backdrop',
      width: '700px',
      maxWidth: '60vw',
      maxHeight: '60vh',
    });
  }

  selectImage(index: number) {
    this.activeImageIndex = index;
  }

  get activeImage() {
    if (!this.selected) return null;
    return this.selected.images[this.activeImageIndex];
  }

  statusClass(s: QuestStatus) {
    return s === 'Finalizado' ? 'status done' : 'status progress';
  }

  diffClass(d: Difficulty) {
    switch (d) {
      case 'Fácil':
        return 'diff easy';
      case 'Normal':
        return 'diff normal';
      case 'Difícil':
        return 'diff hard';
      default:
        return 'diff boss';
    }
  }
}
