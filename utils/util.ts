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
