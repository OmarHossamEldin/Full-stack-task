<template>
  <div class="row">
      <h5 class="pageTitle">{{title}}</h5>
        <q-space />
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Dashboard" to="dashboard" />
          <q-breadcrumbs-el :label="title" />
        </q-breadcrumbs>
  </div>
</template>

<script>
export default {
    name: "BreadCrumbs",
    props:['title']
}
</script>

<style>

</style>
<style scoped>
  .pageTitle{margin: 0 0 10px 0}
</style>
