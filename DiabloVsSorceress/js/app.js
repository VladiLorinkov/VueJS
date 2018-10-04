new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.turns = [];
        },

        attack: function () {
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Sorceress attacked with ' + damage + " damage!"
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },

        specialAttack: function () {
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Sorceress attacked with ' + damage + " damage!"
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },

        heal: function () {
            if (this.playerHealth < 100) {
                let healing = this.calculateDamage(23, 25);
                this.playerHealth += healing;
                if (this.playerHealth > 100) {
                    this.playerHealth = 100;
                }
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Sorceress healed with ' + healing + " health!"
                });
            } else {
                alert('The sorceress is at max health')
                return;
            }

            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },

        giveUp: function () {
            if (!confirm('The duel was rough? Are you sure you give up?')) {
                this.startGame();
            } else {
                this.gameIsRunning = false;
            }
        },
        monsterAttacks: function () {
            let damage = this.calculateDamage(9, 17);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Diablo attacked with ' + damage + " damage!"
            });
            this.checkWin();
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('Sorceress won! Do you want to play another game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('Diablo won! Do you want to play another game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});