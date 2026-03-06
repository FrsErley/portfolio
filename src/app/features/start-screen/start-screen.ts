import { ChangeDetectorRef, Component, HostListener, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PixelRain } from '../../shared/components/pixel-rain/pixel-rain';
import { NgIf } from '@angular/common';

type State = 'idle' | 'loading' | 'ready';

@Component({
  selector: 'app-start-screen',
  imports: [PixelRain, NgIf],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.scss',
})
export class StartScreen implements OnDestroy {
  state: State = 'idle';
  progress = 0;

  private timer: any = null;

  constructor(
    private router: Router,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  start() {
    if (this.state === 'loading') return;

    const audio = new Audio('gamestart.mp3');
    audio.volume = 0.35;
    audio.play().catch(() => {});

    this.state = 'loading';
    this.progress = 0;

    const totalMs = 1100;
    const tickMs = 30;
    const steps = Math.ceil(totalMs / tickMs);
    let current = 0;

    this.clearTimer();

    this.timer = setInterval(() => {
      console.log('progress', this.progress);
      this.zone.run(() => {
        current += 1;
        const raw = Math.round((current / steps) * 100);
        this.progress = Math.min(100, raw);

        // força render (extra seguro)
        this.cdr.detectChanges();

        if (this.progress >= 100) {
          this.clearTimer();
          setTimeout(() => this.router.navigateByUrl('/presentation'), 200);
        }
      });
    }, tickMs);
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (this.state !== 'idle') return;

    const isEnter = e.key === 'Enter';
    const isSpace = e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space';

    if (isEnter || isSpace) {
      e.preventDefault(); // evita scroll com espaço
      this.start();
    }
  }
}
