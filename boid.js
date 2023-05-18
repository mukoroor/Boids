import Vector from "./vector.js";

export default class Boid {
    static boidSet = new Set();
    #xPos;
    #yPos;
    #directionVector;
    #collisionChecked = new Set();
    static viewAngle

    constructor(xPos = 0, yPos = 0) {
        this.#xPos = xPos;
        this.#yPos = yPos;
        this.#directionVector = new Vector(Boid.random(), Boid.random());
        Boid.boidSet.add(this);
        //how do i draw on canvas again??
    }
    
    static random() {
        return Math.random() * 2 - 1;
    }

    incrementPosition() {
        const modToBounds = (number, max) => {
            if (number > max) {
                return number % max;
            } else if (number < 0) {
                return max + (number % max);
            } else {
                return number;
            }
        }
        this.#xPos = modToBounds(this.#xPos + 0.1 * this.#directionVector.getXHat(), 4100);
        this.#yPos = modToBounds(this.#yPos + 0.1 * this.#directionVector.getYHat(), 2300);
    }
    
    getXPos() {
        return this.#xPos
    }

    getYPos() {
        return this.#yPos
    }
    
    getVector() {
        return this.#directionVector
    }

    getCollisionChecked() {
        return this.#collisionChecked;
    }

    resetCollisionChecked() {
        this.#collisionChecked = new Set();
    }

    static isBoidAhead(a, b) {
        var vectorToPoint = [
            b.getXPos() - a.getXPos(),
            b.getYPos() - a.getXPos()
        ];
          
        var dotProduct = a.getVector().getXHat() * vectorToPoint[0] +
                            a.getVector().getYHat() * vectorToPoint[1];          
        return dotProduct > 0;
    }

    avoidCollision() {
        const closeVectors = new Map()
        Boid.boidSet.forEach(boid => {
            if (boid != this) {
                const distance = Vector.calculateMagnitude(boid.getXPos() - this.getXPos(), boid.getYPos() - this.getYPos())
                if (distance < 500) {
                    
                }
                if (distance < 200  && !this.#collisionChecked.has(boid)) {
                    boid.getCollisionChecked().add(this);
                    this.#collisionChecked.add(boid);
                    closeVectors.set(distance, boid)
                }
            }
        })

        let totalVectX = 0;
        let totalPosX = 0;
        let totalVectY = 0;
        let totalPosY = 0;
        let avoidVectX = 0;
        let avoidVectY = 0;
        closeVectors.forEach((boid, distance) => {
            if (distance < 150) {
                avoidVectX += (this.getXPos() - boid.getXPos()) 
                avoidVectY += (this.getYPos() - boid.getYPos()) 
            }
            totalVectX += boid.getVector().getXHat()
            totalPosX += boid.getXPos()
            totalVectY += boid.getVector().getYHat()
            totalPosY += boid.getYPos()
        })
        const avoidVect = new Vector(avoidVectX, avoidVectY);
        const avgVect = new Vector(totalVectX, totalVectY)
        const avgPosition = new Vector(totalPosX / closeVectors.size - this.getXPos(), totalPosY / closeVectors.size - this.getYPos())
        this.#directionVector = Vector.add(this.#directionVector, Vector.add(Vector.add(avgVect, avoidVect), Vector.add(avgPosition, avoidVect, 0.5, 1)), 1, 0.1);
        // this.#directionVector = Vector.add(this.#directionVector, avoidVect, 1, 1);
        // this.#collisionChecked = true;
    }
}