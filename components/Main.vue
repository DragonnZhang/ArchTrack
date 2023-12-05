<script setup lang="ts">
const router = useRouter()

const val = ref('')

function search() {
  const query = {
    repo: '11',
    branch: '2'
  }
  router.push({ path: '/result', query })
}
</script>

<template>
  <div class="container">
    <div class="icon">
      <Icon />
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
