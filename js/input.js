export default function getInput(){
  //to ignore pevious errors
  document.getElementById('err-var').textContent = '';
  document.getElementById('err-minterms').textContent = '';
  document.getElementById('err-dc').textContent = '';
  
  const varsRaw = document.getElementById('var').value.trim();
  const mintermsRaw = document.getElementById('minterms').value.trim();
  const dontCaresRaw = document.getElementById('dontcares').value.trim();
  
  let hasError = false;

  if (varsRaw === '') {
    document.getElementById('err-var').textContent = 'Number of variables is required';
    hasError = true;
  }

  if (mintermsRaw === '') {
    document.getElementById('err-minterms').textContent = 'At least one minterm is required';
    hasError = true;
  }
  
  if (hasError) return null;

  const vars = Number(varsRaw);

  const minterms = mintermsRaw === ''
    ? []
    : mintermsRaw
        .split(',')
        .map(v => Number(v.trim()))
        .filter(v => Number.isInteger(v));

  const dontCares = dontCaresRaw === ''
    ? []
    : dontCaresRaw
        .split(',')
        .map(v => Number(v.trim()))
        .filter(v => Number.isInteger(v));

  const inputJSON = {
    var: vars,
    minterms,
    dontCares
  };

  return inputJSON;
}