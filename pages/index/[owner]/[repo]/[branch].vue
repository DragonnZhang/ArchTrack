<script setup lang="ts">
import { getTimeDiff } from '~/utils/util'
import * as XLSX from 'xlsx'

const route = useRoute()
const { owner, repo } = route.params
const config = useRuntimeConfig()

const repoId = ref()

const archMap = ref(
  new Map<
    string,
    {
      result_nlp: string
      result_sa: string
    }
  >()
)

async function exportData() {
  const commitInformation = (await commitInfo(
    config.public.url,
    repoId.value,
    1,
    30
  )) as any
  const commitInformationValue = commitInformation.data.value

  const ws = XLSX.utils.json_to_sheet(
    JSON.parse(commitInformationValue).payload.commits
  )
  console.log(ws)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, `123.xlsx`)
}

let page = 1

async function loadAndGetInfo() {
  const repoInformation = (await loadRepo(
    config.public.url,
    owner as string,
    repo as string
  )) as any
  const tmpData = JSON.parse(repoInformation.data.value)

  if (tmpData.status === 0) {
    repoId.value = tmpData.payload.repo
    // 获得 commit 信息，添加到列表中
    loadCommit(repoId.value, page, 15)
  } else {
    setTimeout(loadAndGetInfo, 10000)
  }
}

loadAndGetInfo()

async function loadCommit(repoId: string, page: number, per_page = 15) {
  const commitInformation = (await commitInfo(
    config.public.url,
    repoId,
    page,
    per_page
  )) as any
  const commitInformationValue = JSON.parse(commitInformation.data.value)
    .payload.commits
  commitInformationValue.forEach(
    (v: { hash: string; result_nlp: string; result_sa: string }) => {
      archMap.value.set(v.hash as string, {
        result_nlp: v.result_nlp,
        result_sa: v.result_sa
      })
    }
  )
}

const info = await useFetch('/api/branchInfo', {
  method: 'POST',
  body: {
    owner,
    repo
  }
})

if (typeof info.data.value === 'string') {
  info.data.value = JSON.parse(info.data.value)
}

const commitInfoArray = ref(info.data.value as unknown as any[])

const endIndex = ref(15)

const bodyData = computed(() => {
  return commitInfoArray.value.length
    ? commitInfoArray.value.slice(0, endIndex.value)
    : []
})

function getMoreData() {
  endIndex.value += 15
  page++
  loadCommit(repoId.value, page, 15)
}

const search = ref('')

const animation = ref(false)

watch(search, async () => {
  if (search.value.length === 0) {
    commitInfoArray.value = info.data.value as unknown as any[]
    return
  }
  if (search.value.length !== 40) {
    return
  }
  animation.value = true
  const d = await useFetch('/api/commitInfo', {
    method: 'POST',
    body: {
      owner,
      repo,
      commit: search.value
    }
  })
  if (typeof d.data.value === 'string') {
    d.data.value = JSON.parse(d.data.value)
  }
  animation.value = false
  commitInfoArray.value = [d.data.value]
})
</script>

<template>
  <Head>
    <Title>Commits · {{ owner }}/{{ repo }}</Title>
  </Head>
  <div class="search-main">
    <div class="search-main-title">
      <h2>Commits</h2>
    </div>
    <div class="head-container">
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
      <SearchCommit v-model="search" :animation="animation" />
    </div>
    <div class="search-main-content">
      <VirtualList
        :dataSource="bodyData"
        :itemHeight="80"
        :viewHeight="1000"
        @getMoreData="getMoreData"
      >
        <template #item="{ item }">
          <SearchList
            :information="item.commit.message"
            :committer="item.committer?.login || item.commit.author.name"
            :commitTime="getTimeDiff(item.commit.committer.date)"
            :tags="archMap.get(item.sha)?.result_sa ? archMap.get(item.sha)?.result_sa.split(';') as unknown as string[] : ['']"
            :hash="item.sha"
            :avatar="item.committer?.avatar_url || ''"
          />
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<style scoped lang="scss">
.export-button {
  &:hover {
    background-color: rgb(22 163 74);
  }

  display: flex;
  background-color: #22262c;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.375);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100px;
  height: 30px;

  svg {
    width: 12px;
    height: 12px;
    padding-right: 0.5rem;
  }
}

.head-container {
  display: flex;
  justify-content: space-between;
}

.search-main {
  max-width: 1280px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;

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
