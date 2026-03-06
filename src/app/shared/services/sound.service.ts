import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private volume = 0.1;
  private enabled = true;

  // reutiliza o mesmo Audio (evita delay e "lixo" de instâncias)
  private blip = new Audio('click.mp3');
  private pointclick = new Audio('points.mp3');
  private removePoint = new Audio('remove-point.mp3');

  constructor() {
    this.blip.preload = 'auto';
    this.blip.volume = this.volume;
    this.pointclick.preload = 'auto';
    this.pointclick.volume = this.volume;
    this.removePoint.preload = 'auto';
    this.removePoint.volume = this.volume;
  }

  setEnabled(value: boolean) {
    this.enabled = value;
  }

  playBlip() {
    if (!this.enabled) return;

    try {
      // permite tocar várias vezes seguidas sem travar
      this.blip.currentTime = 0;
      void this.blip.play();
    } catch {
      // se o browser bloquear, depois do primeiro clique do usuário normalmente libera
    }
  }

  playPoint() {
    if (!this.enabled) return;

    try {
      // permite tocar várias vezes seguidas sem travar
      this.pointclick.currentTime = 0;
      void this.pointclick.play();
    } catch {
      // se o browser bloquear, depois do primeiro clique do usuário normalmente libera
    }
  }

  removePoints() {
    if (!this.enabled) return;

    try {
      // permite tocar várias vezes seguidas sem travar
      this.removePoint.currentTime = 0;
      void this.removePoint.play();
    } catch {
      // se o browser bloquear, depois do primeiro clique do usuário normalmente libera
    }
  }
}
