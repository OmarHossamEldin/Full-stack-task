<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lFf">
      <!-- Be sure to play with the Layout demo on docs -->
      <!-- Header     -->
      <PageHeader v-on:clickMenu="drawer = !drawer" />
      <!-- (Optional) A Drawer; Side NavBar -->
      <q-drawer
        v-model="drawer"
        show-if-above
        bordered
        :width="200"
        :breakpoint="500"
        content-class="bg-white"
      >
        <q-scroll-area class="fit">
          <q-list>
            <q-item to="dashboard" v-ripple>
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>
              <q-item-section>
                {{ $t("dashboard.dashboard") }}
              </q-item-section>
            </q-item>
            <q-separator />
            <q-expansion-item
              v-for="(mainNavigation, id) in mainNavigations"
              :key="id"
              :icon="mainNavigation.icon"
              :label="mainNavigation.label"
              header-class="text-primary"
            >
              <q-list padding class="menu-list">
                <q-item
                  v-for="(
                    subNavigation, subid
                  ) in mainNavigation.subNavigations"
                  :key="subid"
                  :to="{name:subNavigation.to}"
                >
                  <q-item-section avatar>
                    <q-icon :name="subNavigation.icon" />
                  </q-item-section>
                  <q-item-section>
                    {{ subNavigation.label }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

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
import PageFooter from "components/PageFooter.vue";
export default {
  name: "adminPanel",
  components: {
    PageHeader,
    PageFooter,
  },
  data() {
    return {
      drawer: false,
      mainNavigations: [
        {
          icon: "category",
          label: this.$t("mainNavigation.category.label"),
          subNavigations: [
            {
              to: "category",
              icon: "table_view",
              label: this.$t("mainNavigation.category.subNavigation.index"),
            },
          ],
        },
        {
          icon: "lock",
          label: this.$t("mainNavigation.admin.label"),
          subNavigations: [
            {
              to: "admin.index",
              icon: "admin_panel_settings",
              label: this.$t("mainNavigation.admin.subNavigation.index"),
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
