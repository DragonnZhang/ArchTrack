<script setup lang="ts">
const route = useRoute()
const { commit } = route.params

const diffString = `diff --git a/components/Main.vue b/components/Main.vue
index 06a943a..28f34e3 100644
--- a/components/Main.vue
+++ b/components/Main.vue
@@ -1,8 +1,14 @@
 <script setup lang="ts">
+const router = useRouter()
+
 const val = ref('')
 
 function search() {
-  console.log(val.value)
+  const query = {
+    repo: '11',
+    branch: '2'
+  }
+  router.push({ path: '/result', query })
 }
 <script>
@@ -12,7 +18,7 @@ function search() {
       <Icon />
     </div>
     <div class="search">
-      <Search v-model="val" />
+      <SearchBox v-model="val" />
     </div>
     <div class="buttons">
       <Button @click="search">Analyze Code</Button>
diff --git a/components/Search.vue b/components/Search.vue
deleted file mode 100644
index 9f87b97..0000000
--- a/components/Search.vue
+++ /dev/null
`
</script>

<template>
  <div class="commit">
    <div class="commit-title">
      <h2>Commit</h2>
    </div>
    <CommitCode :diffString="diffString" />
  </div>
</template>

<style scoped lang="scss">
.commit {
  width: 100%;
  padding: 0 32px;
  box-sizing: border-box;

  &-title {
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: max(1px, 0.0625rem) solid #22262c;

    h2 {
      font-size: 24px;
      font-weight: 400;
    }
  }
}
</style>
