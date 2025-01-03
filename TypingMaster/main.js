let corpus=`Spooling - Simultaneous peripheral operations on-line is a process where data is temporarily held to be used and executed by a device, program, or system. It acts as a buffer, allowing the system to manage flow 
efficiently. Spooling is commonly used in scenarios where data needs to be processed sequentially, such as printing. When multiple print jobs are sent to a printer they are spooled into a queue, allowing the printer to process
each job one at a time without interruption. This ensures that the printer operates efficiently and that jobs are executed in the order they were recieved.`
const input = document.getElementById('corpus')
const panel = document.getElementById('panel')
const accuracy = document.getElementById('accuracy')
const speed = document.getElementById('speed')
let currentText =""
let trues =[]
panel.innerHTML = corpus
let i =0
let prev =[]
let next = ''
let previousDate = new Date();
panel.onclick=()=>{
    input.focus()
}
let started = false
let rest = corpus
window.onkeydown=()=>{
    input.focus()
}
input.oninput=(event)=>{
    let timer
    if(!started) {started = !started
    previousDate = new Date()}
        //Validate characters using Regular Expression
    if(event.data && event.data?.match(/[A-Za-z0-9_ "'/\\><.{}()[\]!@#$%^&*+=?,;:\-]/)&&i!==corpus.length){
     if(!(prev[prev.length-1]===' '&& prev[prev.length-1]===event.data&&next!==event.data)){  
        //If matches with the actual character
        let clss=corpus[i]===event.data?true:false
        //Check If Backspace is stroked
        let isBacked
        if(i!==trues.length) {isBacked=trues[i];
            clss = clss&&isBacked}
        currentText+=`<span class="${clss}" style="width:0%;">${event.data}</span>`
        if(prev.at(i)!=="deleteContentBackward"){
        trues.push(clss)
    }
}   //If position is traversed first time
    if(trues.length===i)
    prev.push(event.data)
    //If position is visited before
    else prev[i]=  event.data
    i=i+1
    //Text left after current stroke
    rest = corpus.slice(i,corpus.length)
    panel.innerHTML = currentText+ "<span style=\"color:black;\"|>|</span>"+ rest
    //store next character
    next = rest[0]
}
if(event.inputType==="deleteContentBackward"){
    //Only if Something has been typed
    if(prev.length>0){  
    i = i-1 
    //Get the last character element added
    let regex = `<span [^>]*>${prev.at(i)}</span>`
    prev[i] = event.inputType
    let lastElem = currentText.match(RegExp(regex,'gi'))
    //reset left text to previous + left
    rest = corpus[i]+rest
    //remove that last character element
    currentText = currentText.slice(0,currentText.length-lastElem[lastElem.length-1].length)
    //update the text
    panel.innerHTML = currentText+rest
}
}
if(i>corpus.length-1){
    //Block Input
    input.disabled=true
    //Get all words
    let words = corpus.trim().split(/\s+/);
    //stop the program
    started=!started
    //Calculate the taken time
    let timeTaken = (new Date() - previousDate)/60000
    //Get correct words and total words
    let correct=0;
    let total =0;
    for(i in trues){
        if(trues[i]){
            correct++;
        }
        total++;
    }
   //display accuracy and speed
    accuracy.innerHTML="Accuracy >>> " + Math.round(parseFloat(correct/total*100))+"%"
    speed.innerHTML="Speed >>> "+Math.round(parseFloat(words.length/timeTaken))+"WPM"
}
}
