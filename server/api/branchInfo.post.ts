export default defineEventHandler(async (event) => {
  const { owner, repo } = await readBody(event)

  const info = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits`,
    {
      method: 'GET'
    }
  )

  return info.body
})
