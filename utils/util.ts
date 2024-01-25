export function parseUrl(url: string) {
  // 使用正则表达式匹配 url 中的 owner, repo 和 branch
  // owner 是第一个 / 后面的字符串，repo 是第二个 / 后面的字符串，branch 是 [ 和 ] 之间的可选字符串
  // 使用非贪婪模式，避免匹配多余的字符
  const regex = /https:\/\/github\.com\/(.*?)\/(.*?)\.git(?:\[(.*?)\])?/
  // 使用 exec 方法执行正则表达式，得到一个匹配结果的数组
  const result = regex.exec(url)
  // 如果匹配成功，返回一个对象，否则返回 null
  if (result) {
    return {
      owner: result[1], // 第一个捕获组是 owner
      repo: result[2], // 第二个捕获组是 repo
      branch: result[3] || 'main' // 第三个捕获组是 branch，如果没有则默认为 main
    }
  } else {
    return null
  }
}

export async function loadRepo(url: string, owner: string, repo: string) {
  const repoInfo = await useFetch(`${url}/api/load`, {
    method: 'GET',
    query: {
      url: `https://github.com/${owner}/${repo}.git`
    },
    mode: 'no-cors'
  })
  return repoInfo
}

export async function commitInfo(
  url: string,
  repo_id: string,
  page: number,
  per_page: number
) {
  try {
    const commitInfo = await useFetch(`${url}/api/commit`, {
      method: 'GET',
      query: {
        repo_id,
        page,
        per_page
      }
    })
    return commitInfo
  } catch (err) {}
}

export function getTimeDiff(date: string): string {
  const timeMillis = Date.parse(date)
  const nowMillis = Date.now()

  const diffMillis = nowMillis - timeMillis

  const dayMillis = 24 * 60 * 60 * 1000
  const hourMillis = 60 * 60 * 1000

  let result

  if (diffMillis < dayMillis) {
    result = diffMillis / hourMillis
    result = Math.floor(result)
    return result + ' hours ago'
  } else {
    result = diffMillis / dayMillis
    result = Math.floor(result)
    if (result === 1) {
      return 'yesterday'
    }
    return result + ' days ago'
  }
}

// export async function repoInfo(url: string, repo_id: string) {
//   const repoInfo = await useFetch(`${url}/api/repo`, {
//     method: 'GET',
//     query: {
//       repo_id
//     },
//     mode: 'no-cors'
//   })
//   return repoInfo
// }
