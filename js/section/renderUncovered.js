export default function renderUncovered(id,minterms,dominated,piChart)
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