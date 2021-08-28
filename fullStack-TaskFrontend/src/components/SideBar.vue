<template>
  <q-drawer
        v-model="open"
        show-if-above
        bordered
        :width="200"
        :breakpoint="500"
        class="bg-grey-3"
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
</template>

<script>
export default {
    name:'SideBar',
    watch: {
        drawer: function () {
            this.open = !this.open
        }
    },
    props: {
        drawer: {
            type: Boolean,
            required: true,
        },
        mainNavigations: {
            type: Array,
            required: true,
        },
    },
    data: () => {
        return {
            open: true,
        }
    }
}
</script>

<style>

</style>