<script setup lang="ts"></script>

<template>
  <div class="search-list-main">
    <div class="information">
      <p class="commit-information">
        <NuxtLink class="link" to="/">
          fix(compiler-sfc): avoid passing forEach index to genMap
        </NuxtLink>
      </p>
    </div>
    <div class="right-area">
      <div class="tags">
        <SearchListTag>Verified</SearchListTag>
      </div>
      <div class="hash">
        <SearchListHash>f12db7f</SearchListHash>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-list-main {
  display: flex;
  padding: 0.5rem 1rem;
  border: 1px solid #31363c;
  border-radius: 0.375rem;

  .information {
    flex: auto;

    .commit-information {
      font-weight: 600;

      .link:hover {
        color: #477fef;
        text-decoration: underline;
      }
    }
  }

  .right-area {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
