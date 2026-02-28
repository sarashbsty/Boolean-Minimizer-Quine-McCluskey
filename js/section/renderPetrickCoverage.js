export default function renderPetrickCoverage(newUncoveredTerms, set)
{
  document.getElementById('petrick-coverage-body').innerHTML =
      newUncoveredTerms.map((m,i)=>{
        const pis = [...set[i]]
          .map(ch=>'P'+(ch.charCodeAt(0)-64))
          .join(', ');
        return `<tr><td>${m}</td><td class="mono">${pis}</td></tr>`;
    }).join('');
}