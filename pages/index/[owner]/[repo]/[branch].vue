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

const commitInfoArray = info.data.value as unknown as any[]

const endIndex = ref(20)

const bodyData = computed(() => {
  return commitInfoArray ? commitInfoArray.slice(0, endIndex.value) : []
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
</script>

<template>
  <div class="search-main">
    <div class="search-main-title">
      <h2>Commits</h2>
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
