import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-pixel-rain',
  imports: [],
  templateUrl: './pixel-rain.html',
  styleUrl: './pixel-rain.scss',
  standalone: true,
})
export class PixelRain implements AfterViewInit {
  @ViewChild('canvasBack', { static: true }) canvasBackRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasFront', { static: true }) canvasFrontRef!: ElementRef<HTMLCanvasElement>;

  private ctxBack!: CanvasRenderingContext2D;
  private ctxFront!: CanvasRenderingContext2D;

  private pixels: any[] = [];
  private animationId!: number;

  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const back = this.canvasBackRef.nativeElement;
    const front = this.canvasFrontRef.nativeElement;

    this.ctxBack = back.getContext('2d')!;
    this.ctxFront = front.getContext('2d')!;

    this.resizeCanvas();
    this.createPixels();
    this.animate();
  }

  @HostListener('window:resize')
  resizeCanvas() {
    const back = this.canvasBackRef.nativeElement;
    const front = this.canvasFrontRef.nativeElement;

    back.width = window.innerWidth;
    back.height = window.innerHeight;

    front.width = window.innerWidth;
    front.height = window.innerHeight;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const offsetX = (event.clientX / window.innerWidth - 0.5) * 30;
    const offsetY = (event.clientY / window.innerHeight - 0.5) * 30;

    const t = `translate(${offsetX}px, ${offsetY}px)`;
    this.canvasBackRef.nativeElement.style.transform = t;
    this.canvasFrontRef.nativeElement.style.transform = t;
  }

  private createPixels() {
    const count = 300;

    const colors = [
      '#ff595e', // vermelho vibrante
      '#ffca3a', // amarelo solar
      '#8ac926', // verde limão
      '#1982c4', // azul vivo
      '#6a4c93', // roxo
      '#ff9f1c', // laranja forte
      '#f94144', // vermelho intenso
      '#4cc9f0', // azul claro
      '#4361ee', // azul royal
      '#7209b7', // roxo profundo
      '#3a0ca3', // azul violeta
      '#f3722c', // laranja queimado
    ];

    this.pixels = Array.from({ length: count }, () => {
      const isNear = Math.random() > 0.82; // ~18% perto
      const size = isNear ? 6 : 2;
      const isFront = Math.random() < 0.101; // 10% escapam pra frente (ajuste!)

      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size,
        depth: isNear ? 1 : 0,
        speed: isNear ? Math.random() * 3 + 1.5 : Math.random() * 1 + 0.4,
        opacity: isNear ? Math.random() * 0.45 + 0.35 : Math.random() * 0.35 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        layer: isFront ? 'front' : 'back',
      };
    });
  }

  private animate = () => {
    const back = this.canvasBackRef.nativeElement;
    const front = this.canvasFrontRef.nativeElement;

    // BACK: com rastro
    this.ctxBack.fillStyle = 'rgba(3, 7, 15, 0.7)';
    this.ctxBack.fillRect(0, 0, back.width, back.height);

    // FRONT: transparente (sem rastro)
    this.ctxFront.clearRect(0, 0, front.width, front.height);

    for (const pixel of this.pixels) {
      // desenha no canvas correto
      const ctx = pixel.layer === 'front' ? this.ctxFront : this.ctxBack;

      ctx.globalAlpha = pixel.opacity;
      ctx.fillStyle = pixel.color;
      ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);

      // atualiza movimento 1x só (independente da camada)
      pixel.y += pixel.speed;

      if (pixel.y > back.height) {
        pixel.y = -pixel.size;
        pixel.x = Math.random() * back.width;
      }
    }

    this.ctxBack.globalAlpha = 1;
    this.ctxFront.globalAlpha = 1;

    this.animationId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }
}
