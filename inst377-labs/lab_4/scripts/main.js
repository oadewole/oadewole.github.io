// const myHeading = document.querySelector('h1');
// myHeading.textContent = 'Hello world!';

// Change the image when clicked
let myImage = document.querySelector("img");

myImage.onclick = function() {
  let mySrc = myImage.getAttribute("src");

  if (mySrc === "images/firefox-icon.png") {
    myImage.setAttribute("src", "images/firefox2.png");
  } else {
    myImage.setAttribute("src", "images/firefox-icon.png");
  }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
  let myName = prompt("Please enter your name."); // dialog box for user to enter their name, stores into myName

  if (!myName || myName === null) {
    setUserName();
  } else {
    localStorage.setItem("name", myName); // sotre data item called 'name' in browser to use later
    myHeading.textContent = "Mozilla is cool, " + myName; // change heading to include user's name
  }
}

if (!localStorage.getItem("name")) {
  // check whether 'name' data exists
  setUserName(); // if not, create it via function defined above
} else {
  let storedName = localStorage.getItem("name");
  myHeading.textContent = "Mozilla is cool, " + storedName;
}

myButton.onclick = function() {
  setUserName();
};
