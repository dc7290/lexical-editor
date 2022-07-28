import { CodeIcon } from '@heroicons/react/outline'
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

import { Group } from './Group'
import { ToggleCommandButton } from './ToggleCommandButton'

const ToolbarPlugin: FC = () => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)

  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [isSubscript, setIsSubscript] = useState(false)
  const [isSuperscript, setIsSuperscript] = useState(false)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      setIsStrikethrough(selection.hasFormat('strikethrough'))
      setIsCode(selection.hasFormat('code'))
      setIsSubscript(selection.hasFormat('subscript'))
      setIsSuperscript(selection.hasFormat('superscript'))
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
    <div className="absolute top-0 flex h-12 w-full max-w-full items-center divide-x divide-gray-300 overflow-x-auto border-b border-gray-400/50 shadow-sm">
      <Group>
        <ToggleCommandButton
          isActive={isBold}
          className="font-bold"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
          }}
        >
          B
        </ToggleCommandButton>
        <ToggleCommandButton
          isActive={isItalic}
          className="text-lg italic"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
          }}
        >
          I
        </ToggleCommandButton>
        <ToggleCommandButton
          isActive={isUnderline}
          className="underline"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
          }}
        >
          U
        </ToggleCommandButton>
        <ToggleCommandButton
          isActive={isStrikethrough}
          className="line-through"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
          }}
        >
          S
        </ToggleCommandButton>
        <ToggleCommandButton
          isActive={isCode}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')
          }}
        >
          <CodeIcon className="w-4" />
        </ToggleCommandButton>
      </Group>

      <Group>
        <ToggleCommandButton
          isActive={isSubscript}
          className="text-sm"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript')
          }}
        >
          X<sub>2</sub>
        </ToggleCommandButton>
        <ToggleCommandButton
          isActive={isSuperscript}
          className="text-sm"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript')
          }}
        >
          X<sup>2</sup>
        </ToggleCommandButton>
      </Group>
    </div>
  )
}

export default ToolbarPlugin
