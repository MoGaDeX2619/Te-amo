// Clase para dibujar corazones
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

    mover() {
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

  // Crear corazones desde el centro
  for (let i = 0; i < 50; i++) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    corazones.push(new Corazon(x, y));
  }

  // Animación
  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    corazones.forEach(corazon => {
      corazones.forEach(corazon2 => {
        let dx = corazon2.x - corazon.x;
        let dy = corazon2.y - corazon.y;
        let dist = Math.sqrt(dx ** 2 + dy ** 2);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(corazon.x, corazon.y);
          ctx.lineTo(corazon2.x, corazon2.y);
          ctx.strokeStyle = "rgba(255, 0, 0, 0.15)";
          ctx.stroke();
          ctx.closePath();
        }
      });

      corazon.mover();
      corazon.dibujar(ctx);
    });

    requestAnimationFrame(animar);
  }

  animar();

  // Ajustar canvas al redimensionar la ventana
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });