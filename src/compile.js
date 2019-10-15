import sketch from 'sketch'
import compileLibrary from './compile-library'
import getOptionSelected from './get-option-selected'
import createAlertWindow from './create-alert-window'

export default function(context) {
  const libraries = sketch.getLibraries().filter(l => l.valid && l.enabled)
  
  // create the alertWindow UI
  const alertWindow = createAlertWindow(context);
  alertWindow.addAccessoryView(getOptionSelected(libraries))
  alertWindow.addButtonWithTitle('Compile')
  alertWindow.addButtonWithTitle('Cancel')

  if (alertWindow.runModal() == NSAlertFirstButtonReturn) {
    const chosenLibraryName = String(alertWindow.viewAtIndex(0).stringValue())
    const lib = libraries.find(l => l.name === chosenLibraryName)
    const doc = sketch.getSelectedDocument()
    
    compileLibrary(doc, lib)
    sketch.UI.message(`🎉 🎈 🙌🏼  Compiled new library named ${lib.name}  🙌🏼 🎉 🎈`)
    
  }
}