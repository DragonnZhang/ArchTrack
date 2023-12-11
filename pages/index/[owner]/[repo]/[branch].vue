<script setup lang="ts">
const route = useRoute()
const { owner, repo } = route.params

const info = await useFetch('/api/branchInfo', {
  method: 'POST',
  body: {
    owner,
    repo
  }
})

console.log(info.data.value)

const commitInfoArray = ref(info.data.value as unknown as any[])

const endIndex = ref(15)

const bodyData = computed(() => {
  return commitInfoArray.value.length
    ? commitInfoArray.value.slice(0, endIndex.value)
    : []
})

function getMoreData() {
  endIndex.value += 5
}

function getTimeDiff(date: string): string {
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
            :committer="item.committer.login"
            :commitTime="getTimeDiff(item.commit.committer.date)"
            :tags="['x86', 'arm']"
            :hash="item.sha"
            :avatar="item.committer.avatar_url"
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

  &-content {
  }
}
</style>
