import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from 'lexical'
import { useCallback, useEffect, useState } from 'react'

type UseToggleCommand = (
  type: TextFormatType
) => [isActive: boolean, handleClick: () => void]
const useToggleCommand: UseToggleCommand = (type) => {
  const [editor] = useLexicalComposerContext()

  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          setIsActive(selection.hasFormat(type))
        }
      })
    })
  }, [editor, type])

  const handleClick = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type)
  }, [editor, type])

  return [isActive, handleClick]
}

export default useToggleCommand
