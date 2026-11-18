import type { ChangeEvent, FormEvent, PropsWithChildren } from 'react'
import type { RepositoryState } from './github'

export type { GithubRepository, RepositoryState } from './github'

export type PortfolioProject = {
  id: string
  category: string
  name: string
  description: string
  technologies: string[]
}

export type ProjectCardProps = { project: PortfolioProject; index: number }
export type RepositoryCardProps = { repository: import('./github').GithubRepository }

export type Profile = {
  name: string
  degree: string
  university: string
  city: string
  email: string
  githubUrl: string
  photoPath: string
  intro: string
  note: string
  heroTitle: string[]
  contactTitle: string
  contactHighlight: string
  contactIntro: string
  projectsTitle: string
  projectsHighlight: string
  projectsIntro: string
}
export type NavigationItem = { to: string; label: string }

export type Theme = 'light' | 'dark'
export type ThemeContextValue = { theme: Theme; toggleTheme: () => void }
export type ThemeProviderProps = PropsWithChildren

export type ContactFormProps = { email: string }
export type ContactFormData = { name: string; email: string; message: string }
export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>
export type ContactResult = { status: 'idle' } | { status: 'success'; mailLink: string }
export type ContactInputEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
export type ContactSubmitEvent = FormEvent<HTMLFormElement>
export type InputChangeEvent = ChangeEvent<HTMLInputElement>
export type GithubRepositoriesResult = { state: RepositoryState; retry: () => void }
