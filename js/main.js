import getInput from './input.js';
import runQM from './qmBridge.js';
import render from "./render.js";

let QM = null;
const runBtn = document.getElementById('run');
const backBtn = document.getElementById('back');

async function initQM() {
    QM = await QMModule();   
    runBtn.disabled = false;
    runBtn.textContent = 'Run Minimizer';
}

initQM();

runBtn.onclick = () => {

  if (!QM){ 
	alert("QM not initialized yet");
	throw new Error("QM not initialized yet");
  }
  
  const input = getInput();
  if(!input) return;

  const data = runQM(QM, input);

  if(data.error){
    const error = document.getElementById('error-popup');
    const errorBtn = document.getElementById('errorBtn');

    document.getElementById('popup-msg').textContent = data.errorMsg;
    error.classList.toggle('hidden');
    errorBtn.onclick = () => error.classList.toggle('hidden');
    return;
  }

  render(data);
  
  showView('output');
  window.scrollTo(0,0);
};

backBtn.onclick = () => showView('input');

function showView(id){
  document.getElementById('input-view').classList.toggle('hidden', id !== 'input');
  document.getElementById('output-view').classList.toggle('hidden', id !== 'output');
}

// fetch('./js/test2.json')
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
//     render(data);
//   });