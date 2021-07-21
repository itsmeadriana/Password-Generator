// Why build an array when you can just split a string into one? Fewer quotation marks.
const criteria = {
  "numeric": "0123456789",
  "upperCase": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "lowerCase": "abcdefghijklmnopqrstuvwxyz",
  "special": "/[!@#$%^&*(-)_+={};':|,.<>/?]+"
}

var numericCharacters = function() {
  return criteria["numeric"].split("");
}

var upperCaseCharacters = function() {
  return criteria["upperCase"].split("");
}

var lowerCaseCharacters = function() {
  return criteria["lowerCase"].split("");
}

var specialCharacters = function() {
  return criteria["special"].split("");
};

generatePassword = function() {
  var {
      userStatedLimit,
      prefersNumbers,
      prefersUpperCase,
      prefersLowerCase,
      prefersSpecialChar
  } = userSurveyInput();
  return buildPassword(userStatedLimit, prefersNumbers, prefersUpperCase, prefersLowerCase, prefersSpecialChar);
}

var buildPassword = function(limit, numbers, upcase, lowcase, special) {
  var generatedPass = "";

  var criteriaLimit = numberOfOptionsSelected(numbers, upcase, lowcase, special);

  var charactersPerCriteria = (limit / criteriaLimit);

  if (numbers === true) {
      for (var i = 0; i < charactersPerCriteria; i++) {
          const randomIndex = Math.floor(Math.random() * numericCharacters().length);
          generatedPass += numericCharacters()[randomIndex];
      }
  }

  if (upcase === true) {
      for (var i = 0; i < charactersPerCriteria; i++) {
          const randomIndex = Math.floor(Math.random() * upperCaseCharacters().length);
          generatedPass += upperCaseCharacters()[randomIndex];
      }
  }

  if (lowcase === true) {
      for (var i = 0; i < charactersPerCriteria; i++) {
          const randomIndex = Math.floor(Math.random() * lowerCaseCharacters().length);
          generatedPass += lowerCaseCharacters()[randomIndex];
      }
  }

  if (special === true) {
      for (var i = 0; i < charactersPerCriteria; i++) {
          const randomIndex = Math.floor(Math.random() * specialCharacters().length);
          generatedPass += specialCharacters()[randomIndex];
      }
  }
  return shufflePasswordString(generatedPass);
}

// Found "shuffledPassword" algorithm at https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj. IT SAVED MY TUSH.
var shufflePasswordString = function(passwordString) {
  var passwordAsArray = passwordString.split("");
  var shuffledPassword = passwordAsArray.sort((a, b) => 0.5 - Math.random());
  return shuffledPassword.join("");
}

var generateBtn = document.querySelector("#generate");

function userSurveyInput() {
  var userStatedLimit = prompt("How long would you like your password to be? Please choose a number between 8 and 128.");
  if (userStatedLimit >= 8 && userStatedLimit <= 128) {
      var prefersNumbers = confirm("Would you like to include numbers in your password?");
      var prefersUpperCase = confirm("Would you like to include upper case characters in your password?");
      var prefersLowerCase = confirm("Would you like to include lower case characters in your password?");
      var prefersSpecialChar = confirm("Would you like to include special characters in your password?");

      if (prefersNumbers === false && prefersUpperCase === false && prefersLowerCase === false && prefersSpecialChar === false) {
          alert("You must choose at least one criteria to generate a password. The more criteria you choose, the stronger and more secure your password will be. Choose wisely!");
          generatePassword();
      }
  } else {
      alert("INVALID! Please enter a value between 8 and 128.");
      generatePassword();
  }
  return {
      userStatedLimit,
      prefersNumbers,
      prefersUpperCase,
      prefersLowerCase,
      prefersSpecialChar
  };
}

// DID YOU KNOW VS CODE CAN REFACTOR THINGS FOR YOU????
function numberOfOptionsSelected(numbers, upcase, lowcase, special) {
  var numberOfOptionsSelected = 0;
  if (numbers === true) {
      numberOfOptionsSelected++;
  }
  if (upcase === true) {
      numberOfOptionsSelected++;
  }
  if (lowcase === true) {
      numberOfOptionsSelected++;
  }
  if (special === true) {
      numberOfOptionsSelected++;
  }
  return numberOfOptionsSelected;
}

function writePassword() {
  window.alert("Let's generate a random password! First, we'll customize your criteria.");
  var password = generatePassword();
  console.log("password: " + password)
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

document.getElementById("generate").addEventListener("click", writePassword);