<template>
  <div class="q-pa-md">
      <!--========BreadCrumbs=========-->
      <BreadCrumbs :title='title' />
      <q-page class="q-pa-md">
        <!-- table -->
        <q-table
            :title="$t('table.categories.title')"
            :data="products"
            :columns="columns"
            :filter="filter"
            :rows-per-page-options="[20, 30, 50, 0]"
            row-key="id"
          >
          <template v-slot:top>
              <q-btn color="primary" :to="{name:'product.create'}" :label="$t('btns.create')"  />
              <q-space />
              <q-input
                dense
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
                <q-btn size='sm' color="green" :label="$t('btns.show')" :to="{name:'product.show', params:{id:props.row.id}}" /> 
                &nbsp;
                <q-btn size='sm' color="info" :label="$t('btns.edit')"  :to="{name:'product.edit', params:{id:props.row.id}}" /> 
                &nbsp;
                <q-btn size='sm' color="red" :label="$t('btns.delete')" @click="deleteThis(props.row)" />
              </q-td>
          </template>
        </q-table>
      </q-page>
  </div>
</template>

<script>
import BreadCrumbs from 'components/BreadCrumbs';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "Products",
  components:{
    BreadCrumbs
  },
  computed:{
    ...mapGetters({
      products:'allProducts'
    })
  },
  data() {
    return {
      title: this.$t('table.products.title'),
      lang : this.$i18n.locale === 'en-us' ? this.$i18n.locale.substr(0, 2) : this.$i18n.locale,
      filter: "",
      arName: "",
      enName: "",
      parent_id:"",
      columns: [
        {
          name: "id",
          required: true,
          label: this.$t("table.products.headers.id"),
          align: "left",
          field: (row) => (this.products.indexOf(row) +1 ),
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: this.$t("table.products.headers.name"),
          align: "center",
          field: (row) => row.name,
          sortable: true,
        },
        {
          name: "category",
          align: "center",
          label: this.$t("table.products.headers.category"),
          field: (row) => (row.category ? row.category.name : ''),
          sortable: true,
        },
        {
          name: "status",
          align: "center",
          label: this.$t("table.products.headers.status"),
          field:  (row) => (row.status),
          sortable: true,
        },
        {
          name: "actions",
          align: "center",
          label: this.$t("table.products.headers.actions"),
          field: (row) => row.id
        }
      ]
    };
  },
  methods:{
    ...mapActions(['getProducts', 'deleteThisProduct']),
    deleteThis(product){
      this.deleteThisProduct(product).then((response) =>{
        this.$notifyAlert(response);
      });
    }
  },
  created(){
    this.getProducts();
  }
};
</script>
