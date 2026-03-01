export default function renderPrimeImplicants(primeImplicants)
{
  const primeFragment =  document.createDocumentFragment();

  primeImplicants.forEach((imp,i) => {
    const tr = document.createElement('tr');

    const tdPrime = document.createElement('td');
    tdPrime.classList.add('mono');
    tdPrime.textContent = `P${i+1}`;

    const tdBinary = document.createElement('td');
    tdBinary.classList.add('mono');
    tdBinary.textContent = imp.binary;

    const tdExpression = document.createElement('td');
    tdExpression.classList.add('mono');
    tdExpression.textContent = imp.expression;

    const tdMinterms = document.createElement('td');
    tdMinterms.textContent = imp.minterms.join(', ');

    const tdEssential = document.createElement('td');
    tdEssential.textContent = imp.isEssential ? 'Yes' : 'No';
    if(imp.isEssential) tdEssential.classList.add('good');
    else tdEssential.classList.add('warn');

    const tdCost = document.createElement('td');
    tdCost.textContent = imp.cost;

    tr.append(tdPrime,tdBinary,tdExpression,tdMinterms,tdEssential,tdCost);
    primeFragment.append(tr);
  });

  document.getElementById('pi-body').replaceChildren(primeFragment);
}