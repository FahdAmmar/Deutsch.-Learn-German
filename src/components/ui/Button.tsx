import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:brightness-110 active:brightness-95',
  secondary: 'bg-accent text-accent-foreground hover:brightness-110 active:brightness-95',
  outline: 'border border-border-strong bg-transparent text-ink hover:bg-surface-sunken',
  ghost: 'bg-transparent text-ink hover:bg-surface-sunken',
  danger: 'bg-error text-error-foreground hover:brightness-110 active:brightness-95',
}

// md and lg meet the 44px touch-target guideline; sm is for dense, secondary actions only.
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-[0.95rem] gap-2',
  lg: 'h-13 px-7 text-base gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'start',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center rounded-md font-semibold transition-[background-color,filter,transform] duration-150',
        'active:translate-y-px disabled:pointer-events-none disabled:opacity-45',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon && iconPosition === 'start' ? icon : null}
      {children}
      {icon && iconPosition === 'end' ? icon : null}
    </button>
  )
}
