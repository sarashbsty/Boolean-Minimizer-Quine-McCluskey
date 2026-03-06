export default function renderInputDetails(vars, minterms, dontCares)
{
    const section = document.createElement('section');

    const h2 = document.createElement('h2');
    h2.textContent = "Input Data";

    const grid = document.createElement('div');
    grid.classList.add('grid');

    const varsBadge = createBadge('Variables: ',vars);
    const mintermsBadge = createBadge('Minterms: ', minterms);
    const dontCaresBadge = createBadge('Don’t Cares: ',dontCares);

    grid.append(varsBadge, mintermsBadge, dontCaresBadge);

    section.append(h2,grid);

    return section;
}

function createBadge(label, data){
    const badge = document.createElement('div');
    badge.classList.add('badge');

    const span = document.createElement('span');

    if(Array.isArray(data))  span.textContent = data.join(", ");
    else if(typeof data === "number") span.textContent = data;

    badge.append(label, span);
    return badge;
}