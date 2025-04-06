import * as React from "react"
import {
  ChevronDown,
  Check,
  ChevronRight,
  Circle,
} from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = ({ 
  children, 
  triggerContent, 
  className, 
  ...props 
}) => {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])

  return (
    <div className={cn("relative", className)} ref={ref} {...props}>
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium bg-background border rounded-md shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        onClick={() => setOpen(!open)}
      >
        {triggerContent}
        <ChevronDown className="w-4 h-4 ml-2 opacity-70" />
      </button>
      {open && (
        <div className="absolute left-0 z-10 w-full mt-1 origin-top-right bg-background border rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

const DropdownMenuItem = React.forwardRef(
  ({ className, children, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex w-full items-center px-4 py-2 text-sm hover:bg-accent focus:bg-accent focus:outline-none",
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {checked ? <Check className="h-4 w-4" /> : null}
        </span>
        {children}
      </div>
    )
  }
)
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

export { DropdownMenu, DropdownMenuItem } 