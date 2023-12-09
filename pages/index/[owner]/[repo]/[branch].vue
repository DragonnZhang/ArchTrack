<script setup lang="ts">
const route = useRoute()
console.log(route)
</script>

<template>
  <div class="search-main">
    <div class="search-main-title">
      <h2>Commits</h2>
    </div>
    <div class="search-main-content">
      <SearchList
        information="fix(compiler-sfc): avoid passing forEach index to genMap"
        :tags="['x86', 'arm']"
        hash="af909b7d459708f2496c417957875c2d54664704"
      />
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
