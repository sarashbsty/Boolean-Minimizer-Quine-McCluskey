import getInput from './input.js';
import runQM from './qmBridge.js';
import render from "./render.js";

 fetch('./js/test2.json')
   .then(res => res.json())
   .then(data => {
     console.log(data);
     render(data);
     showView('output');
   });

let QM = null;

const backBtn = document.getElementById('back');
const form = document.getElementById('input-form');

initQM();

form.onsubmit = function (e) {
  e.preventDefault();   // prevent page reload
  runMinimizer();
};
backBtn.onclick = () => showView('input');

async function initQM() {
    QM = await QMModule();
    
    const runBtn = document.getElementById('run');
    runBtn.disabled = false;
    runBtn.textContent = 'Run Minimizer';
}

function runMinimizer(){
  if (!QM){ 
	  alert("QM not initialized yet");
	  throw new Error("QM not initialized yet");
  }
  
  const input = getInput();
  if(!input) return;

  const data = runQM(QM, input);

  if(data.error){
    console.log("it working");
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
}

function showView(id){
  document.getElementById('input-view').classList.toggle('hidden', id !== 'input');
  document.getElementById('output-view').classList.toggle('hidden', id !== 'output');
}