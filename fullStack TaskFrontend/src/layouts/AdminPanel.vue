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
          icon: "edit_attributes",
          label: this.$t("mainNavigation.attribute.label"),
          subNavigations: [
            {
              to: "attribute",
              icon: "table_view",
              label: this.$t("mainNavigation.attribute.subNavigation.index"),
            },
          ],
        },
        {
          icon: "inventory_2",
          label: this.$t("mainNavigation.product.label"),
          subNavigations: [
            {
              to: "product",
              icon: "table_view",
              label: this.$t("mainNavigation.product.subNavigation.index"),
            },
          ],
        },
        {
          icon: "storefront",
          label: this.$t("mainNavigation.seller.label"),
          subNavigations: [
            {
              to: "seller",
              icon: "table_view",
              label: this.$t("mainNavigation.seller.subNavigation.index"),
            },
          ],
        },
        {
          icon: "sentiment_satisfied_alt",
          label: this.$t("mainNavigation.client.label"),
          subNavigations: [
            {
              to: "client",
              icon: "table_view",
              label: this.$t("mainNavigation.client.subNavigation.index"),
            },
          ],
        },
        {
          icon: "email",
          label: this.$t("mainNavigation.inbox.label"),
          subNavigations: [
            {
              to: "inbox",
              icon: "inbox",
              label: this.$t("mainNavigation.inbox.subNavigation.index"),
            },
          ],
        },
        {
          icon: "subscriptions",
          label: this.$t("mainNavigation.subscriber.label"),
          subNavigations: [
            {
              to: "subscriber",
              icon: "group",
              label: this.$t("mainNavigation.subscriber.subNavigation.index"),
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
            },
            {
              to: "role.index",
              icon: "manage_accounts",
              label: this.$t("mainNavigation.admin.subNavigation.roles"),
            },
            {
              to: "permission",
              icon: "private_connectivity",
              label: this.$t("mainNavigation.admin.subNavigation.permissions"),
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
