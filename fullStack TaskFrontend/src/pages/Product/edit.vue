<template>
    <div class="q-pa-md">
        <!--========BreadCrumbs=========-->
        <BreadCrumbs :title='title' />
        <q-stepper v-model="step" vertical color="primary" animated>
            <!--======================Start Step 1=====================-->
            <q-form @submit="save(productEdit)">
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
                    :selected.sync="productEdit.category_id"
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
                    <q-input dense filled v-model="productEdit.enName" label="English Name" />
                </div>
                <div class="col">
                    <q-input dense filled  v-model="productEdit.arName" label="Arabic Name" />
                </div>
                </div>
                <div class="row">
                <div class="col">
                    <q-input dense v-model="productEdit.arDescription" autogrow filled type="textarea" label="English Description"/>
                </div>
                </div>
                <div class="row">
                <div class="col">
                    <q-input dense v-model="productEdit.enDescription" autogrow filled type="textarea" label="Arabic Description"/>
                </div>
                </div>
                
                <q-stepper-navigation>
                <q-btn color="primary" type="submit" :label="$t('btns.edit')" />
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
  name: "Products.edit",
  components:{
      BreadCrumbs
  },
  computed:{
    ...mapGetters({
        tree: 'allCategoryTree',
        products:'allProducts'
    })
  },
  data() {
    return {
      title: this.$t('table.products.title'),
      lang : this.$i18n.locale === 'en-us' ? this.$i18n.locale.substr(0, 2) : this.$i18n.locale,
      step: 1,
      productEdit:{
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
    ...mapActions(['getCategoryTree', 'updateProduct']),
    resetFilter () {
      this.filter = ''
      this.$refs.filter.focus()
    },
    save(product){
      this.updateProduct(product).then((response) => {
          this.$notifyAlert(response);
          this.$router.push({name:'product'});
      });
    },
    fetchProduct(id){
       this.productEdit = this.products.filter(product => product.id === id);
       this.productEdit = {
        arName: this.productEdit[0].name,
        enName: this.productEdit[0].name,
        arDescription:this.productEdit[0].description,
        enDescription:this.productEdit[0].description,
        category_id: this.productEdit[0].category_id,
        category: this.productEdit[0].category
      };
    }
  },
  created(){
    this.getCategoryTree();
    this.fetchProduct(this.$route.params.id);
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

