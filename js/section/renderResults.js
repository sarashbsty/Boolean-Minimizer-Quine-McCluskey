export default function renderResults(data)
{
  const section = document.createElement('section');

  const h2 = document.createElement('h2');
  h2.textContent = "Final Minimized Expression";

  const result = document.createElement('div');
  result.className = "mono text-box";
  result.textContent = 'F = ' + data.join(' + ');

  section.append(h2,result);
  return section;
}