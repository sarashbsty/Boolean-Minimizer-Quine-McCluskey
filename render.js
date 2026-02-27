function render(d){

  document.getElementById('input').innerHTML = `
    <h2>Input Data</h2>
    <div class="grid">
      <div class="badge">Variables: ${d.variable}</div>
      <div class="badge">Minterms: ${d.minterms.join(', ')}</div>
      <div class="badge">Don’t Cares: ${d.dontCares.length?d.dontCares.join(', '):'None'}</div>
    </div>`;

  document.getElementById('result').textContent =
    'F = ' + d.result.join(' + ');

  document.getElementById('grouping').innerHTML = ``;
  document.getElementById('reductions').innerHTML = ``;

  if(d.tables.length === 1) document.getElementById('reduction-table').hidden = true;
  else document.getElementById('reduction-table').hidden = false;
	
  renderTables(document.getElementById('grouping'), d.tables[0], 'Initial');
  d.tables.slice(1).forEach((t,i)=>{ renderTables(document.getElementById('reductions'), t, `Iteration ${i+1}`); });
    
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
	  document.getElementById('sop').textContent = d.sopTerms.join(' + ');

	  renderCombinations(d.combinations , d.minCostIdx);
  }
}

function renderTables(container, table, title)
{
  let html=`<h3>${title}</h3>
  <div class="table-wrap"><table>
  <thead><tr><th>Group</th><th>Binary</th><th>Minterms</th><th>Status</th></tr></thead><tbody>`;
  table.groups.forEach((g,gi)=>{
    g.implicants.forEach((imp,idx)=>{
      html+=`
        <tr>
          <td>${idx===0?gi:''}</td>
          <td class="mono">${imp.binary}</td>
          <td>${imp.minterms.join(', ')}</td>
          <td class="${imp.combined?'warn':'good'}">${imp.combined?'Combined':'Prime'}</td>
        </tr>`;
    });
  });
  html+=`</tbody></table></div>`;
  container.innerHTML += html;
}

function renderPrimeImplicants(primeImplicants)
{
  document.getElementById('pi-body').innerHTML =
    primeImplicants.map((p,i)=>`
      <tr>
        <td class="mono">P${i+1}</td>
        <td class="mono">${p.binary}</td>
        <td class="mono">${p.expression}</td>
        <td>${p.minterms.join(', ')}</td>
        <td class="${p.isEssential?'good':''}">${p.isEssential?'Yes':'No'}</td>
        <td>${p.cost}</td>
      </tr>`).join('');
}  

function renderPichart(minterms, piChart)
{
  document.getElementById('pi-chart').innerHTML = `
    <thead>
      <tr>
        <th>PI</th>
        ${minterms.map(m=>`<th>${m}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${piChart.map((row,r)=>`
        <tr>
          <td class="mono">P${r+1}</td>
          ${minterms.map(m=>{
            const v=row[m];
            return `<td>${v===2?'●':v===1?'✓':''}</td>`;
          }).join('')}
        </tr>`).join('')}
    </tbody>`;
}

function renderUncovered(id,minterms,dominated,piChart)
{
  const t=document.getElementById(id);
  if(!minterms.length){
    t.innerHTML=`<tr><td class="mono" style="padding:8px;color:#94a3b8">None</td></tr>`;
    return;
  }
  t.innerHTML=`
    <thead><tr>
      <th>PI</th>
      ${minterms.map(m=>`<th class="${dominated.has(m)?'highlight-col':''}">${m}</th>`).join('')}
    </tr></thead>
    <tbody>
      ${piChart.map((row,r)=>`
        <tr>
          <td class="mono">P${r+1}</td>
          ${minterms.map(m=>{
            const v=row[m];
            return `<td class="${dominated.has(m)?'highlight-col':''}">
              ${v===2?'●':v===1?'✓':''}
            </td>`;
          }).join('')}
        </tr>`).join('')}
    </tbody>`;
}

function renderPetrickCoverage(newUncoveredTerms, set)
{
  document.getElementById('petrick-coverage-body').innerHTML =
      newUncoveredTerms.map((m,i)=>{
        const pis = [...set[i]]
          .map(ch=>'P'+(ch.charCodeAt(0)-64))
          .join(', ');
        return `<tr><td>${m}</td><td class="mono">${pis}</td></tr>`;
    }).join('');
}

function renderCombinations(combinations , minCostIdx)
{
  const table = document.getElementById('petrick-table');
  const thead = table.querySelector('thead');

  const maxTerms = Math.max(...combinations.map(c => c.length - 1));

  thead.innerHTML = `<tr>${Array.from({ length: maxTerms }, (_, i) => `<th>Term ${i + 1}</th>`).join('')}<th>Total Cost</th></tr>`;

  document.getElementById('combos').innerHTML =
    combinations.map((c, i) => {
      const cost = c[c.length - 1];
      const terms = c.slice(0, -1);

      return `
        <tr class="${i === minCostIdx ? 'highlight' : ''}">
          ${terms.map(t => `<td class="mono">${t}</td>`).join('')}
          ${Array.from({ length: maxTerms - terms.length }, () => `<td></td>`).join('')}
         <td>${cost}</td>
        </tr>
     `;
    }).join('');
}

function showOutput()
{
  document.getElementById('input-view').style.display = 'none';
  document.getElementById('output-view').style.display = 'block';
  window.scrollTo(0,0);
}

function backToInput()
{  
  document.getElementById('output-view').style.display = 'none';
  document.getElementById('input-view').style.display = 'block';
}