import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { TreeView } from '@lexical/react/LexicalTreeView'
import type { FC } from 'react'

const TreeViewPlugin: FC = () => {
  const [editor] = useLexicalComposerContext()

  return (
    <TreeView
      viewClassName="bg-black text-white p-2.5"
      timeTravelPanelClassName="debug-timetravel-panel"
      timeTravelButtonClassName="debug-timetravel-button"
      timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
      timeTravelPanelButtonClassName="debug-timetravel-panel-button"
      editor={editor}
    />
  )
}
export default TreeViewPlugin
