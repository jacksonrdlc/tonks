import mapSharedStyles from './map-shared-styles'
import replaceSymbols from './replace-symbols'
import replaceOverrides from './replace-overrides'
import replaceSharedStyles from './replace-shared-styles'
import {Document, Library} from 'sketch/dom'

export default (document, library) => {
  const lookup = mapSharedStyles(document, library)

  // replace the symbols
  const { symbolsMap, docSymbolInstances } = replaceSymbols(document, library, false)

  // replace the styles
  const layerStylesMap = replaceSharedStyles(
    document.getSharedLayerStyles(),
    lookup.layer,
    library
  )
  const textStylesMap = replaceSharedStyles(
    document.getSharedTextStyles(),
    lookup.text,
    library
  )

  replaceOverrides(docSymbolInstances, {
    symbolsMap,
    layerStylesMap,
    textStylesMap,
  })


  document.save('/Users/jack.rudelic/Desktop/Jack.sketch', {
    saveMode: Document.SaveMode.SaveTo,
  })

  Library.getLibraryForDocumentAtPath(
    '/Users/jack.rudelic/Desktop/Jack.sketch'
  )

  // reload the inspector to make sure we show the latest changes
  document.sketchObject.reloadInspector()
}
