import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
  OnDestroy,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
}

@Component({
  selector: 'app-fun-section',
  imports: [],
  templateUrl: './fun-section.html',
  styleUrl: './fun-section.scss',
})
export class FunSection implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;

  private canvasWidth!: number;
  private canvasHeight = 250;

  // Personagem
  private player = { x: 100, y: 180, size: 24, sprite: new Image() };

  // Partículas
  private particles: Particle[] = [];
  private particleColors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.canvasWidth = canvas.width = window.innerWidth;
    canvas.height = this.canvasHeight;

    // Sprite do personagem (pode ser qualquer imagem pixelada)
    this.player.sprite.src = 'pixelchar.png'; // substitua pela sua imagem

    this.createParticles();
    this.animate();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const targetX = event.clientX - this.player.size / 2;
    const targetY = event.clientY - this.player.size / 2;
    this.player.x += (targetX - this.player.x) * 0.1;
    this.player.y += (targetY - this.player.y) * 0.1;
  }

  private createParticles() {
    const count = 50;
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * this.canvasWidth,
      y: Math.random() * this.canvasHeight,
      size: Math.random() * 3 + 1,
      color: this.particleColors[Math.floor(Math.random() * this.particleColors.length)],
      speed: Math.random() * 1 + 0.2,
      opacity: Math.random() * 0.6 + 0.3,
    }));
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;

    // Fundo pixelado escuro com leve transparência
    this.ctx.fillStyle = 'rgba(16,16,32,0.6)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar partículas (sparkles)
    this.particles.forEach((p) => {
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillRect(p.x, p.y, p.size, p.size);

      p.y += p.speed;
      if (p.y > canvas.height) {
        p.y = -p.size;
        p.x = Math.random() * canvas.width;
      }
    });

    this.ctx.globalAlpha = 1;

    // Desenhar personagem sprite
    if (this.player.sprite.complete) {
      this.ctx.drawImage(
        this.player.sprite,
        this.player.x,
        this.player.y,
        this.player.size,
        this.player.size,
      );
    } else {
      // fallback: quadrado pixel
      this.ctx.fillStyle = '#ff595e';
      this.ctx.fillRect(this.player.x, this.player.y, this.player.size, this.player.size);
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }
}
