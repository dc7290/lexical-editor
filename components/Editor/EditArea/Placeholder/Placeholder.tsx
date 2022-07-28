import type { FC } from 'react'

const Placeholder: FC = () => {
  return (
    <div className="pointer-events-none absolute top-16 left-4 select-none text-gray-400">
      Enter some text...
    </div>
  )
}

export default Placeholder
