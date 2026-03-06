import renderInputDetails from "./section/renderInputDetails.js";
import renderResults from "./section/renderResults.js";
import renderTabulation from "./section/renderTabulation.js";
import renderPrimeImplicants from "./section/renderPrimeImplicants.js";
import renderEssentialPi from "./section/renderEssentialPrime.js";
import renderUncovered from "./section/renderUncovered.js";
import renderPetrick from "./section/renderPetrick.js";

export default function render(d){

  const inputOverviewSection = renderInputDetails(d.variable, d.minterms, d.dontCares);
  document.getElementById('input-overview').replaceChildren(inputOverviewSection);

  const resultSection = renderResults(d.result);
  document.getElementById('result').replaceChildren(resultSection);

  const tabulationSection = renderTabulation(d.tables);
  document.getElementById('tabulation').replaceChildren(tabulationSection);
    
  const primeImplicantsSection = renderPrimeImplicants(d.primeImplicants, d.piChart, d.minterms); 
  document.getElementById('prime-implicants').replaceChildren(primeImplicantsSection); 

  const essentialPiSection = renderEssentialPi(d.essentialPi);
  document.getElementById('essential-prime').replaceChildren(essentialPiSection);

  const uncoveredSection = renderUncovered(d.piChart, d.uncoveredTerms, d.newUncoveredTerms);
  document.getElementById('uncovered-minterms').replaceChildren(uncoveredSection);

  if(d.newUncoveredTerms.length){
    const petrickSection = renderPetrick(d);
    document.getElementById('petrick').replaceChildren(petrickSection);
  } else {
    document.getElementById('petrick').innerHTML = ``;
  }
}