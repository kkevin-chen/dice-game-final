// Dice Game
'use strict';

// Global Variables
let fundAmount = 5000;


// Part 1

// Event Listeners
document.getElementById('play-btn').addEventListener('click', rollDie);
document.getElementById('play-btn').addEventListener('click', checkNegative); // Checks if funds are negative

// Event Function: Roll Die
function rollDie() {
    let betAmount = Number(document.getElementById('bet-input').value); // Get in 'bet' box
    
    // Check bet amount (control bet minimum/maximum)
    if (betAmount < 5) {
        alert('Are you trying to waste my time? Bet at least $5!');
    } else if (betAmount > 10000) {
        alert('That kind of money isn\'t allowed here! Max bet is set at $10000. ');
    } else {

        // Play Dice Rolling sound
        let rollSound = document.getElementById('dice-roll');
        rollSound.currentTime = 0;
        rollSound.play();

        // Roll Die (1-6)
        let houseRoll1 = Math.floor((6 * Math.random()) + 1);
        let houseRoll2 = Math.floor((6 * Math.random()) + 1);
        let yourRoll1 = Math.floor((6 * Math.random()) + 1);
        let yourRoll2 = Math.floor((6 * Math.random()) + 1);

        // Display die images
        document.getElementById('house-die1').src = 'media/' + houseRoll1 + '.png';
        document.getElementById('house-die2').src = 'media/' + houseRoll2 + '.png';

        document.getElementById('player-die1').src = 'media/' + yourRoll1 + '.png';
        document.getElementById('player-die2').src = 'media/' + yourRoll2 + '.png';

        // Add total of both die
        let winLose;
        let winAlert = document.getElementById('win-alert');
        let houseTotal = houseRoll1 + houseRoll2;
        let yourTotal = yourRoll1 + yourRoll2;

        document.getElementById('total-house').innerHTML = houseTotal;
        document.getElementById('total-player').innerHTML = yourTotal;

        // Compare Totals and display results
        if (houseTotal < yourTotal) {
            fundAmount += betAmount;
            winLose = 'You Win!';
            winAlert.style.color = 'green';
        } else if (houseTotal > yourTotal) {
            fundAmount -= betAmount;
            winAlert.style.color = 'red';
            winLose = 'You Lose.';
        } else {
            winLose = 'Tie.';
            winAlert.style.color = 'black';
        }
        document.getElementById('funds').innerHTML = fundAmount;
        winAlert.innerHTML = '<strong>' + winLose + '</strong>';
    }
}

// Check if funds are negative
function checkNegative() {
    if (fundAmount < 0) {
        alert('You are in debt. You can no longer place bets.');
        document.getElementById('play-btn').removeEventListener('click', rollDie);
        document.getElementById('funds').style.color = 'red'
    }
}


// Part 2

// Add Event Listener
document.getElementById('purchase-btn').addEventListener('click', purchaseItem);

// Event Function 
function purchaseItem() {

    // Variables
    let lootImage;
    let lootName;

    // Choose Item to give based on funds
    if (fundAmount < 1000) {
        lootImage = 'socks.png';
        lootName = 'some socks. Eww.';
    } else if (fundAmount <= 5000) {
        let lootFactor = 3 * Math.random();
        fundAmount -= 1000

        if (lootFactor < 1) {
            lootImage = 'ring.png';
            lootName = 'a ring!';
        } else if (lootFactor < 2) {
            lootImage = 'bike.jpg';
            lootName = 'a bike!';
        } else {
            lootImage = 'trip.jpg';
            lootName = 'a trip!';
        }
    } else {
        let lootFactor = 4 * Math.random();
        fundAmount -= 5000

        if (lootFactor < 1) {
            lootImage = 'motorcycle.jpg';
            lootName = 'a motorcycle!!!';
        } else if (lootFactor < 2) {
            lootImage = 'house.png';
            lootName = 'a house!!!';
        } else if (lootFactor < 3) {
            lootImage = 'boat.png';
            lootName = 'a boat!!!';
        } else {
            lootImage = 'car.png';
            lootName = 'a car!';
        }
    }

    // Display results
    document.getElementById('loot').innerHTML += '<img class="lootImage" src="media/' + lootImage + '">';
    document.getElementById('funds').innerHTML = fundAmount;
    document.getElementById('inform-text').style.visibility = 'visible';
    document.getElementById('loot-name').innerHTML = lootName;
}
