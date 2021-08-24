<template>
<div class="q-pa-md">
<BreadCrumbs :title='title' />
<q-page class="q-pa-md">
    <!-- table -->
    <q-table
      :title="$t('table.subscribers.title')"
      :data="subscribers"
      :columns="columns"
      :filter="filter"
      :rows-per-page-options="[20, 30, 50, 0]"
      row-key="id"
      separator="vertical"
    >
      <template v-slot:top>
        <q-btn color="primary" @click="sendOfferForAllSubscriber" :label="$t('table.subscribers.headers.sendAll')"  />
        <q-space />
        <q-input
          dense
          rounded
          outlined
          debounce="300"
          color="primary"
          v-model="filter"
          :placeholder="$t('table.search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
       <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn color='green' :label="$t('table.subscribers.headers.sendOffers')"  @click="sendOfferForSubscriber(props.row)"  />
        </q-td>
      </template>
    </q-table>
</q-page>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BreadCrumbs from 'components/BreadCrumbs';
export default {
  name: "Subscribers",
  components:{
    BreadCrumbs
  },
  computed:{
    ...mapGetters({
      subscribers:'allSubscribers',
    })
  },
  data() {
    return {
      title: this.$t('table.subscribers.title'),
      filter: "",
      columns: [
        {
          name: "id",
          required: true,
          label: this.$t("table.subscribers.headers.id"),
          align: "left",
          field: (row) => row.id,
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: this.$t("table.subscribers.headers.Subscriber"),
          align: "center",
          field: (row) => row.email,
          sortable: true,
        },
        {
          name: "parentCategory",
          align: "center",
          label: this.$t("table.subscribers.headers.Subscribed"),
          field: (row) => (new Date(row.created_at).toLocaleString()),
          sortable: true,
        },
        {
          name: "actions",
          align: "center",
          label: this.$t("table.subscribers.headers.actions")
        }
      ]
    };
  },
  methods:{
    ...mapActions(['getSubscribers', 'sendingOfferForSelectedSubscriber','sendingOfferForAll']),
    sendOfferForSubscriber(subscriber){
      this.sendingOfferForSelectedSubscriber(subscriber).then((response) => {
        this.$notifyAlert(response);
      });
    },
    sendOfferForAllSubscriber(){
      this.sendingOfferForAll().then((response) => {
        this.$notifyAlert(response);
      });
    }
  },
  created(){
    this.getSubscribers();
  }
};
</script>
