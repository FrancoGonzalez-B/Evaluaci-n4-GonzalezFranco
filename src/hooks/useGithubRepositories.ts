import { useEffect, useState } from 'react'
import { getGithubRepositories } from '../services/github'
import type { RepositoryState } from '../types/github'

export function useGithubRepositories() {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<RepositoryState>({ status: 'loading' })

  useEffect(() => {
    let active = true
    setState({ status: 'loading' })

    getGithubRepositories()
      .then((repositories) => {
        if (active) setState({ status: 'success', repositories })
      })
      .catch((error: unknown) => {
        if (!active) return
        const message =
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar los repositorios.'
        setState({ status: 'error', message })
      })

    return () => {
      active = false
    }
  }, [attempt])

  return {
    state,
    retry: () => setAttempt((currentAttempt) => currentAttempt + 1),
  }
}
