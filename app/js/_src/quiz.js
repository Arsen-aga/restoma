// quiz

class Quiz {
  constructor(quiz) {
    this.quiz = quiz;
    this.progressBar = quiz.querySelector(".progress-bar");
    this.line = quiz.querySelector("[data-line]");
    this.steps = quiz.querySelectorAll("[data-step]");
    this.nextBtn = quiz.querySelector('[data-step-btn="next"]');
    this.prevBtn = quiz.querySelector('[data-step-btn="prev"]');
    this.validText = quiz.querySelector(".needs-select");
    this.stepsWrapper = quiz.querySelector(".step__wrapper");

    this.currentStep = 0;
    this.changeLinePercent = 100 / (this.steps.length - this.currentStep);
    this.progressNum = this.steps.length;
    this.error = false;
    this.activeStep = this.steps[this.currentStep];
    this.variants = this.activeStep.querySelectorAll(".variant");

    this.testCount = 0;

    this.init();
  }

  init() {
    this.initLine();
    this.changeHeightStepsWrapper();
    this.handleClick();
    this.statePrevBtn();
    this.stepsWrapper.addEventListener("click", (e) => this.handleWrapperClick(e));
  }

  // Progress Bar
  initLine() {
    this.getLineStyle();
    this.changeProgressBar();
  }
  getLineStyle() {
    const startLine = this.changeLinePercent * (this.currentStep + 1);
    this.line.style.right = `${100 - startLine}%`;
  }
  changeProgressBar() {
    const stepsLeft = this.steps.length - this.currentStep;
    this.changeFirstWord(stepsLeft);
    this.changeCurrentNum(stepsLeft);
    this.changeProgressText(stepsLeft);
    this.changeProgressMaxNum();
  }
  changeFirstWord(stepsLeft) {
    const progressFirstWord = this.progressBar.querySelector(".first-word");
    progressFirstWord.textContent = this.validFirstWord(stepsLeft);
  }
  validFirstWord(num) {
    if (num === 1) {
      return "Остался";
    } else {
      return "Осталось";
    }
  }
  changeCurrentNum(stepsLeft) {
    const progressCurrentNum = this.progressBar.querySelector(".current-step");
    progressCurrentNum.textContent = stepsLeft;
  }
  changeProgressText(stepsLeft) {
    const progressLineCurrentText =
      this.progressBar.querySelector(".current-text");
    progressLineCurrentText.textContent = this.validProgressText(stepsLeft);
  }
  validProgressText(num) {
    if (num === 1) {
      return "вопрос";
    } else if (num >= 2 && num <= 4) {
      return "вопроса";
    } else {
      return "вопросов";
    }
  }
  changeProgressMaxNum() {
    const progressMaxNum = this.progressBar.querySelector(".max-step");
    progressMaxNum.textContent = this.steps.length;
  }
  changeHeightStepsWrapper() {
    const activeStepHeight = this.activeStep.getBoundingClientRect().height;
    this.stepsWrapper.style.height = `${activeStepHeight}px`;
  }
  // Buttons
  handleClick() {
    this.prevBtn.addEventListener("click", () => this.prevStep());
    this.nextBtn.addEventListener("click", () => this.nextStep());
  }

  handleWrapperClick(e) {
    const variant = e.target.closest(".variant");
    if (!variant || !this.activeStep.contains(variant)) return;

    e.preventDefault();
    this.handleVariant(variant);
  }
  handleVariant(variant) {
    if (this.currentStep === this.steps.length - 1) return;
    this.testCount++;
    this.resetAllVariantInStep();
    this.makeActiveVariant(variant);
    this.error = false
    this.nextStep();
  }

  resetAllVariantInStep() {
    this.variants.forEach((variant) => {
      variant.classList.remove("active");
      this.resetRadioInputInVariant(variant);
    });
  }

  resetRadioInputInVariant(variant) {
    const inputRadio = variant.querySelector('input[type="radio"]');
    inputRadio.checked = false;
  }

