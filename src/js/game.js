(function() {
    'use strict';

    function Game() {}

    Game.prototype = {
        create: function() {

            this.isRunning = true;

            this.CELL_SIZE = 4;
            this.GRID_SIZE = Math.floor(this.game.height / this.CELL_SIZE);


            this.grid = [];
            this.neighbours = [];

            //simple points object to store relative cell positions in the grid
            var Point = function(x, y) {
                return {
                    x: x,
                    y: y
                };
            };

            this.neighbours.push(new Point(-1, -1));
            this.neighbours.push(new Point(0, -1));
            this.neighbours.push(new Point(1, -1));
            this.neighbours.push(new Point(-1, 0));
            this.neighbours.push(new Point(1, 0));
            this.neighbours.push(new Point(-1, 1));
            this.neighbours.push(new Point(0, 1));
            this.neighbours.push(new Point(1, 1));

            //calc offset on x axis so our grid is centered
            var offsetX = (this.game.width - (this.GRID_SIZE*this.CELL_SIZE))/2;

            //populate our grid with cells
            for (var x = 0; x < this.GRID_SIZE; x++) {
                for (var y = 0; y < this.GRID_SIZE; y++) {
                    var cell = new Cell(this.game, x, y, this.CELL_SIZE);
                    cell.x += offsetX;
                    //use a flat 2D array structure to minimise array access
                    this.grid[x * this.GRID_SIZE + y] = cell;
                }
            }

            //start the simulation after the user's clicked, also allows pausing the sim
            this.input.onDown.add(this.onInputDown, this);
        },

        update: function() {
            var GRID_SIZE = this.GRID_SIZE;

            if (this.isRunning) {
                var cell;
                var x;
                var y;
                //loop through and check each cells neighbours and set its display appropriately
                for (x = 0; x < GRID_SIZE; x++) {
                    for (y = 0; y < GRID_SIZE; y++) {
                        cell = this.grid[x * GRID_SIZE + y];
                        this.check(cell, x, y);
                        cell.updateDisplay();
                    }
                }

                //loop again and update the state of the cell
                for (x = 0; x < GRID_SIZE; x++) {
                    for (y = 0; y < GRID_SIZE; y++) {
                        cell = this.grid[x * GRID_SIZE + y];
                        cell.setState();
                    }
                }

            }
        },

        check: function(cell, x, y) {

            var neighboursAlive = 0;

            //loop through all the neighbours and check which are alive.
            //the loop could be unrolled with a speed boost
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

            //check if the cell is in bounds and also alive
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
