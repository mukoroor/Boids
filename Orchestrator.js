import Boid from "./boid.js";

const canvas = document.getElementById("environment");
let context;
if (canvas.getContext) {
    context = canvas.getContext("2d");
    context.lineWidth = 1;
    fillBoidSet(100);
    window.requestAnimationFrame(draw)
}

function fillBoidSet(count) {
    for (let i = 0; i < count; i++) {
        new Boid(Math.floor(Math.random() * 3000 + 500), Math.floor(Math.random() * 1500 + 500));
    }
}


function draw() {
    let i = 0;
    context.clearRect(0, 0, 3840, 2160);
    Boid.boidSet.forEach(boid => {
        drawArrow(boid, 40, 10, i++ < 5 ? 'red': 'white');
        boid.resetCollisionChecked();
        boid.avoidCollision();
    });

    Boid.boidSet.forEach(boid => boid.incrementPosition())
    window.requestAnimationFrame(draw)
}

function drawArrow(boid, fullLength, tailReach, color = 'black') {
    context.save();
    context.translate(boid.getXPos(), boid.getYPos());
    const angle = Math.atan2(boid.getVector().getYHat(), boid.getVector().getXHat());
    context.rotate(angle);
    context.beginPath();
    // context.arc(boid.getXPos(), boid.getYPos(), fullLength, 0, 2 * Math.PI);
    context.moveTo(0, 0);
    context.lineTo(- tailReach, -Math.sqrt(3) * tailReach);
    context.lineTo(fullLength - tailReach, 0);
    context.lineTo(-tailReach, Math.sqrt(3) * tailReach);
    context.closePath();
    context.fillStyle = color
    context.fill();
    context.stroke();
    context.restore();
}
  
  