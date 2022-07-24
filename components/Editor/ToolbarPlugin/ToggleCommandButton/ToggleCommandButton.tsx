import clsx from 'clsx'
import type { ComponentProps, FC } from 'react'

type Props = {
  isActive: boolean
} & Pick<ComponentProps<'button'>, 'children' | 'className' | 'onClick'>

const ToggleCommandButton: FC<Props> = ({
  children,
  className,
  isActive,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={clsx(
        className,
        isActive ? 'bg-indigo-200' : 'bg-transparent',
        'my-auto flex h-8 w-8 items-center justify-center rounded'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ToggleCommandButton