  makeActiveVariant(variant) {
    variant.classList.add("active");
    const inputRadio = variant.querySelector('input[type="radio"]');
    inputRadio.checked = true;
    this.error = false;
  }

  nextStep() {
    if (this.currentStep === this.steps.length - 1) return;
    this.validateVariants();
    this.stateValidText();
    if (!this.error) {
      this.currentStep++;
      this.changeStep();
    }
  }
  validateVariants() {
    const isValid = Array.from(this.variants).some((variant) => {
      const inputRadio = variant.querySelector('input[type="radio"]');
      if (inputRadio.checked) return true;
    });
    if (isValid) this.error = false;
    else this.error = true;
  }
  prevStep() {
    if (this.currentStep === 0) return;
    this.resetAllVariantInStep();
    this.error = false
    this.stateValidText()
    this.currentStep--;
    this.changeStep();
  }
  changeStep() {
    this.updateValues();
    this.statePrevBtn();
    this.initLine();
    this.choisStep();
    this.changeHeightStepsWrapper();
  }

  updateValues() {
    this.activeStep = this.steps[this.currentStep];
    this.variants = this.activeStep.querySelectorAll(".variant");
  }

  choisStep() {
    this.steps.forEach((step) => step.classList.remove("active"));
    this.steps[this.currentStep].classList.add("active");
  }

  statePrevBtn() {
    if (this.currentStep === 0) {
      this.prevBtn.style.display = "none";
    } else {
      this.prevBtn.style.display = "flex";
    }
  }
  stateValidText() {
    if (this.error) {
      this.validText.style.display = "block";
    } else {
      this.validText.style.display = "none";
    }
  }
}

const quizes = document.querySelectorAll(".quiz");
quizes.forEach((quiz) => new Quiz(quiz));

// const quizes = document.querySelectorAll(".quiz-block, .quiz-modal");
// if (quizes.length >= 1) {
//   quizes.forEach((quiz) => {
//     const line = quiz.querySelector(".line");
//     const progressText = quiz.querySelector(".progress-text");
//     const steps = quiz.querySelectorAll(".step");
//     const btnNext = quiz.querySelectorAll(".next-step");
//     const btnPrev = quiz.querySelectorAll(".prev-step");
//     const variants = quiz.querySelectorAll(".variant");

//     const quizParent = quiz.closest('.quiz')
//     const title = quiz.querySelector(".quiz-block__title");
//     const wrapper = quizParent.querySelector(".quiz__inner");
//     const additionalBlock = quizParent.querySelector(".quiz__left");
//     const subtitle = quiz.querySelector(".quiz-block__subtitle");
//     const progressBar = quiz.querySelector(".progress-bar");

//     const lineShow = 100 / steps.length;

//     let count = 0;

//     variants.forEach((btn) =>
//       btn.addEventListener("change", function (btn) {
//         if (steps[count].classList.contains("several")) return;
//         nextStep();
//       })
//     );
//     btnNext.forEach((btn) => btn.addEventListener("click", nextStep));
//     btnPrev.forEach((btn) => btn.addEventListener("click", prevStep));

//     function showFinishBlock() {
//       // wrapper.style.display = "block";
//       // quiz.style.maxWidth = "none";

//       additionalBlock.style.display = "none";
//       progressBar.style.display = "none";
//     }

//     function nextStep() {
//       const modalFooterText = steps[count].querySelector(".quiz-needs-select");

//       if (count == steps.length - 2) {
//         showFinishBlock();
//       }

//       if (validateInputs(steps, count)) {
//         // проверяем нажат ли инпут
//         // переключаем на следующий шаг
//         changeStep(steps, count, "increase");
//         // меняем текст на линии прогресса
//         changeProgressText(progressText, "increase");
//         // меняем линию прогресса
//         changeLine(line, "increase");
//         // меняем картинку в левой части
//         // отключаем всплывающее окно
//         modalFooterText.style.display = "none";
//         count++;
//       } else {
//         // если не нажат, то всплывает подсказка
//         modalFooterText.style.display = "block";
//       }
//     }

