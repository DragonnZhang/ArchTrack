<script setup lang="ts">
import { parseUrl } from '~/utils/util'
const router = useRouter()

const val = ref('')

function search() {
  const result = parseUrl(val.value)
  if (!result) {
    alert('Illegal input')
    return
  }
  const { owner, repo, branch } = result

  router.push({ path: `/${owner}/${repo}/${branch}` })
}

function redirect() {
  window.open('https://github.com/DragonnZhang/ArchTrack')
}
</script>

<template>
  <div class="container">
    <div class="icon">
      <Icon @click="redirect" />
    </div>
    <div class="search">
      <SearchBox v-model="val" />
    </div>
    <div class="buttons">
      <Button @click="search">Analyze Code</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 720px;
  margin: 0 auto;
  padding-top: 140px;

  .icon {
    display: flex;
    justify-content: center;

    svg {
      cursor: pointer;
    }
  }

  .search,
  .buttons {
    display: flex;
    justify-content: center;
  }

  .search {
    margin-top: 14px;
  }

  .buttons {
    margin-top: 30px;
  }
}
</style>
