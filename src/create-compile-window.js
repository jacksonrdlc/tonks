export default function createCompileWindow(context) {
  const alertWindow = COSAlertWindow.new()
  
  alertWindow.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed('icon.png').path()))
  alertWindow.setMessageText('Tonks: Compile Library')
  alertWindow.setInformativeText("Select a style library to compile with these components to create a new library")

  return alertWindow
}