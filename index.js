let bill;
let people;
let percentage;
let tipPerPerson = 0;
let totalPerPerson = 0;
const custom = document.querySelector(".custom");
const buttons = document.querySelectorAll(".percentage");
const inputs = document.querySelectorAll(".value");

// Verify if tip buttons were clicked
buttons.forEach(function (element) {
  element.addEventListener("click", function () {
    pressedButton(this);
  })
})

// Verify custom tip entry
custom.addEventListener("input", function () {

  percentage = parseInt(custom.value);
  buttons.forEach(function (element) {
    element.disabled = true;
  })

  if (isNaN(percentage) || percentage <= 0) {
  custom.classList.add("error");
  buttons.forEach(function (element) {
    element.disabled = false;
  });
  } else {
  custom.classList.remove("error");
  }


  checkInputs();
}) 

// Verify bill and people entries value
inputs.forEach(function (element) {
  element.addEventListener("input", function () {
    bill = parseFloat(document.getElementById('bill').value);
    people = parseInt(document.getElementById('people').value);

    if (bill <= 0 || bill == null) {
      document.getElementById('bill').classList.add('error');
      document.querySelector(".bill-alert").innerText = "Must be greater than zero";
    }
    else{
      document.querySelector(".bill-alert").innerText = "";
      document.getElementById('bill').classList.remove('error');
    }

    if (people <= 0 || people == null) {
      document.getElementById('people').classList.add('error');
      document.querySelector('.people-alert').innerText = "Must be greater than zero";
    }
    else{
      document.querySelector('.people-alert').innerText = "";
      document.getElementById('people').classList.remove('error');
    }

    checkInputs();
  })
})

document.getElementById("reset").addEventListener("click", function () {
  bill = 0;
  people = 0;
  percentage = 0;
  tipPerPerson = 0;
  totalPerPerson = 0;
  custom.disabled = false;
  custom.value = "";
  buttons.disabled = false;
  buttons.forEach(function (element) {
    element.classList.remove("pressed");
  })
  inputs.forEach(function (element) {
    element.value = "";
  })
  document.getElementById("total").innerText = "$0.00";
  document.getElementById("tip").innerText = "$0.00";
  document.getElementById("reset").disabled = true;
})

function checkInputs() {
  if (bill && people && percentage) {
    calculateTip();
    calculateTotal();
    document.getElementById('reset').disabled = false;
  }
}

// Button animation
function pressedButton(button) {
  let contain = button.classList.contains('pressed');

  if (contain === true) {
    button.classList.remove("pressed");
    custom.disabled = false;
    percentage = null;
  }

  else{
    document.querySelectorAll(".pressed").forEach(function (element) {
      element.classList.remove("pressed");
    })
    button.classList.add("pressed");
    custom.disabled = true;
    let valueWithoutPercentage = parseInt(button.innerText.slice(0,-1));
    percentage = valueWithoutPercentage;
  }
  checkInputs();
}

// Total per person
function calculateTotal() {
  totalPerPerson =  ((bill + (bill * (percentage / 100))) / people).toFixed(2);
  document.getElementById('total').innerText = totalPerPerson;
}

// Tip per person
function calculateTip() {
  tipPerPerson = (bill * (percentage / 100) / people).toFixed(2);
  document.getElementById('tip').innerText = tipPerPerson;
}