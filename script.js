// array for questions
var questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "Hot Tamale Meetup League"],
        answer: "Hypertext Markup Language"
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Stylesheet", "Cat Sitter Socialclub"],
        answer: "Cascading Stylesheet"
    },
    {
        question: "What form of language makes a script interactive?",
        options: ["Javascript", "Movie Script"],
        answer: "Javascript"
    }
]
var timer = document.querySelector("#timer")
var seconds = 60
var questionsDiv = document.querySelector(".questions")
var title = document.querySelector("#title")
var options = document.querySelector("#options")
var endScreen = document.querySelector("#endScreen")
var timeState;
var questionIndex=0
var finalScore = document.querySelector("#finalScore")
var userName = document.querySelector("#userName")
var submit = document.querySelector("#submit")
// used to hide the info when the start button is clicked
var startButton = document.querySelector(".start_btn")
function displayQuestion() {
    console.log(questions)
 var currentQuestion=questions[questionIndex]
 title.textContent=currentQuestion.question
 currentQuestion.options.forEach(function(option){
    var optionBtn=document.createElement("button")
    optionBtn.textContent=option
    optionBtn.setAttribute("value",option)
    //add click event to check answer
    optionBtn.onclick=checkOption
    options.append(optionBtn)
 })
}
function checkOption(){
    if(this.value===questions[questionIndex].answer){
        alert("correct")
    }else{
        alert("incorrect")
        seconds=seconds-10
        timer.textContent=seconds
    }
    options.innerHTML=""
    questionIndex++
    if(questionIndex===questions.length){
        stopQuiz()
    } else{
        displayQuestion()
    }
    
}
function stopQuiz(){
    clearInterval(timeState)
    questionsDiv.setAttribute("class","hide")
    endScreen.removeAttribute("class","hide")
    finalScore.textContent=seconds
}
function submitScore(){
    var scoreArray=JSON.parse(localStorage.getItem("userScores"))||[]
    var userScore={
        name:userName.value,
        newScore:seconds
    }
scoreArray.push(userScore)
localStorage.setItem("userScores",JSON.stringify(scoreArray))
var scorePage = document.querySelector("#scorePage")
scorePage.removeAttribute("class","hidden")
showScores()
}
function showScores(){
    var scoreArray=JSON.parse(localStorage.getItem("userScores"))||[]
    scoreArray.forEach(function(singleScore){
        var item=document.createElement("li")
        item.textContent=singleScore.name+" - "+singleScore.newScore
        var highScores=document.querySelector("#highScores")
        highScores.append(item)
    })
}

startButton.addEventListener("click", function () {
    var quizRules = document.querySelector(".info_title")
    quizRules.style.display = "none"
    timeState = setInterval(function () {
        seconds = seconds - 1
        timer.textContent = seconds
        if (seconds <= 0) {
clearInterval(timeState)
        }
    }, 1000)
    questionsDiv.removeAttribute("class","hide")
    displayQuestion()
}) 

submit.onclick=submitScore