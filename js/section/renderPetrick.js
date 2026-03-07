export default function renderPetrick(d)
{
    const h2 = document.createElement('h2');
    h2.textContent = "Petrick's Method";

    const coverageFragment = renderPetrickCoverage(d.set)
    const expansionFragment = renderExpansion(d.process);
    const minimalFragment = renderMinimal(d.sopTerms);
    const combinationsFragment = renderCombinations(d.combinations , d.minCostIdx);

    const section = document.createElement('section');
    section.append(h2, coverageFragment, expansionFragment, minimalFragment, combinationsFragment);

    return section;
}

function renderPetrickCoverage(set)
{
    const h3 = document.createElement('h3');
    h3.textContent = "Uncovered VS Covering PI";

    //heading
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    ['Uncovered Minterm','Covering PIs'].forEach(str => {
        const th = document.createElement('th');
        th.textContent = str;
        trHead.append(th);
    });
    thead.append(trHead);
    
    //body
    const tbody = document.createElement('tbody');
    set.forEach(s => {
        const tr = document.createElement('tr');

        const tdMinterm = document.createElement('td');
        const tdPi = document.createElement('td');

        tdMinterm.textContent = s[0];

        const pis = s.slice(1).join(', ');
        tdPi.textContent = pis;
        tdPi.classList.add('mono');

        tr.append(tdMinterm, tdPi);
        tbody.append(tr);
    });

    const table = document.createElement('table');
    table.append(thead,tbody);

    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    wrap.append(table);

    const fragment = document.createDocumentFragment();
    fragment.append(h3,wrap);

    return fragment;
}

function renderExpansion(process)
{
    const processFragment = document.createDocumentFragment();

    const h3 = document.createElement('h3');
    h3.textContent = "Petrick Expansion:";
    
    const div = document.createElement('div');
    div.className = "flex";
    div.style.flexDirection = 'column';
    div.style.alignContent = 'center';

    process.forEach((p,i) => {
        if(i>0){
            const arrows = document.createElement('span');
            arrows.textContent = '↓';
            arrows.className = 'center';
            div.append(arrows);
        }

        const text = document.createElement('span');
        text.textContent = p;
        text.classList.add("box");
        div.append(text);
    });

    processFragment.append(h3,div);

    return processFragment;
}

function renderMinimal(terms)
{
    const h3 = document.createElement('h3');
    h3.textContent = "Minimal PI Sets";

    const div = document.createElement('div');
    div.className = "flex";
	
	terms.forEach(term =>{
		const span = document.createElement('span');
		span.textContent = term;
		span.className = "mono box";
		div.append(span);
	});

    const minimalFragment = document.createDocumentFragment();
    minimalFragment.append(h3,div);

    return minimalFragment;
}

function renderCombinations(combinations, minCostIdx)
{
    const h3 = document.createElement('h3');
    h3.textContent = "Possible Solutions:";

    const maxTerms = Math.max(...combinations.map(c => c.length - 1));

    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');

    const headings = [];

    for (let i = 1; i <= maxTerms; i++)
        headings.push(`Term ${i}`);

    headings.push("Total Cost");

    headings.forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        trHead.append(th);
    });

    thead.append(trHead);   

    const tbody = document.createElement('tbody');
    combinations.forEach((com , i) => {
        
        const terms = com.slice(0, -1);
        const cost = com[com.length - 1];

        const tr = document.createElement('tr');
        if(i === minCostIdx) tr.classList.add('highlight');

        terms.forEach(t => {
            const td = document.createElement('td');
            td.textContent = t;
            td.classList.add('mono');
            tr.append(td);
        });

        const td = document.createElement('td');
        td.textContent = cost;

        tr.append(td);
        tbody.append(tr);
    });

    const table = document.createElement('table');
    table.append(thead, tbody);

    const wrap = document.createElement('div');
    wrap.className = "table-wrap";
    wrap.append(table);

    const fragment = document.createDocumentFragment();
    fragment.append(h3,wrap);
    
    return fragment;
}
