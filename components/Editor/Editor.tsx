import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { HistoryPlugin as LexicalHistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import type { EditorState, EditorThemeClasses } from 'lexical'
import type { FC } from 'react'

import { EditArea } from './EditArea'
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
        <EditArea />
        <TreeViewPlugin />

        <LexicalHistoryPlugin />
      </LexicalComposer>
    </div>
  )
}

export default Editor
