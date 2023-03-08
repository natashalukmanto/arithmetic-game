var currentYear = new Date().getFullYear();
document.getElementById("currentYear").innerHTML = currentYear;

var correctAnswer = 0;
let time = 90;
let isRunning = 0;
let points = 0;

function newLevel() {
  var num1 = Math.floor(Math.random() * 30) + 1;
  var num2 = Math.floor(Math.random() * 10) + 1;
  var numForOperator = Math.floor(Math.random() * 4) + 1;

  var operator = '';
  if (numForOperator === 1) {
    operator = '+';
  } else if (numForOperator === 2) {
    operator = 'x';
  } else if (numForOperator === 3) {
    if (num1 % num2 === 0) {
      operator = '/';
    } else {
      num1 = num1 * num2;
      operator = '/';
    }
  } else {
    if (num1 < num2) {
      var temp = num1;
      num1 = num2;
      num2 = temp;
      operator = '-';
    } else {
      operator = '-';
    }
  }

  document.getElementById("num1").innerHTML = num1;
  document.getElementById("num2").innerHTML = num2;
  document.getElementById("operator").innerHTML = operator;

  if (numForOperator === 1) {
    correctAnswer = num1 + num2;
  } else if (numForOperator === 2) {
    correctAnswer = num1 * num2;
  } else if (numForOperator === 3) {
    correctAnswer = num1 / num2;
  } else {
    correctAnswer = num1 - num2;
  }
}

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("countdown").innerHTML = minutes + ":" + seconds;

  if (time <= 0) {
    document.getElementById("countdown").innerHTML = "Time's up!";
    isRunning = 0;
  } else {
    time--;
  }
}

newLevel();

document.addEventListener('submit', function(event) {

  if (isRunning === 0) {
    setInterval(updateCountdown, 1000);
    isRunning = 1;
  }

  if (parseInt(document.getElementById('answer').value) === correctAnswer) {
    newLevel();
    document.getElementById('answer').value = '';
    event.preventDefault();
    points += 15;
    document.getElementById("points").innerHTML = "Points: " + points;
  } else {
    var popup = document.getElementById('pop-up');
    popup.classList.add("open-popup");
    setTimeout(function() {
      popup.classList.remove("open-popup");
    }, 2500);
    document.getElementById('answer').value = '';
    event.preventDefault();
    points -= 10;
    document.getElementById("points").innerHTML = "Points: " + points;
  }
})
