import sketch from 'sketch'
import switchLibrary from './switch-library'
import getOptionSelected from './get-option-selected'
import createSwitchWindow from './create-switch-window'

export default function(context) {
  
  const libraries = sketch.getLibraries().filter(l => l.valid && l.enabled)
  // const lastSelected = settings.sessionVariable('Selected')
  
  // create the alertWindow UI
  const alertWindow = createSwitchWindow(context);
  alertWindow.addAccessoryView(getOptionSelected(libraries))
  alertWindow.addButtonWithTitle('Switch')
  alertWindow.addButtonWithTitle('Cancel')

  if (alertWindow.runModal() == NSAlertFirstButtonReturn) {
    const chosenLibraryName = String(alertWindow.viewAtIndex(0).stringValue())
    const lib = libraries.find(l => l.name === chosenLibraryName)
    const doc = sketch.getSelectedDocument()
    
    switchLibrary(doc, lib)
    sketch.UI.message(`🎉 🎈 🙌🏼  Applied theme from ${lib.name}  🙌🏼 🎉 🎈`)
  }
}