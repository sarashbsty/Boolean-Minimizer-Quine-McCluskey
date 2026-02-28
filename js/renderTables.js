export default function renderTables(fragment, tableData, title) {
  // Title
  const h3 = document.createElement('h3');
  h3.textContent = title;
  fragment.appendChild(h3);

  // Wrapper
  const wrap = document.createElement('div');
  wrap.className = 'table-wrap';

  const table = document.createElement('table');

  // THEAD
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Group</th>
      <th>Binary</th>
      <th>Minterms</th>
      <th>Status</th>
    </tr>
  `;
  table.appendChild(thead);

  // TBODY
  const tbody = document.createElement('tbody');

  tableData.groups.forEach((g, gi) => {
    g.implicants.forEach((imp, idx) => {
      const tr = document.createElement('tr');

      const tdGroupNo = document.createElement('td');
      tdGroupNo.textContent = idx === 0 ? gi : '';
      tr.appendChild(tdGroupNo);

      const tdBinary = document.createElement('td');
      tdBinary.className = 'mono';
      tdBinary.textContent = imp.binary;
      tr.appendChild(tdBinary);

      const tdMinterms = document.createElement('td');
      tdMinterms.textContent = imp.minterms.join(', ');
      tr.appendChild(tdMinterms);

      const tdStatus = document.createElement('td');
      tdStatus.className = imp.combined ? 'warn' : 'good';
      tdStatus.textContent = imp.combined ? 'Combined' : 'Prime';
      tr.appendChild(tdStatus);

      tbody.appendChild(tr);
    });
  });

  table.appendChild(tbody);
  wrap.appendChild(table);
  fragment.appendChild(wrap);
}