import { Component, Type } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { PixelRain } from '../../shared/components/pixel-rain/pixel-rain';
import { About } from '../../about/about';
import { Skills } from '../../skills/skills';
import { NgComponentOutlet } from '@angular/common';
import { Projects } from '../../projects/projects';
import { Contact } from '../../contact/contact';
import { Presentation } from '../../presentation/presentation';
import { SoundService } from '../../shared/services/sound.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Navbar, Footer, PixelRain, NgComponentOutlet, RouterModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  standalone: true,
})
export class MainLayout {
  constructor(public sound: SoundService) {}

  cardComponents: Type<any>[] = [Presentation, About, Skills, Projects, Contact];

  currentIndex = 0;
  isFlipping = false;

  get currentCardComponent() {
    return this.cardComponents[this.currentIndex];
  }

  nextCard() {
    this.currentIndex = (this.currentIndex + 1) % this.cardComponents.length;
  }

  prevCard() {
    this.currentIndex =
      (this.currentIndex - 1 + this.cardComponents.length) % this.cardComponents.length;
  }

  flipCard(updateIndex: () => void) {
    this.isFlipping = true;

    // Espera a metade da animação para trocar o conteúdo
    setTimeout(() => {
      updateIndex();
    }, 300);

    // Remove a classe flip após a animação
    setTimeout(() => {
      this.isFlipping = false;
    }, 600);
  }
}
