export type GithubRepository = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
  fork: boolean
  size: number
}

export type RepositoryState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; repositories: GithubRepository[] }
