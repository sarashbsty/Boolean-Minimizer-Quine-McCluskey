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
    
  renderPrimeImplicants(d.primeImplicants, d.piChart, d.minterms);  

  const essentialPiSection = renderEssentialPi(d.essentialPi);
  document.getElementById('essential-prime').replaceChildren(essentialPiSection);
  
  renderUncovered(d.piChart, d.uncoveredTerms, d.newUncoveredTerms);

  if(d.newUncoveredTerms.length){
    const petrickSection = renderPetrick(d);
    document.getElementById('petrick').replaceChildren(petrickSection);
  } 
}