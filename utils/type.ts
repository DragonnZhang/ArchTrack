interface SearchResult {
  information: string
  tags: string[]
  hash: string
}

interface CommitCode {
  diffString: string
}

export type { SearchResult, CommitCode }
