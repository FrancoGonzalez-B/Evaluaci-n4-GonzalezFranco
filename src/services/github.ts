import type { GithubRepository } from '../types/github'

export const GITHUB_API_URL =
  'https://api.github.com/users/FrancoGonzalez-B/repos?type=owner&sort=updated&per_page=20'

let cachedRepositories: GithubRepository[] | null = null
let pendingRequest: Promise<GithubRepository[]> | null = null

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
    typeof repository.fork === 'boolean' &&
    typeof repository.size === 'number'
  )
}

export function getGithubRepositories(): Promise<GithubRepository[]> {
  if (cachedRepositories) return Promise.resolve(cachedRepositories)
  if (pendingRequest) return pendingRequest

  pendingRequest = fetch(GITHUB_API_URL, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2026-03-10',
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            'GitHub limitó temporalmente las solicitudes. Intenta nuevamente más tarde.',
          )
        }
        throw new Error(`GitHub respondió con el estado ${response.status}.`)
      }

      const payload: unknown = await response.json()
      if (!Array.isArray(payload)) {
        throw new Error('La respuesta de GitHub no tiene el formato esperado.')
      }

      return payload
        .filter(isGithubRepository)
        .filter((repository) => !repository.fork && repository.size > 0)
        .sort(
          (first, second) =>
            new Date(second.updated_at).getTime() -
            new Date(first.updated_at).getTime(),
        )
    })
    .then((repositories) => {
      cachedRepositories = repositories
      return repositories
    })
    .finally(() => {
      pendingRequest = null
    })

  return pendingRequest
}
