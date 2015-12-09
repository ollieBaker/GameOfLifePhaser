(function() {
    'use strict';

    function Game() {}

    Game.prototype = {
        create: function() {

            this.isRunning = false;

            this.CELL_SIZE = 2;
            this.GRID_SIZE = Math.floor(this.game.height / this.CELL_SIZE);

            this.grid = [];
            this.neighbours = [];

            //simple points object to store relative cell positions in
            var Point = function(x, y) {
                return {
                    x: x,
                    y: y
                }
            }

            this.neighbours.push(new Point(-1, -1));
            this.neighbours.push(new Point(0, -1));
            this.neighbours.push(new Point(1, -1));
            this.neighbours.push(new Point(-1, 0));
            this.neighbours.push(new Point(1, 0));
            this.neighbours.push(new Point(-1, 1));
            this.neighbours.push(new Point(0, 1));
            this.neighbours.push(new Point(1, 1));

            //populate our grid with cells
            for (var x = 0; x < this.GRID_SIZE; x++) {
                for (var y = 0; y < this.GRID_SIZE; y++) {
                    var cell = new Cell(this.game, x, y, this.CELL_SIZE);
                    //use a flat 2D array structure to minimise array access
                    this.grid[x * this.GRID_SIZE + y] = cell;
                };
            };

            //start the simulation after the user's clicked, also allows pausing the sim
            this.input.onDown.add(this.onInputDown, this);
        },

        update: function() {
            var GRID_SIZE = this.GRID_SIZE;

            if (this.isRunning) {

                //loop through and check each cells neighbours and set its display appropriately
                for (var x = 0; x < GRID_SIZE; x++) {
                    for (var y = 0; y < GRID_SIZE; y++) {
                        var cell = this.grid[x * GRID_SIZE + y];
                        this.check(cell, x, y);
                        cell.updateDisplay();
                    }
                }

                //loop again and cell the state of the cell
                for (x = 0; x < GRID_SIZE; x++) {
                    for (y = 0; y < GRID_SIZE; y++) {
                        var cell = this.grid[x * GRID_SIZE + y];
                        cell.setState();
                    }
                }

            }
        },

        check: function(cell, x, y) {

            var neighboursAlive = 0;

            for (var i = 0; i < 8; i++) {

                if (this.retrieve(x + this.neighbours[i].x, y + this.neighbours[i].y)) {

                    neighboursAlive++;

                    if (neighboursAlive > 3) {
                        break;
                    }
                }
            }

            cell.setNextState(neighboursAlive);
        },

        retrieve: function(x, y) {

            var isAlive = false;
            var GRID_SIZE = this.GRID_SIZE;

            if (x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE) {
                isAlive = this.grid[x * GRID_SIZE + y].isAlive;
            }
            return isAlive;

        },

        onInputDown: function() {
            this.isRunning = !this.isRunning;
        }
    };

    window['gameoflifephaser'] = window['gameoflifephaser'] || {};
    window['gameoflifephaser'].Game = Game;
}());
