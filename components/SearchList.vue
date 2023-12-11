<script setup lang="ts">
import { type SearchResult } from '~/utils/type'

defineProps<SearchResult>()
</script>

<template>
  <div class="search-list-main">
    <div class="information">
      <p class="commit-information">
        <NuxtLink class="link" :to="`commit/${hash}`">
          <span>{{ information }}</span>
        </NuxtLink>
      </p>
      <div class="meta-data">
        <img
          class="committer-avatar"
          :src="avatar"
          alt="1"
          width="20"
          height="20"
        />
        <span class="committer-name">{{ committer }}</span
        ><span class="committer-time">&nbspcommitted {{ commitTime }}</span>
      </div>
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
  padding: 0.7rem 1.2rem;
  border: 1px solid #31363c;
  border-radius: 0.375rem;
  margin-bottom: 15px;

  &:hover {
    background-color: #171b21;
  }

  .information {
    flex: auto;

    .commit-information {
      font-weight: 600;
      margin: 0;

      .link {
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        line-height: 22px;
        overflow: hidden;
        width: 800px;

        & span:hover {
          color: #477fef;
          text-decoration: underline;
        }
      }
    }

    .meta-data {
      display: flex;
      align-items: center;
      padding-top: 4px;

      .committer-avatar {
        border-radius: 50%;
        margin-right: 5px;
      }

      .committer-name {
        font-weight: 600;
        font-size: 12px;
      }

      .committer-time {
        font-size: 12px;
        color: #768390;
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

    .hash {
      width: 80px;
      text-align: center;
    }
  }
}
</style>
