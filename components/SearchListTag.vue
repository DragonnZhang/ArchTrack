<script setup lang="ts"></script>

<template>
  <div class="button">
    <span class="button-content">
      <slot></slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
.button {
  border: 1px solid #31363c;
  border-radius: 2rem;
  color: #61c453;
  cursor: pointer;
  margin-right: 8px;

  padding-left: 10px;
  padding-right: 10px;
  line-height: 22px;
  transition: all 0.1s ease;

  &:hover {
    background-color: #31363c;
    border-color: #438440;
  }

  &-content {
    font-weight: 500;
    font-size: 12px;
  }
}
</style>
