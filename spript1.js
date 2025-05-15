class Bola {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radio = 6; // Tamaño reducido de las bolas

        // Velocidades más rápidas
        this.dx = (Math.random() - 0.5) * 8; // Velocidad aleatoria en X
        this.dy = (Math.random() - 0.5) * 8; // Velocidad aleatoria en Y
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = "#f581c4"; // Color personalizado
        ctx.fill();
        ctx.closePath();
    }

    mover() {
        this.x += this.dx;
        this.y += this.dy;

        // Detectar colisión con los bordes del lienzo
        if (this.x + this.radio > innerWidth || this.x - this.radio < 0) {
            this.dx *= -1; // Invertir dirección en X
        }
        if (this.y + this.radio > innerHeight || this.y - this.radio < 0) {
            this.dy *= -1; // Invertir dirección en Y
        }
    }
}