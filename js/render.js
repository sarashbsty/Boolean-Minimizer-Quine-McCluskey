import renderTables from "./section/renderTables.js";
import renderPrimeImplicants from "./section/renderPrimeImplicants.js";
import renderPichart from "./section/renderPiChart.js";
import renderUncovered from "./section/renderUncovered.js";
import renderPetrickCoverage from "./section/renderPetrickCoverage.js";
import renderCombinations from "./section/renderCombinations.js";

export default function render(d){

  document.getElementById('varVal').textContent = d.variable;
  document.getElementById('minVal').textContent = d.minterms.join(', ');
  document.getElementById('dcVal').textContent = d.dontCares.length ? d.dontCares.join(', ') : 'None';

  document.getElementById('result').textContent =
    'F = ' + d.result.join(' + ');


  document.getElementById('grouping').innerHTML = '';
  document.getElementById('reductions').innerHTML = '';

  const groupFragment = document.createDocumentFragment();
  renderTables(groupFragment, d.tables[0], 'Initial');
  document.getElementById('grouping').appendChild(groupFragment);

  if(d.tables.length === 1) document.getElementById('reduction-table').hidden = true;
  else document.getElementById('reduction-table').hidden = false;

  const reductionFragment = document.createDocumentFragment();
	d.tables.slice(1).forEach((t,i)=>{ 
    renderTables(reductionFragment, t, `Iteration ${i+1}`); 
  });
  document.getElementById('reductions').appendChild(reductionFragment);
    
  renderPrimeImplicants(d.primeImplicants);  

  renderPichart(d.minterms, d.piChart);    

  if(!d.essentialPi.length) document.getElementById('essential').textContent = 'None';
  else document.getElementById('essential').textContent = d.essentialPi.join(', ');
  
  const dominated = new Set(
    d.uncoveredTerms.filter(m=>!d.newUncoveredTerms.includes(m))
  );
 
  renderUncovered('uncovered-chart', d.uncoveredTerms, dominated, d.piChart);

  if(!d.newUncoveredTerms.length) document.getElementById('new-uncovered').hidden = true;
  else{
        document.getElementById('new-uncovered').hidden = false;
        renderUncovered('new-uncovered-chart', d.newUncoveredTerms, new Set(), d.piChart);
  }
  
  if(!d.uncoveredTerms.length) document.getElementById('petrick').hidden = true;
  else
  {
	  document.getElementById('petrick').hidden = false;
	
    if (!Array.isArray(d.newUncoveredTerms) || d.newUncoveredTerms.length === 0)
		  d.newUncoveredTerms = d.uncoveredTerms.slice();
	
	  renderPetrickCoverage(d.newUncoveredTerms, d.set)
	
    document.getElementById('process').innerHTML = d.process.map(p=>`<li>${p}</li>`).join('');

	  document.getElementById('sop').textContent = d.sopTerms.join(', ');

	  renderCombinations(d.combinations , d.minCostIdx);
  }
}