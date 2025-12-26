// Изменение времени в модальном окне, по нажатию на табы


const timeToggle = document.querySelectorAll(".time-check input");
const timeInput = document.querySelector(".time-input");

if(timeToggle.length && timeInput){
  timeToggle.forEach(btn => {
    btn.addEventListener('click', function(){
      if(btn.value === "По времени" && btn.checked){
        console.log(1231);
        timeInput.disabled = false;
      }else{
        timeInput.disabled = true;
        timeInput.value = '';
      }
    })
  })
}



// Изменение заголовка и инпут from в попапе, по нажатию на кнопку в item

const btns = document.querySelectorAll('.change-popup');
btns?.forEach(btn => {
  btn.addEventListener('click', function(){

    const id = btn.href.split('#')[1];
    const modal = document.getElementById(id);
    const modalFrom = modal.querySelector('[name="from"]')
    const modalBtn = modal.querySelector(".form__btn");
    const modalTitle = modal.querySelector("h2");
    const textBtn = btn.textContent;
    

    const startTextBtn = "Заполните форму ниже, чтобы ";
    modalFrom.value = startTextBtn + textBtn.trim().toLowerCase();
    modalTitle.textContent = startTextBtn + textBtn.trim().toLowerCase();
    modalBtn.textContent = textBtn.trim();
    
  })
})


