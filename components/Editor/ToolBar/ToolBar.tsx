import type { FC } from 'react'

import { Button } from './Button'
import useToggleCommand from './useToggleCommand'

const ToolBar: FC = () => {
  const [isBold, handleBoldClick] = useToggleCommand('bold')

  return (
    <div className="absolute top-0 grid h-12 w-full max-w-full grid-rows-1 gap-2.5 overflow-x-auto border-b border-gray-400/50 px-4 shadow-sm">
      <Button isActive={isBold} className="font-bold" onClick={handleBoldClick}>
        B
      </Button>
    </div>
  )
}

export default ToolBar
