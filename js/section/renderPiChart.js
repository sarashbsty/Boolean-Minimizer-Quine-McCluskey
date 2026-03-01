export default function renderPichart(minterms, piChart)
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