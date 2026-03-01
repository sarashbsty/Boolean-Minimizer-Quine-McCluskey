import renderPiChart from "./renderPiChart.js";

export default function renderUncovered(piChart, uncoveredTerms, newUncoveredTerms)
{
  const dominated = new Set(uncoveredTerms.filter(m=>!newUncoveredTerms.includes(m)));

  renderPiChart('uncovered-chart', uncoveredTerms, dominated, piChart);

  if(!newUncoveredTerms.length) document.getElementById('new-uncovered').hidden = true;
  else{
    renderPiChart('new-uncovered-chart', newUncoveredTerms, new Set(), piChart);
    document.getElementById('new-uncovered').hidden = false;
  }
}
