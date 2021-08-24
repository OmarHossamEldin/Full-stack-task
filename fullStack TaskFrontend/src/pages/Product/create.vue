<template>
    <div class="q-pa-md">
        <!--========BreadCrumbs=========-->
        <BreadCrumbs :title='title' />
        <q-stepper v-model="step" vertical color="primary" animated>
            <!--======================Start Step 1=====================-->
            <q-form @submit="save(product)">
              <q-step :name="1" title="Choose Category" icon="settings" :done="step > 1">
                <q-input ref="filter" filled v-model="filter" label="Filter">
                  <template v-slot:append>
                    <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
                  </template>
                </q-input>
                  <q-tree
                    :nodes="tree"
                    node-key="id"
                    label-key='name'
                    :filter="filter"
                    :selected.sync="product.category_id"
                    default-expand-all
                  />
                  <q-stepper-navigation>
                  <q-btn @click="step = 2" color="primary" label="Continue" />
                  </q-stepper-navigation>
              </q-step>
              <!--======================End Step 1=====================-->

              <!--=====================Start Step 2=====================-->
              <q-step :name="2" title="Product Details" icon="create_new_folder" :done="step > 2">
                <div class="row">
                <div class="col ">
                    <q-input dense filled v-model="product.arName" label="English Name" />
                </div>
                <div class="col">
                    <q-input dense filled  v-model="product.enName" label="Arabic Name" />
                </div>
                </div>
                <div class="row">
                <div class="col">
                    <q-input dense v-model="product.enDescription" autogrow filled type="textarea" label="English Description"/>
                </div>
                </div>
                <div class="row">
                <div class="col">
                    <q-input dense v-model="product.arDescription" autogrow filled type="textarea" label="Arabic Description"/>
                </div>
                </div>
                
                <q-stepper-navigation>
                <q-btn color="primary" type="submit" :label="$t('btns.create')" />
                <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
              </q-step>
            </q-form>
            <!--======================End Step 2=====================-->
        </q-stepper>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BreadCrumbs from 'components/BreadCrumbs';
export default {
  name: "Products.create",
  components:{
      BreadCrumbs
  },
  computed:{
    ...mapGetters({
      tree: 'allCategoryTree'
    })
  },
  data() {
    return {
      title: this.$t('table.products.title'),
      lang : this.$i18n.locale === 'en-us' ? this.$i18n.locale.substr(0, 2) : this.$i18n.locale,
      step: 1,
      product:{
        arName: "",
        enName: "",
        arDescription:"",
        enDescription:"",
        category_id: ""
      },
      defaultProduct:{
        arName: "",
        enName: "",
        arDescription:"",
        enDescription:"",
        category_id: ""
      },
      filter: ''
    };
  },
  methods:{
    ...mapActions(['getCategoryTree', 'storeProduct']),
    resetFilter () {
      this.filter = ''
      this.$refs.filter.focus()
    },
    save(product){
      this.storeProduct(product).then((response) => {
          this.$notifyAlert(response);
      });
      this.product = this.defaultProduct;
    }
  },
  created(){
    this.getCategoryTree();
  }
};
</script>

<style lang="sass" scoped>
.row
  margin: 3px 0

// col
.col
  padding:0 5px

</style>

