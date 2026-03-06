 import renderPiChart from "./renderPiChart.js"

 export default function renderPrimeImplicants(primeImplicants, piChart, minterms)
 {
   const h2 = document.createElement('h2');
   h2.textContent = "Prime Implicants";
  
   const prime_table = renderPrimeImplicantsTable(primeImplicants);

   const prime_table_wrap = document.createElement('div');
   prime_table_wrap.className = "table-wrap";
   prime_table_wrap.append(prime_table);

   const h3 = document.createElement('h3');
   h3.textContent = "Prime Implicants Chart";

   const chart = renderPiChart(minterms,new Set(),piChart);

   const chart_wrap = document.createElement('div');
   chart_wrap.className = "table-wrap";
   chart_wrap.append(chart);

   const section = document.createElement('section');
   section.append(h2, prime_table_wrap, h3, chart_wrap);

   return section;
 }

function renderPrimeImplicantsTable(primeImplicants)
{
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');

  const headings = ['#','Binary','Expression','Minterms','Essential','cost'];

  headings.forEach(heading =>{
    const th = document.createElement('th');
    th.textContent = heading;
    trHead.append(th);
  });

  thead.append(trHead);

  const tbody =  document.createDocumentFragment();

  primeImplicants.forEach((imp,i) => {
    const tr = document.createElement('tr');

    const tdPrime = document.createElement('td');
    tdPrime.classList.add('mono');
    tdPrime.textContent = `P${i+1}`;

    const tdBinary = document.createElement('td');
    tdBinary.classList.add('mono');
    tdBinary.textContent = imp.binary;

    const tdExpression = document.createElement('td');
    tdExpression.classList.add('mono');
    tdExpression.textContent = imp.expression;

    const tdMinterms = document.createElement('td');
    tdMinterms.textContent = imp.minterms.join(', ');

    const tdEssential = document.createElement('td');
    tdEssential.textContent = imp.isEssential ? 'Yes' : 'No';
    if(imp.isEssential) tdEssential.classList.add('good');
    else tdEssential.classList.add('warn');

    const tdCost = document.createElement('td');
    tdCost.textContent = imp.cost;

    tr.append(tdPrime,tdBinary,tdExpression,tdMinterms,tdEssential,tdCost);
    tbody.append(tr);
  });

  const table = document.createElement('table');
  table.append(thead, tbody);

  return table;
}