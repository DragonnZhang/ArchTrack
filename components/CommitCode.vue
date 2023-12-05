<script setup lang="ts">
import {
  Diff2HtmlUI,
  type Diff2HtmlUIConfig
} from 'diff2html/lib/ui/js/diff2html-ui-slim.js'
import { ColorSchemeType } from 'diff2html/lib/types'

import 'highlight.js/styles/github-dark.min.css'
import 'diff2html/bundles/css/diff2html.min.css'

import { type CommitCode } from '~/utils/type'

const props = defineProps<CommitCode>()

const code = ref<HTMLDivElement>()

const diffConfiguration: Diff2HtmlUIConfig = {
  drawFileList: true,
  fileListToggle: false,
  fileListStartVisible: false,
  fileContentToggle: false,
  matching: 'lines',
  synchronisedScroll: true,
  highlight: true,
  renderNothingWhenEmpty: false,
  colorScheme: ColorSchemeType.DARK
}

onNuxtReady(() => {
  const diff2htmlUi = new Diff2HtmlUI(
    code.value as HTMLElement,
    props.diffString,
    diffConfiguration
  )
  diff2htmlUi.draw()
})
</script>

<template>
  <div class="code" ref="code"></div>
</template>

<style scoped lang="scss"></style>
