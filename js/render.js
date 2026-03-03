import renderTables from "./section/renderTables.js";
import renderPrimeImplicants from "./section/renderPrimeImplicants.js";
import renderEssentialPi from "./section/renderEssentialPrime.js";
import renderUncovered from "./section/renderUncovered.js";
import renderPetrickCoverage from "./section/renderPetrickCoverage.js";
import renderExpansion from "./section/renderExpansion.js";
import renderCombinations from "./section/renderCombinations.js";

export default function render(d){

  document.getElementById('varVal').textContent = d.variable;
  document.getElementById('minVal').textContent = d.minterms.join(', ');
  document.getElementById('dcVal').textContent = d.dontCares.length ? d.dontCares.join(', ') : 'None';

  document.getElementById('result').textContent =
    'F = ' + d.result.join(' + ');

  const fragment = document.createDocumentFragment();
  renderTables(fragment, d.tables[0], 'Initial Grouping');

  d.tables.slice(1).forEach((t,i)=>{ 
    renderTables(fragment, t, `Reduction #${i+1}`); 
  });
  document.getElementById('Reduction').replaceChildren(fragment);
    
  renderPrimeImplicants(d.primeImplicants, d.piChart, d.minterms);  

  renderEssentialPi('essential-prime',d.essentialPi);
  
  renderUncovered(d.piChart, d.uncoveredTerms, d.newUncoveredTerms);

  if(!d.newUncoveredTerms.length) document.getElementById('petrick').hidden = true;
  else
  {
  	document.getElementById('petrick').hidden = false;
	
	  renderPetrickCoverage(d.set);
	
    renderExpansion(d.process);

	  document.getElementById('sop').textContent = d.sopTerms.join(', ');

	  renderCombinations(d.combinations , d.minCostIdx);
  }
}