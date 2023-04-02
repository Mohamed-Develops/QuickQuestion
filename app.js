"use strict";
const quizStart = document.querySelector(".quizStart");
const homeBtns = document.querySelector(".homeBtns");
let checkIfOn = false;
let checkAnswerDone = false;
let gotCorrect = 10;
let timerTimeNumber = 10;
let finalTimeQuiz = 0;
let timerSecondLeft;
const quizDivHold = document.createElement("div");
quizDivHold.classList.add("quizDivHold");
quizStart.addEventListener("click", () => {
	checkIfOn = false;
	gotCorrect = 10;
	timerTimeNumber = 10;
	finalTimeQuiz = 0;
	homeBtns.remove();
	const quizDivHold = document.createElement("div");
	quizDivHold.classList.add("quizDivHold");
	document.body.append(quizDivHold);
	let questionAmount = 1;
	const questionNumberHold = document.createElement("div");
	if (checkIfOn === false) {
		checkIfOn = true;
		questionNumberHold.classList.add("questionNumberHold");
		questionNumberHold.textContent = `${questionAmount}/10`;
		quizDivHold.appendChild(questionNumberHold);
	}
	const TimerHold = document.createElement("div");
	TimerHold.classList.add("timerHold");
	TimerHold.textContent = `${timerTimeNumber}s`;
	quizDivHold.appendChild(TimerHold);
	const h1QuestionHold = document.createElement("h1");
	h1QuestionHold.classList.add("h1QuestionHold");
	quizDivHold.appendChild(h1QuestionHold);
	const optionsSection = document.createElement("div");
	optionsSection.classList.add("optionsSection");
	quizDivHold.appendChild(optionsSection);
	const optionA = document.createElement("div");
	optionA.classList.add("optionA");
	optionA.classList.add("optionbtn");
	optionA.textContent = `A. `;
	optionsSection.appendChild(optionA);
	const optionB = document.createElement("div");
	optionB.classList.add("optionB");
	optionB.classList.add("optionbtn");
	optionB.textContent = `B. `;
	optionsSection.appendChild(optionB);
	const optionC = document.createElement("div");
	optionC.classList.add("optionC");
	optionC.classList.add("optionbtn");
	optionC.textContent = `C. `;
	optionsSection.appendChild(optionC);
	const optionD = document.createElement("div");
	optionD.classList.add("optionD");
	optionD.classList.add("optionbtn");
	optionD.textContent = `D. `;
	optionsSection.appendChild(optionD);
	const nextButton = document.createElement("button");
	nextButton.classList.add("nextButton");
	nextButton.textContent = "Next";
	quizDivHold.appendChild(nextButton);
	let numberQuestion = 0;
	const apiKey = `https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple`;
	fetch(apiKey)
		.then((response) => response.json())
		.then((data) => {
			function addCorrectAndInccorectAnswers() {
				h1QuestionHold.innerHTML = data.results[numberQuestion].question;
				optionA.style.backgroundColor = "#5172A3";
				optionA.style.border = "none";
				optionB.style.backgroundColor = "#5172A3";
				optionB.style.border = "none";
				optionC.style.backgroundColor = "#5172A3";
				optionC.style.border = "none";
				optionD.style.backgroundColor = "#5172A3";
				optionD.style.border = "none";
				const checkAnswerDb = {
					correctAnswer: data.results[numberQuestion].correct_answer,
					incorrectAnswer1: data.results[numberQuestion].incorrect_answers[0],
					incorrectAnswer2: data.results[numberQuestion].incorrect_answers[1],
					incorrectAnswer3: data.results[numberQuestion].incorrect_answers[2],
				};
				const checkNumberQuestionAnswer = ["opA", "opB", "opC", "opD"];
				const randomMathNumberCorrect = Math.floor(
					Math.random() * checkNumberQuestionAnswer.length
				);
				function removeCorrectAnswerList() {
					const index = checkNumberQuestionAnswer.indexOf(
						checkNumberQuestionAnswer[randomMathNumberCorrect]
					);
					if (index > -1) {
						checkNumberQuestionAnswer.splice(index, 1);
					}
				}
				if (checkNumberQuestionAnswer[randomMathNumberCorrect] === "opA") {
					optionA.textContent = "A. " + checkAnswerDb.correctAnswer;
					removeCorrectAnswerList();
				} else if (
					checkNumberQuestionAnswer[randomMathNumberCorrect] === "opB"
				) {
					optionB.textContent = "B. " + checkAnswerDb.correctAnswer;
					removeCorrectAnswerList();
				} else if (
					checkNumberQuestionAnswer[randomMathNumberCorrect] === "opC"
				) {
					optionC.textContent = "C. " + checkAnswerDb.correctAnswer;
					removeCorrectAnswerList();
				} else if (
					checkNumberQuestionAnswer[randomMathNumberCorrect] === "opD"
				) {
					optionD.textContent = "D. " + checkAnswerDb.correctAnswer;
					removeCorrectAnswerList();
				}
				function addIncorrectAnswerList() {
					const incorrectList = [];
					const answerOptions = [...checkNumberQuestionAnswer];
					let checkArrayNumberQuestionAnswer = checkNumberQuestionAnswer.length;
					for (let i = 0; i < checkArrayNumberQuestionAnswer; i++) {
						const randomIndex = Math.floor(
							Math.random() * answerOptions.length
						);
						incorrectList.push(answerOptions[randomIndex]);
						answerOptions.splice(randomIndex, 1);
					}
					function checkOptionsIf(op1, op2, op3) {
						return (
							!op1.textContent.includes(checkAnswerDb.correctAnswer) &&
							!op2.textContent.includes(checkAnswerDb.correctAnswer) &&
							!op3.textContent.includes(checkAnswerDb.correctAnswer)
						);
					}
					function addOptionIncorrectAnswers(
						op1,
						op2,
						op3,
						firstLetter,
						secondLetter,
						thirdLetter
					) {
						op1.textContent = `${firstLetter} ${checkAnswerDb.incorrectAnswer1}`;
						op2.textContent = `${secondLetter} ${checkAnswerDb.incorrectAnswer2}`;
						op3.textContent = `${thirdLetter} ${checkAnswerDb.incorrectAnswer3}`;
					}
					if (checkOptionsIf(optionA, optionB, optionC)) {
						addOptionIncorrectAnswers(
							optionA,
							optionB,
							optionC,
							"A.",
							"B.",
							"C."
						);
					} else if (checkOptionsIf(optionB, optionC, optionD)) {
						addOptionIncorrectAnswers(
							optionB,
							optionC,
							optionD,
							"B.",
							"C.",
							"D."
						);
					} else if (checkOptionsIf(optionC, optionD, optionA)) {
						addOptionIncorrectAnswers(
							optionC,
							optionD,
							optionA,
							"C.",
							"D.",
							"A."
						);
					} else if (checkOptionsIf(optionD, optionA, optionB)) {
						addOptionIncorrectAnswers(
							optionD,
							optionA,
							optionB,
							"D.",
							"A.",
							"B."
						);
					}
				}
				addIncorrectAnswerList();
				function createCorrectAnswerColor() {
					function optionStyle(op) {
						op.style.backgroundColor = "#8EC994";
						op.style.border = "2px solid #51A37C";
					}
					checkAnswerDone = true;
					if (optionA.textContent === `A. ${checkAnswerDb.correctAnswer}`) {
						optionStyle(optionA);
					} else if (
						optionB.textContent === `B. ${checkAnswerDb.correctAnswer}`
					) {
						optionStyle(optionB);
					} else if (
						optionC.textContent === `C. ${checkAnswerDb.correctAnswer}`
					) {
						optionStyle(optionC);
					} else if (
						optionD.textContent === `D. ${checkAnswerDb.correctAnswer}`
					) {
						optionStyle(optionD);
					}
				}
				let hasSelectedFalse = false;
				let hasSelectedTrue = false;

				timerSecondLeft = setInterval(() => {
					timerTimeNumber -= 1;
					TimerHold.textContent = `${timerTimeNumber}s`;
					function changeInveravalOptionColor(op1, op2, op3, op4) {
						op1.style.background = "#8EC994";
						op1.style.border = "2px solid #51A37C";
						op2.style.background = "#C98E8E";
						op2.style.border = "2px solid #A35151";
						op3.style.background = "#C98E8E";
						op3.style.border = "2px solid #A35151";
						op4.style.background = "#C98E8E";
						op4.style.border = "2px solid #A35151";
					}
					if (timerTimeNumber === 0) {
						if (optionA.textContent === `A. ${checkAnswerDb.correctAnswer}`) {
							changeInveravalOptionColor(optionA, optionB, optionC, optionD);
						} else if (
							optionB.textContent === `B. ${checkAnswerDb.correctAnswer}`
						) {
							changeInveravalOptionColor(optionB, optionA, optionC, optionD);
						} else if (
							optionC.textContent === `C. ${checkAnswerDb.correctAnswer}`
						) {
							changeInveravalOptionColor(optionC, optionA, optionB, optionD);
						} else if (
							optionD.textContent === `D. ${checkAnswerDb.correctAnswer}`
						) {
							changeInveravalOptionColor(optionD, optionA, optionC, optionB);
						}
						clearInterval(timerSecondLeft);
						checkAnswerDone = true;
						gotCorrect--;
						console.log(gotCorrect);
					}
				}, 1000);

				function optionChangeColorAnswer(op1, letterCheck) {
					if (
						op1.textContent === `${letterCheck}. ${checkAnswerDb.correctAnswer}`
					) {
						finalTimeQuiz += timerTimeNumber;
						clearInterval(timerSecondLeft);
						op1.style.backgroundColor = "#8EC994";
						op1.style.border = "2px solid #51A37C";
						hasSelectedTrue = true;
						checkAnswerDone = true;
					} else if (!hasSelectedFalse && !hasSelectedTrue) {
						finalTimeQuiz += timerTimeNumber;
						clearInterval(timerSecondLeft);
						gotCorrect--;
						op1.style.backgroundColor = "#C98E8E";
						op1.style.border = "2px solid #A35151";
						hasSelectedFalse = true;
						createCorrectAnswerColor();
					}
				}
				optionA.addEventListener("click", () => {
					optionChangeColorAnswer(optionA, "A");
				});
				optionB.addEventListener("click", () => {
					optionChangeColorAnswer(optionB, "B");
				});
				optionC.addEventListener("click", () => {
					optionChangeColorAnswer(optionC, "C");
				});
				optionD.addEventListener("click", () => {
					optionChangeColorAnswer(optionD, "D");
				});
			}
			addCorrectAndInccorectAnswers();
			nextButton.addEventListener("click", () => {
				if (checkAnswerDone === false) {
					return;
				} else {
					if (questionAmount < 10) {
						timerTimeNumber = 10;
						TimerHold.textContent = `${timerTimeNumber}s`;
						checkAnswerDone = false;
						clearInterval(timerSecondLeft);
						numberQuestion++;
						questionAmount++;
						questionNumberHold.textContent = `${questionAmount}/10`;
						addCorrectAndInccorectAnswers();
					} else if (questionAmount === 10) {
						quizDivHold.remove();
						const scoreShowQuiz = document.createElement("h1");
						scoreShowQuiz.classList.add("scoreShowQuiz");
						scoreShowQuiz.textContent = `Score: ${gotCorrect * finalTimeQuiz}`;
						document.body.append(scoreShowQuiz);
						const homeScoreQuiz = document.createElement("button");
						homeScoreQuiz.textContent = "Home";
						homeScoreQuiz.classList.add("homeScoreQuiz");
						document.body.append(homeScoreQuiz);

						homeScoreQuiz.addEventListener("click", () => {
							homeScoreQuiz.remove();
							scoreShowQuiz.remove();
							document.body.append(homeBtns);
						});
					}
				}
			});
		});
});
