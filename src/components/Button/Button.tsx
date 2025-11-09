import './Button.css'
import type { ButtonProps } from './types'

const Button = ({ onClick, children = 'Button' }: ButtonProps) => {
  return (
    <button className="button" onClick={onClick} type="button">
      {children}
    </button>
  )
}

export default Button

