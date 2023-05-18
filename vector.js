export default class Vector {
    #xHat;
    #yHat;

    constructor(xDirection, yDirection) {
        const magnitude = Vector.calculateMagnitude(xDirection, yDirection);
        this.#xHat = xDirection / magnitude || 0;
        this.#yHat = yDirection / magnitude || 0;
    }

    static calculateMagnitude(x = this.#xHat, y = this.#yHat) {
        return Math.sqrt(x * x + y * y);
    }

    static add(a, b, scaleX = 1, scaleY = 1) {
        let x = scaleX * a.getXHat() + scaleY * b.getXHat();
        let y = scaleX * a.getYHat() + scaleY * b.getYHat();
        return new Vector(x, y);
    }

    getXHat() {
        return this.#xHat;
    }

    getYHat() {
        return this.#yHat;
    }

    //will come back if needed
}