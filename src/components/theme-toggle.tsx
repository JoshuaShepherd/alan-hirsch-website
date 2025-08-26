"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-md flex items-center justify-center bg-secondary/80 hover:bg-secondary transition-colors">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </button>
    )
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    if (theme === "dark") return <Moon className="h-[1.2rem] w-[1.2rem]" />
    if (theme === "light") return <Sun className="h-[1.2rem] w-[1.2rem]" />
    return <Sun className="h-[1.2rem] w-[1.2rem]" /> // system default
  }

  const getTooltipText = () => {
    if (theme === "light") return "Switch to dark mode"
    if (theme === "dark") return "Switch to system"
    return "Switch to light mode"
  }

  return (
    <button
      onClick={toggleTheme}
      title={getTooltipText()}
      className="w-10 h-10 rounded-md flex items-center justify-center bg-secondary/80 hover:bg-secondary transition-all duration-200 hover:scale-105"
    >
      <div className="transition-transform duration-200">
        {getIcon()}
      </div>
    </button>
  )
}
