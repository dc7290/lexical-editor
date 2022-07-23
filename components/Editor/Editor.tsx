import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin as LexicalHistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin as LexicalRichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import type { EditorState } from 'lexical'
import type { FC } from 'react'

type Props = {
  defaultState?: EditorState
}

const Editor: FC<Props> = ({ defaultState }) => {
  return (
    <div className="relative bg-white rounded shadow border-gray-400/50 border">
      <LexicalComposer
        initialConfig={{
          namespace: '',
          onError: (error) => console.error(error),
          editorState: defaultState ?? null,
        }}
      >
        <LexicalRichTextPlugin
          contentEditable={
            <LexicalContentEditable className="w-full h-[450px] outline-none p-4 resize-none" />
          }
          placeholder={
            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none select-none">
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
