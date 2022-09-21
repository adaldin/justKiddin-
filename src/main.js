import { totalJokes, totalScore, getJokeFan } from "./stats.js";
// arrays with objects
const REPORT_ACUDITS = [];
const JOKES = [];
// variables to load on JOKES[x] object
let currentJoke;
let newJoke;
let type = "";
//DOM elements
const JOKE_DOM = document.getElementById("singleJoke");
const JOKE_DOM_ID = document.getElementById("jokeID");
const NEXT_BTN = document.getElementById("nextJoke");
const SCORE_CONTAINER = document.getElementById("jokeScore");
const BUTTON_SCORE_1 = document.getElementById("score1");
const BUTTON_SCORE_2 = document.getElementById("score2");
const BUTTON_SCORE_3 = document.getElementById("score3");

// JOKES APIS FETCHING
async function getNorrisJokes() {
  const ERR = "Failed to conect to API";
  try {
    let type;
    let id;
    const R = await fetch("https://api.chucknorris.io/jokes/random");
    currentJoke = await R.json();
    type = "norris";
    id = JOKES.length;
    let newJoke = new Joke(id, currentJoke.value, type);
    JOKES.push(newJoke);
    return newJoke;
  } catch (ERR) {
    console.log(ERR);
  }
}

async function getDadJokes() {
  try {
    let type;
    let id;

    const R = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/JSON",
      },
    });
    currentJoke = await R.json();
    type = "dad";
    id = JOKES.length;
    let newJoke = new Joke(id, currentJoke.joke, type);
    JOKES.push(newJoke);
    return newJoke;
  } catch (ERR) {
    console.log(ERR);
  }
}

// NEXT JOKE BUTTON EVENT
NEXT_BTN.addEventListener("click", handleNextClick);

async function handleNextClick() {
  if (JOKES.length === 0) {
    currentJoke = await getDadJokes();
    displayJoke(currentJoke);
  } else if (JOKE_DOM.innerText == currentJoke.joke) {
    if (currentJoke.type == "norris") {
      currentJoke = await getDadJokes();
      displayJoke(currentJoke);
    } else if (currentJoke.type == "dad") {
      currentJoke = await getNorrisJokes();
      displayJoke(currentJoke);
    }
  }
}

function displayJoke(currentJoke) {
  JOKE_DOM.innerHTML = currentJoke.joke;
  JOKE_DOM_ID.innerHTML = `#${currentJoke.id}`;
  NEXT_BTN.classList.add("disabled");
  SCORE_CONTAINER.classList.remove("d-none");
  const BG_IMAGE_DOM = document.getElementById("jokeBox");
  changeImage(BG_IMAGE_DOM);
}

function changeImage(BG_IMAGE_DOM) {
  // blob background images
  const BG_IMAGES = [
    `url("./assets/blob.svg")`,
    `url("./assets/blob1.svg")`,
    `url("./assets/blob2.svg")`,
    `url("./assets/blob3.svg")`,
    `url("./assets/blob4.svg")`,
    `url("./assets/blob5.svg")`,
  ];
  let currentImage = BG_IMAGES.findIndex(
    (e) => e == BG_IMAGE_DOM.style.backgroundImage
  );
  if (currentImage >= 0 && currentImage < BG_IMAGES.length - 1) {
    currentImage++;
  } else if (currentImage >= BG_IMAGES.length - 1) {
    currentImage = 0;
  }
  BG_IMAGE_DOM.style.backgroundImage = BG_IMAGES[currentImage];
}

// SCORE BUTTONS EVENTS
BUTTON_SCORE_1.addEventListener("click", handleScoreButton);
BUTTON_SCORE_2.addEventListener("click", handleScoreButton);
BUTTON_SCORE_3.addEventListener("click", handleScoreButton);
// document.addEventListener("click", handleScoreButton);

function handleScoreButton(e) {
  let currentJoke;
  let currentJokeID = parseInt(JOKE_DOM_ID.innerText.slice(1));
  let scoreButton = e.target;
  if (scoreButton.id == "score1") {
    currentJoke = JOKES.find((joke) => joke.id == currentJokeID);
    currentJoke.score = parseInt(scoreButton.value);
    SCORE_CONTAINER.classList.add("d-none");
    NEXT_BTN.classList.remove("disabled");
    generateReport(currentJoke);
  } else if (scoreButton.id == "score2") {
    currentJoke = JOKES.find((joke) => joke.id == currentJokeID);
    currentJoke.score = parseInt(scoreButton.value);
    SCORE_CONTAINER.classList.add("d-none");
    NEXT_BTN.classList.remove("disabled");
    generateReport(currentJoke);
  } else if (scoreButton.id == "score3") {
    currentJoke = JOKES.find((joke) => joke.id == currentJokeID);
    currentJoke.score = parseInt(scoreButton.value);
    SCORE_CONTAINER.classList.add("d-none");
    NEXT_BTN.classList.remove("disabled");
    generateReport(currentJoke);
  }
  totalJokes(REPORT_ACUDITS);
  totalScore(REPORT_ACUDITS);
  getJokeFan(REPORT_ACUDITS);
}

// REPORT ACUDITS
function generateReport(currentJoke) {
  const DATE = new Date().toISOString();
  const TYPE = currentJoke.type;
  REPORT_ACUDITS.push(
    new Report(currentJoke.joke, currentJoke.score, DATE, TYPE)
  );
  console.log(REPORT_ACUDITS);
}
