<script setup lang="ts">
import { type SearchResult } from '~/utils/type'

defineProps<SearchResult>()
</script>

<template>
  <div class="search-list-main">
    <div class="information">
      <p class="commit-information">
        <NuxtLink class="link" :to="`/commit/${hash}`">
          {{ information }}
        </NuxtLink>
      </p>
    </div>
    <div class="right-area">
      <div class="tags">
        <SearchListTag v-for="tag in tags" :key="tag">{{ tag }}</SearchListTag>
      </div>
      <div class="hash">
        <SearchListHash>{{ hash.slice(0, 7) }}</SearchListHash>
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
  margin-bottom: 10px;

  &:hover {
    background-color: #171b21;
  }

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

    .tags {
      display: flex;
    }
  }
}
</style>
