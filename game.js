document.addEventListener("DOMContentLoaded", function () {
    // Variables
    var score = 0;
    var countdown = 3;
    var currentQuestion = 1;
    var ans = 0;
    var finishLinePos = 0;
    var totalSeconds = 0;
    var timerVar;
  
    // Elements
    var scoreElement = document.getElementById("score");
    var countdownValueElement = document.getElementById("countdown-value");
    var countdownLabelElement = document.getElementById("countdown-label");
    var startButton = document.getElementById("start-button");
    var questionElement = document.getElementById("question");
    var answerInput = document.getElementById("answer");
    var submitButton = document.getElementById("submit-button");
    var carElement = document.getElementById("car");
    var finishLineElement = document.getElementById("finish-line");
    var printquestion = document.getElementById("question");
    var commentelement = document.getElementById("comment");
  
    // Start Game
    startButton.addEventListener("click", function () {
      startButton.style.display = "none";
      countdown = 3;
      currentQuestion = 1;
      score = 0;
      scoreElement.innerText = score;
      countdownValueElement.innerText = countdown;
      countdownLabelElement.style.display = "block";
      startCountdown();
    });
  
    // Show Question
    function showQuestion() {
      var x = Math.floor(Math.random() * 12) + 1;
      var y = Math.floor(Math.random() * 12) + 1;
      var a = x;
      var b = y;
      questionElement.innerHTML = "Question " + currentQuestion + ": <br><h1>" + a + " X " + b +' ='+ " </h1>";
      ans = a * b;
      commentelement.innerText = "";
    }
  
    // Submit Answer
    function submitAnswer() {
      var answer = parseInt(answerInput.value);
      if (isNaN(answer)) {
        commentelement.innerText = "Please enter a number.";
      } else {
        checkAnswer(answer);
      }
      answerInput.value = "";
    }
  
    // Check Answer
    function checkAnswer(answer) {
      if (answer === ans) {
        moveCar();
        score++;
        scoreElement.innerText = score;
      } else {
        commentelement.innerText = "Wrong answer. Please try again.";
      }
      currentQuestion++;
  
      if (currentQuestion == 11) {
        if (score === 10) {
          commentelement.innerText = "You won!";
          window.setTimeout(endGame, 1000);
          clearInterval(timerVar);
        } else {
          commentelement.innerText = "Game over. Better luck next time :(";
          clearInterval(timerVar);
          endGame();
        }
      } else {
        showQuestion();
        countTimer();
      }
    }
  
    // Move Car
    function moveCar() {
      var trackWidth = document.querySelector(".race-track").offsetWidth;
      var carWidth = carElement.offsetWidth;
      finishLinePos += carWidth * 3;
      carElement.style.left = finishLinePos + "px";
    }
  
    // Countdown
    function startCountdown() {
      countdownValueElement.innerText = countdown;
  
      var countdownInterval = setInterval(function () {
        countdown--;
        countdownValueElement.innerText = countdown;
  
        if (countdown === 0) {
          showQuestion();
          timerVar = setInterval(countTimer, 1000);
          countTimer();
          clearInterval(countdownInterval);
          countdownLabelElement.style.display = "none";
          countdownValueElement.style.display = "none";
          startButton.style.display = "none";
        }
      }, 1000);
    }
  
    // End Game
    function endGame() {

      clearInterval(timerVar);
      var timeTaken = document.getElementById("time").innerHTML;
      if (score === 10) {
        alert("Congratulations! You completed the game! Time taken: " + timeTaken);
      } else {
        alert("Game over! Try again! Time taken: " + timeTaken);
      }
    }
  
    function countTimer() {
      if (currentQuestion <= 10) {
        ++totalSeconds;
        var minute = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
  
        if (minute < 10) minute = "0" + minute;
        if (seconds < 10) seconds = "0" + seconds;
  
        document.getElementById("time").innerHTML = minute + ":" + seconds;
      }
    }
  
    answerInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission behavior
        submitAnswer();
      }
    });
  
    submitButton.addEventListener("click", submitAnswer);
  });
  function refreshPage() {
    location.reload();
  }
