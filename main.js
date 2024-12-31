let corpus = [
  `Spooling - Simultaneous peripheral operations on-line is a process where data is temporarily held to be used and executed by a device, program, or system. It acts as a buffer, allowing the system to manage flow 
efficiently. Spooling is commonly used in scenarios where data needs to be processed sequentially, such as printing. When multiple print jobs are sent to a printer they are spooled into a queue, allowing the printer to process
each job one at a time without interruption. This ensures that the printer operates efficiently and that jobs are executed in the order they were recieved.`,
  `Buffering is a technique used to manage data transter between devices or processes that operate
on different speeds. A buffer is a temporary storage area that holds data while it is being transferred from one place to another. Buffer helps to smooth out the data flow, preventing bottlenecks and ensuring that the 
receiving device or process can handle the data at its own pace`,
];
const input = document.getElementById("corpus[index]");
const minute = document.getElementById("min");
const panel = document.getElementById("panel");
const accuracy = document.getElementById("accuracy");
const speed = document.getElementById("speed");
let currentText = "";
let trues = [];

let i = 0;
let index = Math.round(Math.random() * 1);
let prev = [];
let next = "";
panel.innerHTML = corpus[index];
let previousDate = new Date();
panel.onclick = () => {
  input.focus();
};
let started = false;
let rest = corpus[index];
window.onkeydown = () => {
  input.focus();
};
input.oninput = (event) => {
  let timer;
  let min = 0;
  let sec = 0;
  if (!started) {
    started = !started;
    timer = setInterval(() => {
      sec++;
      if (sec >= 60) {
        sec = sec % 60;
        min = min++;
      }
      minute.innerHTML =
        min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0");
    }, 1000);
    previousDate = new Date();
  }
  //Validate characters using Regular Expression
  if (
    event.data &&
    event.data?.match(/[A-Za-z0-9_ "'/\\><.{}()[\]!@#$%^&*+=?,;:\-]/) &&
    i !== corpus[index].length
  ) {
    if (
      !(
        prev[prev.length - 1] === " " &&
        prev[prev.length - 1] === event.data &&
        next !== event.data
      )
    ) {
      //If matches with the actual character
      let clss = corpus[index][i] === event.data ? true : false;
      //Check If Backspace is stroked
      let isBacked;
      if (i !== trues.length) {
        isBacked = trues[i];
        clss = clss && isBacked;
      }
      currentText += `<span class="${clss}" style="width:0%;">${event.data}</span>`;
      if (prev.at(i) !== "deleteContentBackward") {
        trues.push(clss);
      }
    } //If position is traversed first time
    if (trues.length === i) prev.push(event.data);
    //If position is visited before
    else prev[i] = event.data;
    i = i + 1;
    //Text left after current stroke
    rest = corpus[index].slice(i, corpus[index].length);
    panel.innerHTML =
      currentText + '<span style="color:black;"|>|</span>' + rest;
    //store next character
    next = rest[0];
  }
  if (event.inputType === "deleteContentBackward") {
    //Only if Something has been typed
    if (prev.length > 0) {
      i = i - 1;
      //Get the last character element added
      let regex = `<span [^>]*>${prev.at(i)}</span>`;
      prev[i] = event.inputType;
      let lastElem = currentText.match(RegExp(regex, "gi"));
      //reset left text to previous + left
      rest = corpus[index][i] + rest;
      //remove that last character element
      currentText = currentText.slice(
        0,
        currentText.length - lastElem[lastElem.length - 1].length
      );
      //update the text
      panel.innerHTML = currentText + rest;
    }
  }
  if (i > corpus[index].length - 1) {
    //Block Input
    input.disabled = true;
    //Get all words
    let words = corpus[index].trim().split(/\s+/);
    //stop the program
    started = !started;
    clearInterval(timer);
    //Calculate the taken time
    let timeTaken = (new Date() - previousDate) / 60000;
    //Get correct words and total words
    let correct = 0;
    let total = 0;
    for (i in trues) {
      if (trues[i]) {
        correct++;
      }
      total++;
    }
    //display accuracy and speed
    accuracy.innerHTML =
      "Accuracy >>> " + Math.round(parseFloat((correct / total) * 100)) + "%";
    speed.innerHTML =
      "Speed >>> " + Math.round(parseFloat(words.length / timeTaken)) + "WPM";
  }
};
