export default function renderResults(data)
{
  const section = document.createElement('section');

  const h2 = document.createElement('h2');
  h2.textContent = "Final Minimized Expression";

  const result = document.createElement('div');
  result.className = "flex";
  result.style.alignItems = 'center';
  result.style.fontSize = '20px';
  
  const arr = ['F = '];
  arr.push(data[0]);
  data.slice(1).forEach(exp => { arr.push(' + '); arr.push(exp); });
  
  arr.forEach((elem,i) => {
	  const expression = document.createElement('span');
	  expression.textContent = elem;
	  
	  if((i+1)%2 == 0) expression.className = "mono box";
	  else expression.className = "mono";
	  
	  result.append(expression);
  });

  section.append(h2,result);
  return section;
}