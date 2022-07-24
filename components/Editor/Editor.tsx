import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin as LexicalHistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin as LexicalRichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import type { EditorState } from 'lexical'
import type { FC } from 'react'

import { ToolBar } from './ToolBar'

type Props = {
  defaultState?: EditorState
}

const Editor: FC<Props> = ({ defaultState }) => {
  return (
    <div className="relative rounded border border-gray-400/50 bg-white pt-12 shadow">
      <LexicalComposer
        initialConfig={{
          namespace: '',
          onError: (error) => console.error(error),
          editorState: defaultState ?? null,
        }}
      >
        <ToolBar />
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
      </LexicalComposer>
    </div>
  )
}

export default Editor
