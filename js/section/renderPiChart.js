export default function renderPiChart(minterms,dominated,piChart)
{
  const table = document.createElement('table');

  if(!minterms.length){
    table.innerHTML=`<tr><td class="mono" style="padding:8px;color:#94a3b8">None</td></tr>`;
    return table;
  }

  const thead = document.createElement('thead');

  const trHead = document.createElement('tr');
  const th = document.createElement('th'); 
  th.textContent = 'PI';
  trHead.append(th);

  minterms.forEach(m => {
    const thMinterms = document.createElement('th');
    thMinterms.textContent = m;
    if(dominated.has(m)) thMinterms.classList.add('highlight-col');
    trHead.append(thMinterms);
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

  table.append(thead,tbody);
  return table;
}