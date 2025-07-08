// =======================
// ANIMACIÓN DEL CANVAS
// =======================

// Clase Bola
class Bola {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radio = 6;
    this.dx = (Math.random() - 0.5) * 8;
    this.dy = (Math.random() - 0.5) * 8;
  }

  dibujar(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    ctx.fillStyle = "#f581c4";
    ctx.fill();
    ctx.closePath();
  }

  mover() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radio > innerWidth || this.x - this.radio < 0) {
      this.dx *= -1;
    }
    if (this.y + this.radio > innerHeight || this.y - this.radio < 0) {
      this.dy *= -1;
    }
  }
}

// Clase Corazon
class Corazon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 12;
    this.dx = (Math.random() - 0.5) * 6;
    this.dy = (Math.random() - 0.5) * 6;
  }

  dibujar(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    const s = this.size;
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -s, -s, -s, -s, 0);
    ctx.bezierCurveTo(-s, s, 0, s * 1.5, 0, s * 2);
    ctx.bezierCurveTo(0, s * 1.5, s, s, s, 0);
    ctx.bezierCurveTo(s, -s, 0, -s, 0, 0);
    ctx.fillStyle = "#f341a8";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  mover(canvas) {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.dx *= -1;
    }
    if (this.y + this.size * 2 > canvas.height || this.y - this.size < 0) {
      this.dy *= -1;
    }
  }
}

// Configuración del canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let corazones = [];
let bolas = [];

for (let i = 0; i < 50; i++) {
  corazones.push(new Corazon(canvas.width / 2, canvas.height / 2));
}

for (let i = 0; i < 30; i++) {
  bolas.push(new Bola(Math.random() * canvas.width, Math.random() * canvas.height));
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  corazones.forEach(c1 => {
    corazones.forEach(c2 => {
      const dx = c2.x - c1.x;
      const dy = c2.y - c1.y;
      const dist2 = dx * dx + dy * dy;
      if (dist2 < 150 * 150) {
        ctx.beginPath();
        ctx.moveTo(c1.x, c1.y);
        ctx.lineTo(c2.x, c2.y);
        ctx.strokeStyle = "rgba(255, 0, 0, 0.15)";
        ctx.stroke();
        ctx.closePath();
      }
    });

    c1.mover(canvas);
    c1.dibujar(ctx);
  });

  bolas.forEach(bola => {
    bola.mover();
    bola.dibujar(ctx);
  });

  requestAnimationFrame(animar);
}

animar();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  corazones = [];
  for (let i = 0; i < 50; i++) {
    corazones.push(new Corazon(canvas.width / 2, canvas.height / 2));
  }

  bolas = [];
  for (let i = 0; i < 30; i++) {
    bolas.push(new Bola(Math.random() * canvas.width, Math.random() * canvas.height));
  }
});


// =======================
// CARRUSEL AUTOMÁTICO
// =======================

const carrusel = document.getElementById("carrusel");
let index = 0;
const totalSlides = carrusel.children.length;
let intervalo;

function mostrarSlide(i) {
  index = (i + totalSlides) % totalSlides;
  carrusel.style.transform = `translateX(-${index * 100}%)`;
}

function moverCarrusel(direccion) {
  mostrarSlide(index + direccion);
}

function iniciarAutoSlide() {
  intervalo = setInterval(() => {
    moverCarrusel(1);
  }, 4000);
}

carrusel.addEventListener("mouseenter", () => clearInterval(intervalo));
carrusel.addEventListener("mouseleave", iniciarAutoSlide);

mostrarSlide(0);
iniciarAutoSlide();


console.log("JS cargado correctamente");

window.onload = () => {
  alert("Hola, el JS se está ejecutando 🎉");
};
