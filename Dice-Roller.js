// Class is representing a dice
class dice{
    constructor(slides){
        this.sides = sides;
    }

    // method to roll the dice and get a random value
    roll(){
        return Math.floor(Math.random() * this.sides) + 1;
    }
}

// This class representing monster
class Monster{
    constructor(name, minRoll, maxRoll){
        this.name = name;
        this.minRoll = minRoll;
        this.maxRoll = maxRoll;
    }

    // static method to get the appropriate the monster summon based on dice roll
    static getMonsterByRoll(roll){
        if (roll >= 1 && roll <=2) {
            return new Monster("Kuriboh", 1, 2, '/mnt/data/Kurbioh.jpg');
        } else if (roll >= 3 && roll <= 4){
            return new Monster("Dark Magican", 3, 4, '/mnt/data/DarkMagican.jpg');
        } else if (roll >=5 && roll <=6){
            return new monster("Slifer the Sky Dragon", 5, 6, '/mnt/data/SliferTheSkyDragon.jpg');
        }
        return null;
    }
}

// class is representing dice roller
class DiceRoller {
    constructor(apiUrl, dice){
        this.apiUrl = apiUrl;
        this.dice = dice;
    }

    async rollDice(){
        try {
            const rollValue = this.dice.roll();
            const monster = Monster.getMonsterByRoll(rollValue);
            this.displayResult(rollValue, monster.name);
            await this.callapi();
        } catch (error) {
            console.error('Error rolling the dice;',error);
            this.displayResult('Error','Failed to roll the dice')
        }
    }

    // Method to show the result
    displayResult(diceRoll, monster) {
        const resultElement = document.getElementById('result');
        resultElement.textContent = 'You rolled a ${diceRoll} and got ${monster} !';
    }


    async callApi() {
        try {
            const response = await fetch('${this.apiUrl}/roll');
            const data = await response.json()
            console.log('Api Response:' , data)
        } catch (error) {
            console.error('Failed to call remote API:', error);
        }
    }
}

// Initialize the Dice object with a 6-sided die
const dice = new Dice(6);

// Initialize the DiceRoller object with the API URL and the Dice object
const diceRoller = new DiceRoller('https://your-azure-site-url', dice);

// Event listener for the roll dice button
document.querySelector('.roll-button').addEventListener('click', () => {
    diceRoller.rollDice();
});