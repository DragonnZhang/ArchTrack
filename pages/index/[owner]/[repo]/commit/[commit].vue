<script setup lang="ts">
import { exportData } from '~/utils/util'

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
      <button @click="exportData" class="export-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" x2="12" y1="15" y2="3"></line>
        </svg>
        Extract
      </button>
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
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 24px;
      font-weight: 400;
    }

    .export-button {
      &:hover {
        background-color: rgb(22 163 74);
      }

      display: flex;
      background-color: rgb(34 197 94);
      color: white;
      border: none;
      border-radius: 4px;
      padding: 0.5rem 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;

      svg {
        width: 12px;
        height: 12px;
        padding-right: 0.5rem;
      }
    }
  }
}
</style>