//     function prevStep() {
//       const modalFooterText = steps[count].querySelector(".quiz-needs-select");

//       // отключаем всплывающее окно
//       modalFooterText.style.display = "none";

//       // оннулируем инпуты
//       reversalInputs(steps, count);
//       // переключаем на предыдущий шаг
//       changeStep(steps, count, "decrease");
//       // меняем текст на линии прогресса
//       changeProgressText(progressText, "decrease");
//       // меняем линию прогресса
//       changeLine(line, "decrease");
//       // меняем картинку в левой части
//       count--;
//     }

//     function changeStep(steps, index, value) {
//       if (value == "increase") {
//         if (steps[index].classList.contains("active")) {
//           steps[index].classList.remove("active");
//           if (index != steps.length - 1)
//             steps[index + 1].classList.add("active");
//         }
//       }

//       if (value == "decrease") {
//         if (steps[index].classList.contains("active")) {
//           steps[index].classList.remove("active");
//           if (index != 0) steps[index - 1].classList.add("active");
//         }
//       }
//     }

//     function changeProgressText(progText, value) {
//       const num = progText.querySelector(".current-step");
//       const text = progText.querySelector(".rp-rule__span");
//       const firstWord = progText.querySelector(".progress-text__first-word");

//       let numInt = Number(num.textContent);
//       if (value == "increase") {
//         num.textContent = numInt - 1;
//         numInt = Number(num.textContent);
//       }
//       if (value == "decrease") {
//         num.textContent = numInt + 1;
//         numInt = Number(num.textContent);
//       }
//       if (numInt == -1)
//         progText.innerHTML = `
//               <div class="progress-text__inner">
//                   <span>Последний шаг</span>
//               </div>
//               `;
//       if (numInt == 1) {
//         firstWord.textContent = "Остался";
//         text.textContent = "вопрос";
//       }
//       if (numInt >= 2 && numInt <= 4) text.textContent = "вопроса";
//       if (numInt == 5) text.textContent = "вопросов";
//     }

//     function changeLine(line, value) {
//       const s = line.dataset.left;
//       if (value == "increase") {
//         line.style.left = "-" + (parseInt(s) - lineShow) + "%";
//         line.dataset.left = parseInt(s) - lineShow;
//       }
//       if (value == "decrease") {
//         line.style.left = "-" + (parseInt(s) + lineShow) + "%";
//         line.dataset.left = parseInt(s) + lineShow;
//       }
//     }

//     function validateInputs(steps, index) {
//       const inputs = [
//         ...steps[index].querySelectorAll(
//           "input[type='radio'], select, input[type='text']"
//         ),
//       ];
//       console.log(inputs);
//       const assessment = steps[index].querySelector(".assessment__comment");
//       const checkInp = inputs.some(function (input) {
//         if (input.tagName === "SELECT" && input.value != "Выбрать отрасль") {
//           return true;
//         }

//         if (input.getAttribute("type") == "text" && input.value != "") {
//           return true;
//         }
//         if (input.checked) {
//           return true;
//         }
//         return false;
//       });

//       return assessment || checkInp;
//     }

//     function reversalInputs(steps, index) {
//       const inputs = [
//         ...steps[index].querySelectorAll(
//           "input[type='radio'], input[type='text']"
//         ),
//       ];
//       if (
//         steps[index - 1].querySelectorAll(
//           "input[type='radio'], input[type='text']"
//         )
//       ) {
//         inputs.push(
//           ...steps[index - 1].querySelectorAll(
//             "input[type='radio'], input[type='text']"
//           )
//         );
//       }

//       inputs?.forEach((input) => {
//         if (input.type === "text") input.value = "";
//         if (input.checked) input.checked = false;
//         input.target?.parentNode.classList.remove("active");
//       });
//     }
//   });
// }
