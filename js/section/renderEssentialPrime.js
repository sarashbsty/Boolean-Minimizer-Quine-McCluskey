export default function renderEssentialPi(essentialPi)
{
    const h2 = document.createElement('h2');
    h2.textContent = 'Essential Prime Implicants';

    const expression = document.createElement('div');
	expression.className = "flex";
	
    if(essentialPi.length)
	{
        essentialPi.forEach(PI => {
			const span = document.createElement("span");
			span.textContent = PI;
			span.className = " mono box";
			expression.append(span);
		});
	}
    else
	{ 
		const span = document.createElement("span");
		span.textContent = "No Essential Prime Implicants";
		span.className = "box";
		span.style.fontStyle = "italic";
		expression.append(span)
	}

    const section = document.createElement('section');
    section.append(h2,expression);
    
    return section;
}