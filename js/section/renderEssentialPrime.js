export default function renderEssentialPi(id, essentialPi)
{
    const h2 = document.createElement('h2');
    h2.textContent = 'Essential Prime Implicants';

    const expression = document.createElement('div');
    expression.className = "mono text-box";
    if(essentialPi.length)
        expression.textContent = essentialPi.join(' , ');
    else 
        expression.textContent = 'None';

    document.getElementById(id).replaceChildren(h2,expression);
}