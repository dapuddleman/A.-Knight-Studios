let particles = [];
const numParticles = 150; // A good number for a subtle effect
const repulsionRadius = 60; // How close the mouse needs to be to affect particles
const repulsionStrength = 0.5; // How strongly the particles are pushed

function setup() {
    let canvasContainer = document.getElementById('p5-canvas-container');
    let canvas = createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    canvas.parent('p5-canvas-container');

    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
    background(31, 33, 36);

    // Create a vector for the mouse position
    let mouse = createVector(mouseX, mouseY);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.update();
        p.show();
        p.edges();

        // Check for mouse interaction only on devices with a hover state
        if (matchMedia('(hover: hover)').matches) {
            let d = dist(p.pos.x, p.pos.y, mouseX, mouseY);
            if (d < repulsionRadius) {
                // Create a repulsion force vector pointing away from the mouse
                let force = p5.Vector.sub(p.pos, mouse);
                force.setMag(repulsionStrength);
                p.applyForce(force);
            }
        }

        // If a particle's lifespan is over, replace it with a new one
        if (p.isDead()) {
            particles[i] = new Particle(random(width), random(height));
        }
    }
}

function windowResized() {
    let canvasContainer = document.getElementById('p5-canvas-container');
    resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
}

class Particle {
    constructor(x, y) {
        // Use a random angle for initial velocity to go in any direction
        this.vel = p5.Vector.fromAngle(random(TWO_PI), random(0.1, 0.4));
        this.pos = createVector(x, y);
        this.acc = createVector(0, 0); // Acceleration starts at 0
        this.lifespan = random(200, 500); // Each particle has a random lifespan
        this.maxLifespan = this.lifespan;
        this.size = random(1.5, 4);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    isDead() {
        return this.lifespan < 0;
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0); // Reset acceleration each frame
        this.lifespan -= 1.0;
    }

    show() {
        noStroke();
        // The particle's opacity fades in and out with its lifespan
        let currentAlpha = map(sin(map(this.lifespan, 0, this.maxLifespan, 0, PI)), 0, 1, 0, 200);
        fill(255, 255, 255, currentAlpha);
        circle(this.pos.x, this.pos.y, this.size);
    }

    // Instead of bouncing, particles wrap around to the other side
    edges() {
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }
}