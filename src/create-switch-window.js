export default function createSwitchWindow(context) {
  const alertWindow = COSAlertWindow.new()
  
  alertWindow.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed('icon.png').path()))
  alertWindow.setMessageText('Tonks: Switch Library')
  alertWindow.setInformativeText("Select a theme library to switch magically document's layerStyles, textStyles and symbols")

  return alertWindow
}