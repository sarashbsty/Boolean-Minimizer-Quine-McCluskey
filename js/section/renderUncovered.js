import renderPiChart from "./renderPiChart.js";

export default function renderUncovered(piChart, uncoveredTerms, newUncoveredTerms)
{
  const section = document.createElement('section');

  const h2 = document.createElement('h2');
  h2.textContent = "Uncovered Minterms";

  const dominated = new Set(uncoveredTerms.filter(m=>!newUncoveredTerms.includes(m)));

  //chart of uncovered terms before column domination
  const uncovered_terms_chart = renderPiChart(uncoveredTerms, dominated, piChart);
  const uncovered_terms_chart_wrap = document.createElement('div');
  uncovered_terms_chart_wrap.className = "table-wrap";
  uncovered_terms_chart_wrap.append(uncovered_terms_chart);

  section.append(h2, uncovered_terms_chart_wrap);
  
  if(newUncoveredTerms.length < uncoveredTerms.length){
    const h3 = document.createElement('h3');
    h3.textContent = "After Column Domination";

    //chart of uncovered terms after column domination
    const newUncoveredTerms_chart = renderPiChart(newUncoveredTerms, new Set(), piChart);
    const newUncoveredTerms_chart_wrap = document.createElement('div');
    newUncoveredTerms_chart_wrap.className = "table-wrap";
    newUncoveredTerms_chart_wrap.append(newUncoveredTerms_chart);

    section.append(h3, newUncoveredTerms_chart_wrap);
  }

  return section;
}
