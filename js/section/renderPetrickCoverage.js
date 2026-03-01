export default function renderPetrickCoverage(newUncoveredTerms, set)
{
  const fragment = document.createDocumentFragment();
  newUncoveredTerms.forEach((m,i) => {
    const tr = document.createElement('tr');
    const tdNew = document.createElement('td');
    tdNew.textContent = m;

    const pis = [...set[i]].map(ch=>'P'+(ch.charCodeAt(0)-64)).join(', ');
    const tdPi = document.createElement('td');
    tdPi.textContent = pis;
    tdPi.classList.add('mono');

    tr.append(tdNew, tdPi);
    fragment.append(tr);
  });

  document.getElementById('petrick-coverage-body').replaceChildren(fragment);
}