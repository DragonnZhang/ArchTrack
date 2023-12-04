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
  border: 1px solid #373b41;
  border-radius: 0.375rem;
  background-color: #22262c;
  color: white;
  cursor: pointer;

  padding-left: 10px;
  padding-right: 10px;
  line-height: 24px;
  transition: all 0.1s ease;

  &:hover {
    background-color: #31363c;
    border-color: #8d949d;
  }

  &-content {
    font-weight: 500;
    font-size: 12px;
  }
}
</style>
