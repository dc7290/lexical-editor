import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { FC, useCallback, useEffect, useState } from 'react'

import { ToggleCommandButton } from './ToggleCommandButton'

const ToolbarPlugin: FC = () => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)

  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
    }
  }, [])

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_, newEditor) => {
        updateToolbar()
        setActiveEditor(newEditor)
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, updateToolbar])

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      })
    )
  }, [activeEditor, updateToolbar])

  return (
    <div className="absolute top-0 flex h-12 w-full max-w-full overflow-x-auto border-b border-gray-400/50 px-4 shadow-sm">
      <div className="my-auto flex h-8 space-x-2 border-r border-gray-300 pr-2">
        <ToggleCommandButton
          isActive={isBold}
          className="font-bold"
          onClick={() =>
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
          }
        >
          B
        </ToggleCommandButton>
        <ToggleCommandButton
          isActive={isItalic}
          className="italic"
          onClick={() =>
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
          }
        >
          I
        </ToggleCommandButton>
      </div>
    </div>
  )
}

export default ToolbarPlugin