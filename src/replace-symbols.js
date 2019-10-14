
// Replace all symbols in the document wich match their names with selected theme library
export default (document, library) => {
  const docSymbols = document.getSymbols()
  let docSymbolInstances = []
  const symbolsMap = {}
  if (!docSymbols.length) {
    return { symbolsMap, docSymbolInstances }
  }

  const librarySymbols = library.getImportableSymbolReferencesForDocument(
    document
  )
  
  Promise.all(docSymbols.map((symbolMaster) => {
    const instances = symbolMaster.getAllInstances()
    docSymbolInstances = docSymbolInstances.concat(instances)

    const matchingSymbolInLib = librarySymbols.find(
      s => s.name === symbolMaster.name
    )
    if (!matchingSymbolInLib) {
      return
    }
    // import the matching symbol
    const importedSymbolMaster = matchingSymbolInLib.import()
    
    // store the mapping so that we can update the overrides later on
    symbolsMap[symbolMaster.symbolId] = importedSymbolMaster.symbolId

    // update all the instances
    instances.forEach(symbolInstance => {
      // eslint-disable-next-line no-param-reassign
      symbolInstance.symbolId = importedSymbolMaster.symbolId
      // eslint-disable-next-line no-param-reassign
      symbolInstance.name = importedSymbolMaster.name
    })

    // now that we replaced all the instances, we remove the master
    // eslint-disable-next-line no-param-reassign
    // symbolMaster.parent = null
  })).catch(function(err) {
    console.log(err.message); // some coding error in handling happened
  });

  return { symbolsMap, docSymbolInstances }
}