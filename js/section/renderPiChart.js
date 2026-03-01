export default function renderPiChart(id,minterms,dominated,piChart)
{
  const table = document.getElementById(id);

  if(!minterms.length){
    table.innerHTML=`<tr><td class="mono" style="padding:8px;color:#94a3b8">None</td></tr>`;
    return;
  }

  const chartFragment = document.createDocumentFragment();

  const thead = document.createElement('thead');

  const trHead = document.createElement('tr');
  const td1 = document.createElement('td'); 
  td1.textContent = 'PI';
  trHead.append(td1);

  minterms.forEach(m => {
    const tdMinterms = document.createElement('td');
    tdMinterms.textContent = m;
    if(dominated.has(m)) tdMinterms.classList.add('highlight-col');
    trHead.append(tdMinterms);
  });
  thead.append(trHead);

  const tbody = document.createElement('tbody');
  for (let i = 0; i < piChart.length; i++)
  {
    const tr = document.createElement('tr');
    
    const tdPrime = document.createElement('td');
    tdPrime.textContent = `P${i+1}`;
    tr.append(tdPrime);

    minterms.forEach(m => {
      const v = piChart[i][m];
      const td = document.createElement('td');
      td.textContent = v===2?'●':v===1?'✓':'';
      if(dominated.has(m)) td.classList.add('highlight-col');
      tr.append(td);
    });
    tbody.append(tr);
  }

  chartFragment.append(thead,tbody);
  table.replaceChildren(chartFragment);
}