import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin as LexicalHistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin as LexicalRichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import type { EditorState, EditorThemeClasses } from 'lexical'
import type { FC } from 'react'

import { ToolbarPlugin } from './plugin/ToolbarPlugin'
import { TreeViewPlugin } from './plugin/TreeViewPlugin'

const theme: EditorThemeClasses = {
  ltr: 'text-left',
  paragraph: 'mt-1 first:mt-0',
  rtl: 'text-right',
  text: {
    bold: 'font-bold',
    code: 'bg-gray-100 px-1 py-0.5 text-purple-400',
    italic: 'italic',
    strikethrough: 'line-through',
    subscript: 'subscript',
    superscript: 'superscript',
    underline: 'underline',
    underlineStrikethrough: '[text-decoration-line:underline_line-through]',
  },
}

type Props = {
  defaultState?: EditorState
}

const Editor: FC<Props> = ({ defaultState }) => {
  return (
    <div className="relative rounded border border-gray-400/50 bg-white pt-12 shadow">
      <LexicalComposer
        initialConfig={{
          namespace: 'editor',
          theme,
          onError: (error) => console.error(error),
          editorState: defaultState ?? null,
        }}
      >
        <ToolbarPlugin />
        <LexicalRichTextPlugin
          contentEditable={
            <LexicalContentEditable className="h-[450px] w-full resize-none overflow-y-auto p-4 outline-none" />
          }
          placeholder={
            <div className="pointer-events-none absolute top-16 left-4 select-none text-gray-400">
              Enter some text...
            </div>
          }
        />
        <LexicalHistoryPlugin />
        <TreeViewPlugin />
      </LexicalComposer>
    </div>
  )
}

export default Editor
