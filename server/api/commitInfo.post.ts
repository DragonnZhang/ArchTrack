export default defineEventHandler(async (event) => {
  const { owner, repo, commit } = await readBody(event)

  const info = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits/${commit}`,
    {
      method: 'GET'
    }
  )

  return info.body
})
