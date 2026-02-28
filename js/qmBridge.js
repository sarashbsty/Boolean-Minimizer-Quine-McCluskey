export default function runQM(QM, inputObj)
{  
  const json = JSON.stringify(inputObj);

  const inPtr = QM.stringToNewUTF8(json);
  const outPtr = QM._qm_run(inPtr);

  if (!outPtr) {
    QM._free(inPtr);
    throw new Error("qm_run returned NULL");
  }

  const outStr = QM.UTF8ToString(outPtr);

  QM._free(inPtr);
  QM._free(outPtr);
  
  console.log(outStr);

  return JSON.parse(outStr);
}