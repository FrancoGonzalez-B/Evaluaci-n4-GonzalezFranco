import type { GithubRepository } from '../types'

export const GITHUB_API_URL =
  'https://api.github.com/users/FrancoGonzalez-B/repos?sort=updated&per_page=6'

let cachedRepositories: GithubRepository[] | null = null

function isGithubRepository(value: unknown): value is GithubRepository {
  if (typeof value !== 'object' || value === null) return false

  const repository = value as Record<string, unknown>

  return (
    typeof repository.id === 'number' &&
    typeof repository.name === 'string' &&
    typeof repository.html_url === 'string' &&
    (typeof repository.description === 'string' ||
      repository.description === null) &&
    (typeof repository.language === 'string' || repository.language === null) &&
    typeof repository.stargazers_count === 'number' &&
    typeof repository.updated_at === 'string' &&
    !Number.isNaN(Date.parse(repository.updated_at)) &&
    typeof repository.fork === 'boolean' &&
    typeof repository.size === 'number'
  )
}

export async function getGithubRepositories(signal: AbortSignal): Promise<GithubRepository[]> {
  signal.throwIfAborted()
  if (cachedRepositories !== null) return cachedRepositories

  const response = await fetch(GITHUB_API_URL, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error('GitHub limitó las solicitudes. Intenta nuevamente más tarde.')
    }
    throw new Error(`No se pudieron cargar los repositorios (HTTP ${response.status}).`)
  }
  const payload: unknown = await response.json()
  if (!Array.isArray(payload) || !payload.every(isGithubRepository)) {
    throw new Error('La respuesta de GitHub no tiene el formato esperado.')
  }
  signal.throwIfAborted()
  cachedRepositories = payload
  return cachedRepositories
}
