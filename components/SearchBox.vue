<script setup lang="ts">
defineProps<{
  modelValue: string
}>()
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input">
    <div class="wrapper">
      <div class="search-icon"></div>
      <input
        class="input_area"
        placeholder="e.g. https://github.com/hribz/ArchReviewerBenchmark.git[main]"
        type="text"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 552px;
  border: 2px solid var(--border-color);
  border-radius: 23px;

  .wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 46px;

    .search-icon {
      --icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z'/%3E%3C/svg%3E");
      mask: var(--icon) no-repeat;
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
      background-color: currentColor;
      color: var(--font-color);
      margin-left: 23px;
      width: 24px;
      height: 24px;
    }

    .input_area {
      flex-grow: 1;
      padding: 3px 3px 3px 15px;
      background-color: transparent;
      border-color: transparent;
      font-size: medium;
      color: var(--font-color);
      outline-width: 0;
    }
  }
}
</style>
