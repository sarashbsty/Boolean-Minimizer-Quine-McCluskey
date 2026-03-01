export default function renderExpansion(process)
{
    const processFragment = document.createDocumentFragment();
    process.forEach((p,i) => {
        
        const text = document.createElement('div');
        const arrows = document.createElement('div');

        text.textContent = p;
        text.classList.add("petrick-step");

        if(i>0){
            arrows.textContent = '↓';
            arrows.classList.add('arrow');
            processFragment.append(arrows,text);
        }
        else processFragment.append(text);
    });

    document.getElementById('process').replaceChildren(processFragment);
}