<script setup lang="ts">
import { getTimeDiff } from '~/utils/util'

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
    <SearchCommit v-model="search" :animation="animation" />
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
            :tags="[archMap.get(item.sha)?.result_sa as unknown as string]"
            :hash="item.sha"
            :avatar="item.committer?.avatar_url || ''"
          />
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
