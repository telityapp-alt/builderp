import * as React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

interface MotionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

const Component = React.forwardRef<HTMLAnchorElement, MotionLinkProps>(
  ({ className, href, children, ...props }, ref) => (
    <Link className={className} to={href} ref={ref} {...(props as object)}>
      {children}
    </Link>
  )
)
Component.displayName = "Component"

export const MotionLink = motion(Component)
MotionLink.displayName = "MotionLink"
