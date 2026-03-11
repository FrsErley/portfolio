import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

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
  selector: 'app-project-modal',
  imports: [CommonModule],
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.scss',
})
export class ProjectModal {
  readonly data = inject(DIALOG_DATA);
  readonly dialogRef = inject(DialogRef);

  activeImageIndex = 0;

  get project() {
    return this.data.project;
  }

  get activeImage() {
    return this.project.images[this.activeImageIndex];
  }

  selectImage(index: number) {
    this.activeImageIndex = index;
  }

  nextImage() {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.project.images.length;
  }

  prevImage() {
    this.activeImageIndex =
      (this.activeImageIndex - 1 + this.project.images.length) % this.project.images.length;
  }

  close() {
    this.dialogRef.close();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.close();
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
