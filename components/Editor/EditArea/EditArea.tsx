import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable'
import { RichTextPlugin as LexicalRichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import type { FC } from 'react'

import { Placeholder } from './Placeholder'

const EditArea: FC = () => {
  return (
    <LexicalRichTextPlugin
      contentEditable={
        <LexicalContentEditable className="h-[450px] w-full resize-none overflow-y-auto p-4 outline-none" />
      }
      placeholder={<Placeholder />}
    />
  )
}

export default EditArea
