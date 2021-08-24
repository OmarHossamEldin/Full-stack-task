<template>
  <!-- (Optional) The Footer -->
    <q-footer  class="bg-blue-grey-9 text-white">
      <q-toolbar>
        <q-toolbar-title >
          <small>Quantum &copy; {{ year-1 }} - {{ year }}</small>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
</template>

<script>
export default {
    name: "PageFooter",
    data(){
        return{
            year:new Date().getFullYear(),
        }
    }
}
</script>

<style>

</style>