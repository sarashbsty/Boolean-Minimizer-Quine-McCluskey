export default function renderPrimeImplicants(primeImplicants)
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
