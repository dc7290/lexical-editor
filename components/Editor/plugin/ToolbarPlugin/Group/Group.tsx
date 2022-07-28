import type { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Group: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-3/4 items-center space-x-2 px-3">{children}</div>
  )
}

export default Group
