// DOM elements
const JOKES_QTY_DOM = document.getElementById("totalJokesDisplayed");
const JOKES_TOTAL_SCORE_DOM = document.getElementById("totalScoreAverage");
const JOKES_FAN_DOM = document.getElementById("typeFan");

export function totalJokes(report) {
  if (report.length >= 0) {
    let totalJokes = report.length;
    JOKES_QTY_DOM.innerHTML = totalJokes;
  }
}

export function totalScore(REPORT_ACUDITS) {
  let scores = REPORT_ACUDITS.map((joke) => joke.score);
  let avg =
    Math.round((scores.reduce((a, b) => a + b) / scores.length) * 100) / 100;
  JOKES_TOTAL_SCORE_DOM.innerHTML = avg;
}

export function getJokeFan(REPORT_ACUDITS) {
  if (REPORT_ACUDITS.length > 1) {
    let dadJokes = REPORT_ACUDITS.filter((joke) => joke.type == "dad");
    let dadScores = dadJokes.map((joke) => joke.score);
    let dadAvrg = dadScores.reduce((a, b) => a + b) / dadScores.length;
    let chuckJokes = REPORT_ACUDITS.filter((joke) => joke.type == "norris");
    let chuckScores = chuckJokes.map((joke) => joke.score);
    let chuckAvrg = chuckScores.reduce((a, b) => a + b) / chuckScores.length;
    if (dadAvrg > chuckAvrg) {
      JOKES_FAN_DOM.innerHTML = "dad jokes";
    } else if (chuckAvrg > dadAvrg) {
      JOKES_FAN_DOM.innerHTML = "norris jokes";
    } else {
      JOKES_FAN_DOM.innerHTML = "all jokes";
    }
  }
}
