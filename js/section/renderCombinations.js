export default function renderCombinations(combinations , minCostIdx)
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