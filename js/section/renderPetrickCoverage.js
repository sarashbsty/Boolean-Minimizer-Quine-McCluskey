export default function renderPetrickCoverage(set)
{
  const fragment = document.createDocumentFragment();
  set.forEach(s => {
    const tr = document.createElement('tr');

    const tdMinterm = document.createElement('td');
    const tdPi = document.createElement('td');

    tdMinterm.textContent = s[0];

    const pis = s.slice(1).join(', ');
    tdPi.textContent = pis;
    tdPi.classList.add('mono');

    tr.append(tdMinterm, tdPi);
    fragment.append(tr);
  });

  document.getElementById('petrick-coverage-body').replaceChildren(fragment);
}