// quiz

class Quiz {
  constructor(quiz) {
    this.quiz = quiz;
    this.progressBar = quiz.querySelector(".progress-bar");
    this.line = quiz.querySelector("[data-line]");
    this.steps = quiz.querySelectorAll("[data-step]");
    this.nextBtn = quiz.querySelector('[data-step-btn="next"]');
    this.prevBtn = quiz.querySelector('[data-step-btn="prev"]') || null;
    this.validText = quiz.querySelector(".needs-select");
    this.stepsWrapper = quiz.querySelector(".step__wrapper");
    this.quizFooter = quiz.querySelector(".quiz__footer");
    this.giftInLastStep = quiz.querySelector(".quiz-gift");
    this.imgInLastStep = quiz.querySelector(".last-step__img");

    this.currentStep = 0;
    this.changeLinePercent = 100 / (this.steps.length - this.currentStep);
    this.progressNum = this.steps.length;
    this.error = false;
    this.activeStep = this.steps[this.currentStep];
    this.variants = this.activeStep.querySelectorAll(".variant");
    this.gift = "*название подарка из прошлого вопроса*";

    this.init();
  }

  init() {
    this.initLine();
    this.changeHeightStepsWrapper();
    this.handleClick();
    if (this.prevBtn) this.statePrevBtn();
    this.stepsWrapper.addEventListener("click", (e) =>
      this.handleWrapperClick(e)
    );
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
    this.prevBtn?.addEventListener("click", () => this.prevStep());
    this.nextBtn?.addEventListener("click", () => this.nextStep());
  }

  handleWrapperClick(e) {
    const variant = e.target.closest(".variant");
    if (!variant || !this.activeStep.contains(variant)) return;

    e.preventDefault();
    this.handleVariant(variant);
  }
  handleVariant(variant) {
    this.resetAllVariantInStep();
    this.makeActiveVariant(variant);
    this.error = false;
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
    this.getGiftOnStep(inputRadio);
  }

  nextStep() {
    if (this.currentStep === this.steps.length - 2) this.onActiveLastStep();
    this.validateVariants();
    this.stateValidText();
    if (!this.error) {
      this.currentStep++;
      this.changeStep();
    }
  }

  onActiveLastStep() {
    this.quiz.classList.add("last-step-active");
    this.imgInLastStep.classList.add("show");

    this.hideProgressBar();
    this.hideFooterBlock();
  }

  getGiftOnStep(inputRadio) {
    if (this.currentStep === this.steps.length - 2)
      this.gift = inputRadio.value;

    this.giftInLastStep.textContent = this.gift;
  }

  hideProgressBar() {
    this.progressBar.style.display = "none";
  }
  hideFooterBlock() {
    this.quizFooter.style.display = "none";
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
    this.error = false;
    this.stateValidText();
    this.currentStep--;
    this.changeStep();
  }
  changeStep() {
    this.updateValues();
    if (this.prevBtn) this.statePrevBtn();
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

document.addEventListener("DOMContentLoaded", function () {
  const quizes = document.querySelectorAll(".quiz");
  quizes.forEach((quiz) => new Quiz(quiz));
});
