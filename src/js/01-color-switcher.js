const refs = {
   startDataBtn: document.querySelector('button[data-start]'),
   stopDataBtn: document.querySelector('button[data-stop]'),
   body: document.querySelector('body')

}
let timerId = null;
setDisabledAtr(refs.stopDataBtn);
refs.startDataBtn.addEventListener('click', onBtnStart);
refs.stopDataBtn.addEventListener('click', onBtnStop);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function onBtnStart() {
    changeBodyColor();
    removeAtrDisabled(refs.stopDataBtn);
    setDisabledAtr(refs.startDataBtn);
  
    timerId = setInterval(() => {
      changeBodyColor();
    }, 1000);
  }
    function changeBodyColor() {
    refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  }


  function onBtnStop() {
    setDisabledAtr(refs.stopDataBtn);
    removeAtrDisabled(refs.startDataBtn);
    clearInterval(timerId);
  }
  function setDisabledAtr(btn) {
        btn.setAttribute('disabled', 'true');
      }
      
      function removeAtrDisabled(btn) {
        btn.removeAttribute('disabled');
      }