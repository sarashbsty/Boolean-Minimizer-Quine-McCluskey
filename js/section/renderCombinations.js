export default function renderCombinations(combinations, minCostIdx)
{
  const maxTerms = Math.max(...combinations.map(c => c.length - 1));

  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');

  Array.from({ length: maxTerms }, (_, i) => {
    const th = document.createElement('th');
    th.textContent = `Term ${i+1}`;
    trHead.append(th);
  });

  const thCost = document.createElement('th');
  thCost.textContent = "Total Cost";
  trHead.append(thCost);
  thead.append(trHead);

  const tbody = document.createElement('tbody');
  combinations.forEach((com , i) => {
    
    const terms = com.slice(0, -1);
    const cost = com[com.length - 1];

    const tr = document.createElement('tr');
    if(i === minCostIdx) tr.classList.add('highlight');

    terms.forEach(t => {
      const td = document.createElement('td');
      td.textContent = t;
      td.classList.add('mono');
      tr.append(td);
    });

    const td = document.createElement('td');
    td.textContent = cost;

    tr.append(td);
    tbody.append(tr);
  });

  const fragment = document.createDocumentFragment();
  fragment.append(thead, tbody);
  document.getElementById('petrick-table').replaceChildren(fragment);
}
