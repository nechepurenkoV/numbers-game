import "./style.css";
import $ from "jquery";

const N = 4;
let currentI = 1;

function addRow(i) {
  $("#tasks").append(`
    <div class="example-container">
      <div class="current-example" style="display: none">
        <p>${N} x ${i} =</p>
        <input class="answer-input" />
      </div>

      <div class="blocks-container" style="transform: translate(0, 500px)">
        <div class="green-block"></div>
        <div class="green-block"></div>
        <div class="green-block"></div>
        <div class="green-block"></div>
      </div>
    </div>
  `);

  $("#submit-button").addClass("disabled").prop("disabled", true);

  $(".example-container .answer-input").on("input", (event) => {
    if (event.target.value === "") {
      $("#submit-button").addClass("disabled").prop("disabled", true);
    } else {
      $("#submit-button").removeClass("disabled").prop("disabled", false);
    }
  });

  $(".current-example").last().fadeIn(500);
  $(".blocks-container").last().css({ transform: "translate(0, 0)" });
}

addRow(1);

function checkAnswer() {
  const input = $(".example-container .answer-input");
  const correctAnswer = N * currentI;
  const value = Number($(".answer-input").val());

  if (value === correctAnswer) {
    input.replaceWith(`<p>${value}</p>`);

    $("#submit-button").addClass("right");
    setTimeout(() => $("#submit-button").removeClass("right"), 1000);

    currentI++;

    setTimeout(() => {
      addRow(currentI);
    }, 500);
  } else {
    $("#submit-button").addClass("wrong");
    setTimeout(() => $("#submit-button").removeClass("wrong"), 1000);
    input.addClass("wrong");
    setTimeout(() => input.removeClass("wrong"), 1000);
  }
}

$("#submit-button").on("click", checkAnswer);
