<script setup lang="ts">
const route = useRoute()
const { owner, repo, commit } = route.params

const info = await useFetch('/api/commitInfo', {
  method: 'POST',
  body: {
    owner,
    repo,
    commit
  }
})

if (typeof info.data.value === 'string') {
  info.data.value = JSON.parse(info.data.value)
}

const { files } = info.data.value as unknown as { files: any[] }

function generateDiffString(files: any[]) {
  let s = ''

  for (const file of files) {
    s += `diff --git a/${file.filename} b/${file.filename}\n${file.patch}\n`
  }

  return s
}

// unidiff format
const diffString = generateDiffString(files)
</script>

<template>
  <Head>
    <Title>{{ (info.data.value as any).commit.message }}</Title>
  </Head>
  <div class="commit">
    <div class="commit-title">
      <h2>Commit</h2>
    </div>
    <CommitCode :diffString="diffString" />
  </div>
</template>

<style scoped lang="scss">
.commit {
  width: 100%;
  padding: 0 32px;
  box-sizing: border-box;

  &-title {
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: max(1px, 0.0625rem) solid #22262c;

    h2 {
      font-size: 24px;
      font-weight: 400;
    }
  }
}
</style>
