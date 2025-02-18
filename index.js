/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++) {
        
        // create a new div element, which will become the game card
        const newDiv = document.createElement("div");
        newDiv.classList.add("game-card");
        newDiv.innerHTML = `<h3>${games[i].name}</h3>
        <p>${games[i].description}</p>
        <img src="${games[i].img}" class="game-img">`;

        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        gamesContainer.append(newDiv);
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON)
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
// use reduce() to count the number of total contributions by summing the backers
contributionsCard.innerHTML = `<div> ${GAMES_JSON.reduce((acc, game)=> {
    return acc + game.backers;
}, 0).toLocaleString()}<\div>`;

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game)=> {
    return acc + game.pledged;
}, 0)
raisedCard.innerHTML = `<div>$${totalRaised.toLocaleString()}<\div>`;
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `<div>${GAMES_JSON.length.toLocaleString()}<\div>`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const filteredGames = GAMES_JSON.filter((game)=> game.pledged < game.goal)
    console.log(filteredGames.length)
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(filteredGames)
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const filteredGames = GAMES_JSON.filter((game)=> game.pledged >= game.goal)
    console.log(filteredGames.length)
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(filteredGames)

    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
    // add all games from the JSON data to the DOM
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfunded = GAMES_JSON.filter((game)=> game.pledged < game.goal).length
const numFunded = GAMES_JSON.reduce((sum, game) => sum + (game.pledged >= game.goal), 0)

// create a string that explains the number of unfunded games using the ternary operator

const remainingStr = `There are still ${numUnfunded} unfunded games. We need your help to support these games!`
const thankStr = `Thank you for supporting the development of all these games!`;
const helpStr = `We have raised $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games. ${(numUnfunded != 0) ? remainingStr : thankStr}`;
descriptionContainer.innerHTML = `<p>Sea Monster Crowdfunding is commited to bring a spotlight to small indie games in need of funding and public support!
<br> ${helpStr}</p>`

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameDiv = document.createElement("div");
const secondGameDiv = document.createElement("div");
firstGameDiv.textContent = firstGame.name;
firstGameContainer.appendChild(firstGameDiv);
secondGameDiv.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameDiv);
// do the same for the runner up item