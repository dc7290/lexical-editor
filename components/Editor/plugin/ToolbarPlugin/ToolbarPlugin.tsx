import { Menu, Transition } from '@headlessui/react'
import { CodeIcon } from '@heroicons/react/outline'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from '@lexical/selection'
import { mergeRegister } from '@lexical/utils'
import clsx from 'clsx'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { FC, Fragment, useCallback, useEffect, useState } from 'react'

import {
  DEFAULT_BG_COLOR,
  DEFAULT_TEXT_COLOR,
} from '../../../../utils/constants'
import { Group } from './Group'
import { ToggleCommandButton } from './ToggleCommandButton'

const colors = [
  '#fff',
  '#000',
  '#f87171',
  '#fb923c',
  '#fbbf24',
  '#facc15',
  '#a3e635',
  '#4ade80',
  '#34d399',
  '#2dd4bf',
  '#22d3ee',
  '#38bdf8',
  '#60a5fa',
  '#818cf8',
  '#a78bfa',
  '#c084fc',
  '#e879f9',
  '#f472b6',
]

type Props = {
  id: string
}

const ToolbarPlugin: FC<Props> = ({ id }) => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)

  const [textColor, setTextColor] = useState(DEFAULT_TEXT_COLOR)
  const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR)

  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [isSubscript, setIsSubscript] = useState(false)
  const [isSuperscript, setIsSuperscript] = useState(false)

  // 複数のuseEffectで使うためuseCallbackでメモ化した関数を定義
  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      setTextColor(
        $getSelectionStyleValueForProperty(
          selection,
          'color',
          DEFAULT_TEXT_COLOR
        )
      )
      setBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          'background-color',
          DEFAULT_BG_COLOR
        )
      )

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

  const applyStyleText = (style: Record<string, string>) => {
    activeEditor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, style)
      }
    })
  }

  const onTextColorSelect = (value: string) => {
    applyStyleText({ color: value })
  }
  const onBgColorSelect = (value: string) => {
    applyStyleText({ 'background-color': value })
  }

  return (
    <div className="absolute top-0 flex h-12 w-full max-w-full flex-wrap items-center divide-x divide-gray-300  border-b border-gray-400/50 bg-indigo-50 shadow-sm">
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
        <Menu as="div" className="relative">
          <Menu.Button className="my-auto flex h-8 w-8 flex-col items-center justify-center font-bold leading-tight">
            A
            <span
              className="h-0.5 w-3 rounded"
              style={{ backgroundColor: textColor }}
            ></span>
          </Menu.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
          >
            <Menu.Items className="absolute -bottom-1 left-1/2 z-10 w-44 -translate-x-1/2 translate-y-full bg-gray-50 p-4 shadow-[0_0_16px_rgba(0,0,0,0.2)]">
              <div className="grid grid-cols-6 gap-2">
                {colors.map((color) => (
                  <Menu.Item key={color}>
                    {({ active }) => (
                      <button
                        className={clsx(
                          (active || color === textColor) &&
                            'ring-2 ring-indigo-700/80 ring-offset-1',
                          'rounded pt-[100%] shadow-[0_0_4px] shadow-black/10'
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          onTextColorSelect(color)
                        }}
                      >
                        <span className="sr-only">
                          Select the {`'${color}'`}
                        </span>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
              <div className="mt-2">
                <label
                  className="block rounded border border-gray-800 px-2 text-center text-sm"
                  htmlFor={`custom-color-picker-${id}`}
                >
                  Custom
                </label>
                <input
                  type="color"
                  id={`custom-color-picker-${id}`}
                  className="sr-only"
                  value={textColor}
                  onChange={({ target: { value } }) => {
                    onTextColorSelect(value)
                  }}
                />
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <Menu as="div" className="relative">
          <Menu.Button className="my-auto flex h-8 w-8 items-center justify-center font-bold leading-tight">
            <span
              className="flex h-6 w-6 items-center justify-center"
              style={{ backgroundColor: bgColor }}
            >
              A
            </span>
          </Menu.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
          >
            <Menu.Items className="absolute -bottom-1 left-1/2 z-10 w-44 -translate-x-1/2 translate-y-full bg-white p-4 shadow-[0_0_16px_rgba(0,0,0,0.2)]">
              <div className="grid grid-cols-6 gap-2">
                {colors.map((color) => (
                  <Menu.Item key={color}>
                    {({ active }) => (
                      <button
                        className={clsx(
                          (active || color === bgColor) &&
                            'ring-2 ring-indigo-700/80 ring-offset-1',
                          'rounded pt-[100%]'
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          onBgColorSelect(color)
                        }}
                      >
                        <span className="sr-only">
                          Select the {`'${color}'`}
                        </span>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
              <div className="mt-2">
                <label
                  className="block rounded border border-gray-800 px-2 text-center text-sm"
                  htmlFor={`custom-bg-color-picker-${id}`}
                >
                  Custom
                </label>
                <input
                  type="color"
                  id={`custom-bg-color-picker-${id}`}
                  className="sr-only"
                  value={bgColor}
                  onChange={({ target: { value } }) => {
                    onBgColorSelect(value)
                  }}
                />
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
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
