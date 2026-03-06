export default function renderTabulation(tables)
{
  //heading
  const h2 = document.createElement('h2');
  h2.textContent = "Tabulation Process";

  //tabulation
  const tabulation = document.createElement('div');

  const groupingFragment = document.createDocumentFragment();
  renderTables(groupingFragment, tables[0], 'Initial Grouping');

  const reductionFragment = document.createDocumentFragment();
  tables.slice(1).forEach((t,i)=>{ renderTables(reductionFragment, t, `Reduction #${i+1}`); });

  tabulation.append(groupingFragment, reductionFragment);
  
  //end
  const end = document.createElement('div');
  end.className = 'table-wrap';

  const table = document.createElement('table');
  const th = document.createElement('th');
  th.textContent = "No Further Reductions Possible";
  table.append(th);
  
  end.append(table);

  //section creation
  const section = document.createElement('section');
  section.append(h2,tabulation,end);
  
  return section;
}

function renderTables(fragment, tableData, title) {
  // Title
  const h3 = document.createElement('h3');
  h3.textContent = title;
  fragment.append(h3);

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

  // TBODY
  const tbody = document.createElement('tbody');

  tableData.groups.forEach((g, gi) => {
    g.implicants.forEach((imp, idx) => {
      const tr = document.createElement('tr');

      const tdGroupNo = document.createElement('td');
      tdGroupNo.textContent = idx === 0 ? gi : '';
      tr.appendChild(tdGroupNo);

      const tdBinary = document.createElement('td');
      tdBinary.classList.add('mono');
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

  const table = document.createElement('table');
  table.append(thead,tbody);

   // Wrapper
  const div = document.createElement('div');
  div.className = 'table-wrap';
  div.append(table);

  fragment.append(div);
}
