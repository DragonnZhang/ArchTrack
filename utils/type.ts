export interface SearchResult {
  information: string
  tags: string[]
  hash: string
  committer: string
  commitTime: string
  avatar: string
}

export interface CommitCode {
  diffString: string
}

export type VirtualListProps<T> = {
  itemHeight: number
  dataSource: T[]
  viewHeight: number
}
