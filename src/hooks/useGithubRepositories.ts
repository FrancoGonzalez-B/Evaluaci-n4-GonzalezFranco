import { useEffect, useState } from 'react'
import { getGithubRepositories } from '../services/github'
import type { GithubRepositoriesResult, RepositoryState } from '../types'

export function useGithubRepositories(): GithubRepositoriesResult {
  const [attempt, setAttempt] = useState<number>(0)
  const [state, setState] = useState<RepositoryState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading' })

    getGithubRepositories(controller.signal)
      .then((repositories) => {
        if (!controller.signal.aborted) setState({ status: 'success', repositories })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        const message =
          error instanceof TypeError
            ? 'No se pudo conectar con GitHub. Revisa tu conexión e intenta otra vez.'
            : error instanceof Error
            ? error.message
            : 'No se pudieron cargar los repositorios.'
        setState({ status: 'error', message })
      })

    return () => {
      controller.abort()
    }
  }, [attempt])

  return {
    state,
    retry: () => setAttempt((currentAttempt) => currentAttempt + 1),
  }
}
