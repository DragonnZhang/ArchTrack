<template>
  <button class="button"><slot></slot></button>
</template>

<style scoped lang="scss">
.button {
  background-color: var(--button-color);
  padding: 12px 16px;
  margin: 8px;
  font-size: 16px;
  color: var(--font-color);
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}
</style>
