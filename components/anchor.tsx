'use client'

import { type ComponentProps } from 'react'
import { usePathname } from 'next/navigation'

import { Link } from '@/lib/transition'
import { cn } from '@/lib/utils'

type AnchorProps = ComponentProps<typeof Link> & {
  absolute?: boolean
  activeClassName?: string
  disabled?: boolean
}

export function Anchor({
  absolute,
  className = '',
  activeClassName = '',
  disabled,
  children,
  ...props
}: AnchorProps) {
  const path = usePathname()

  const href = props.href.toString()
  let isMatch = absolute
    ? path === href || (href !== '/docs' && path.startsWith(`${href}/`))
    : path === href

  if (href.includes('http')) isMatch = false

  if (disabled) return <div className={cn(className, 'cursor-not-allowed')}>{children}</div>

  return (
    <Link className={cn(className, isMatch && activeClassName)} {...props}>
      {children}
    </Link>
  )
}
