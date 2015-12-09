var Cell = function(game, x, y, size) {
    Phaser.Image.call(this, game, x * size, y * size, 'shapes', 'Square');

    this.width = this.height = size;

    this.game = game;
    this.isAlive = false;
    this.willBeAlive = false;
    this.visible = false;
    if (Math.random() < 0.5) {
        this.isAlive = true;
        this.willBeAlive = true;
        this.visible = true;
    }

    this.game.add.existing(this);
};

Cell.prototype = Object.create(Phaser.Image.prototype);
Cell.prototype.constructor = Cell;

Cell.prototype.reset = function() {
    this.isAlive = false;
    this.willBeAlive = false;
    this.visible = false;
    if (Math.random() < 0.5) {
        this.isAlive = true;
        this.willBeAlive = true;
        this.visible = true;
    }
};

Cell.prototype.update = function() {};

Cell.prototype.setState = function() {

    if (this.willBeAlive) {
        this.willBeAlive = false;
        this.isAlive = true;
    } else {
        this.willBeAlive = false;
        this.isAlive = false;
    }

};

Cell.prototype.updateDisplay = function() {
    if (this.willBeAlive) {
        this.visible = true;
    } else {
        this.visible = false;
    }
};

Cell.prototype.setNextState = function(neighboursAlive) {

    if (neighboursAlive === 3) {
        this.willBeAlive = true;
    } else if (neighboursAlive === 2) {
        if (this.isAlive) {
            this.willBeAlive = true;
        } else {
            this.willBeAlive = false;
        }
    } else {
        this.willBeAlive = false;
    }

};
