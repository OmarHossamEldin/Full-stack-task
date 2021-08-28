<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lFf">
      <!-- Be sure to play with the Layout demo on docs -->
      <!-- Header     -->
      <PageHeader v-on:clickMenu="drawer = !drawer" />
      <!-- (Optional) A Drawer; Side NavBar -->
      <SideBar :drawer="drawer" :mainNavigations="mainNavigations" />

      <q-page-container>
        <!-- This is where pages get injected -->
        <router-view />
      </q-page-container>
      <!-- Footer -->
      <PageFooter />
    </q-layout>
  </div>
</template>

<script>
import PageHeader from "components/PageHeader.vue";
import SideBar from "components/SideBar.vue";
import PageFooter from "components/PageFooter.vue";
export default {
  name: "fullStackPanel",
  components: {
    PageHeader,
    SideBar,
    PageFooter
  },
  data() {
    return {
      drawer: false,
      mainNavigations: [
        {
          icon: "category",
          label: this.$t("mainNavigation.performanceReview.label"),
          requiedAdmin: false,
          subNavigations: [
            {
              to: "performanceReview.index",
              icon: "table_view",
              label: this.$t("mainNavigation.performanceReview.subNavigation.index"),
            },
          ],
        },
        {
          icon: "feedback",
          label: this.$t("mainNavigation.feedBackRequest.label"),
          requiedAdmin: false,
          subNavigations: [
            {
              to: "feedBackRequest.index",
              icon: "table_view",
              label: this.$t("mainNavigation.feedBackRequest.subNavigation.index"),
            },
          ],
        },
        {
          icon: "lock",
          label: this.$t("mainNavigation.user.label"),
          requiedAdmin: true,
          subNavigations: [
            {
              to: "user.index",
              icon: "admin_panel_settings",
              label: this.$t("mainNavigation.user.subNavigation.index"),
            }
          ],
        }
      ],
    };
  },
};
</script>
<style lang="sass">
body
  background-color:$grey-2

// v-select-styling
.vs__search::placeholder,
.vs__dropdown-toggle
  background: $grey-3
  border: none
  color: #394066
  min-height: 100%

.vs__clear,
.vs__open-indicator 
  fill: #394066

</style>
