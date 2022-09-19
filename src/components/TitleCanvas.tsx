import { onCleanup, onMount } from 'solid-js';
import { sign } from 'solid-start/session/cookieSigning';

export default function TitleCanvas() {
  let canvasRef;

  let intervals = [];

  onMount(() => {
    const ctx = canvasRef.getContext('2d');

    // Set canvas size
    canvasRef.width = window.innerWidth * 3;
    canvasRef.height = window.innerHeight * 3;

    ctx.lineCap = 'round';

    let particles = [];

    const PARTICLE_COUNT = 2000;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 0.5 * Math.max(canvasRef.width, canvasRef.height);

      particles.push(new Particle(canvasRef.width / 2 + radius * Math.cos(theta), canvasRef.height / 2 + radius * Math.sin(theta)));
    }

    let colorTheme = COLOR_THEME_BLUE;

    intervals.push(
      setInterval(() => {
        particles.forEach((p) => {
          p.update(ctx, colorTheme);
        });
      }, 1000 / 60)
    );

    let circle = true;
    colorTheme = COLOR_THEME_BLUE;
    periodDivisor = 2000;

    intervals.push(
      setInterval(() => {
        if (circle) {
          colorTheme = COLOR_THEME_RED;
          periodDivisor = 200;
        } else {
          colorTheme = COLOR_THEME_BLUE;
          periodDivisor = 2000;
        }

        circle = !circle;
      }, 1000 * 10)
    );
  });

  onCleanup(() => {
    intervals.forEach(clearInterval);
  });

  return <canvas class="title-canvas" ref={canvasRef} />;
}

const COLOR_THEME_BLUE = ['#71fff6', '#71ffcb', '#71ff9e', '#71ff71'];
const COLOR_THEME_RED = ['#ff7171', '#ff9e71', '#ffcb71', '#fff671'];

let periodDivisor = 2000;
const MULTIPLIER = 3;

class Particle {
  x: number;
  y: number;

  lastX: number;
  lastY: number;

  radius: number;
  colorIndex: number;
  speed: number;
  direction: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;

    this.radius = Math.random() * 2 + 5;
    this.colorIndex = Math.floor(Math.random() * COLOR_THEME_BLUE.length);
    this.speed = Math.random() * 0.5 + 1.5;
    this.direction = Math.random() > 0.5 ? 1 : -1;
  }

  draw(ctx: CanvasRenderingContext2D, colorTheme = COLOR_THEME_BLUE) {
    ctx.beginPath();
    ctx.moveTo(this.lastX, this.lastY);
    ctx.strokeStyle = colorTheme[this.colorIndex];
    ctx.lineWidth = this.radius;
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }

  update(ctx: CanvasRenderingContext2D, colorTheme = COLOR_THEME_BLUE) {
    this.draw(ctx, colorTheme);

    this.lastX = this.x;
    this.lastY = this.y;

    this.x += getDeltaX(this, ctx) * this.speed * this.direction;
    this.y += getDeltaY(this, ctx) * this.speed * this.direction;
  }
}

function getDeltaX(p: Particle, ctx: CanvasRenderingContext2D) {
  return Math.sin((p.y - ctx.canvas.height / 2) / periodDivisor) * MULTIPLIER;
}

function getDeltaY(p: Particle, ctx: CanvasRenderingContext2D) {
  return -Math.sin((p.x - ctx.canvas.width / 2) / periodDivisor) * MULTIPLIER;
}
