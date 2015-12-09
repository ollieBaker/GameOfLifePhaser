(function() {
    'use strict';

    function Game() {}

    Game.prototype = {
        create: function() {

            this.isRunning = false;

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
            this.offsetX = (this.game.width - (this.GRID_SIZE * this.CELL_SIZE)) / 2;

            //keep track of which cells have been created since we don't use a loop
            this.xPop = 0;
            this.yPop = 0;

            //create a timer so we can track when all cells are complete
            var chunkTimer = this.game.time.create(false);
            chunkTimer.onComplete.addOnce(function() {
                //start the sim and allow the user control;
                this.addEventListeners();
                this.isRunning = true;
            }, this);

            //run the timer ~every frame, create one row at a time;
            chunkTimer.repeat(1 / 60, this.GRID_SIZE, this.populateGrid, this);
            chunkTimer.start();
            
        },

        populateGrid: function() {
            for (var i = 0; i <= this.GRID_SIZE; i++) {

                //manually incrementing our array index since were not using a nested loop.
                if (this.xPop < this.GRID_SIZE) {

                    var cell = new Cell(this.game, this.xPop, this.yPop, this.CELL_SIZE);
                    cell.x += this.offsetX;
                    //use a flat 2D array structure to minimise array access
                    this.grid[this.xPop * this.GRID_SIZE + this.yPop] = cell;
                    this.xPop++;

                } else {
                    this.xPop = 0;
                    this.yPop++;
                }
            };
        },

        addEventListeners: function () {
            this.input.onDown.add(this.togglePause, this);

            var restartBtn = document.getElementById('restartBtn');
            restartBtn.onclick = this.restart.bind(this);

            var pauseBtn = document.getElementById('pauseBtn');
            pauseBtn.onclick = this.togglePause.bind(this);
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

        restart: function() {
            var GRID_SIZE = this.GRID_SIZE;
            for (var x = 0; x < GRID_SIZE; x++) {
                for (var y = 0; y < GRID_SIZE; y++) {
                    var cell = this.grid[x * GRID_SIZE + y];
                    cell.reset();
                }
            }
        },

        togglePause: function() {
            var pauseBtn = document.getElementById('pauseBtn');
            pauseBtn.innerHTML = this.isRunning ? "Play" : "Pause";
            this.isRunning = !this.isRunning;
        }
    };

    window['gameoflifephaser'] = window['gameoflifephaser'] || {};
    window['gameoflifephaser'].Game = Game;
}());
