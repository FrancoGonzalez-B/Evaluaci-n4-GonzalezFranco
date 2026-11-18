import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { Theme, ThemeContextValue, ThemeProviderProps } from '../types'

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readSavedTheme(): Theme {
  try {
    return window.localStorage.getItem('portfolio-theme') === 'dark'
      ? 'dark'
      : 'light'
  } catch {
    return 'light'
  }
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(readSavedTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      window.localStorage.setItem('portfolio-theme', theme)
    } catch {
      // La página sigue funcionando aunque el navegador bloquee el almacenamiento.
    }
  }, [theme])

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider.')
  }

  return context
}
