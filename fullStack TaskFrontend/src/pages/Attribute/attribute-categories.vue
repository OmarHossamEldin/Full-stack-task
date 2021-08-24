<template>
<div class="q-pa-md">
<BreadCrumbs :title='title' />
<q-page class="q-pa-md">
<q-card>
  <q-form @submit="assignThisAttribute($route.params.id)">
    <q-card-section>
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
          tick-strategy="leaf"
          :ticked.sync="selectedCategories"
          default-expand-all
        />
      </q-card-section>
      <q-card-section>
      <q-btn type="submit" color="primary" :label="$t('btns.save')"/>
      </q-card-section>
    </q-form>
</q-card>
</q-page>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BreadCrumbs from 'components/BreadCrumbs';
export default {
  name: "Attribute-Categories",
  components:{
    BreadCrumbs
  },
  computed:{
    ...mapGetters({
      tree: 'allCategoryTree'
    })
  },
  methods:{
    ...mapActions(['getCategoryTree', 'assignToCategories']),
    resetFilter () {
      this.filter = ''
      this.$refs.filter.focus()
    },
    assignThisAttribute(thisAttribute){
      let categories = this.selectedCategories;
      this.assignToCategories({ thisAttribute, categories}).then((response) => {
        this.$notifyAlert(response);
      });
    }
  },
  created(){
    this.getCategoryTree();
  },
  data() {
    return {
      title: this.$t('table.attributes.title'),
      lang : this.$i18n.locale === 'en-us' ? this.$i18n.locale.substr(0, 2) : this.$i18n.locale,
      filter: '',
      selectedCategories: []
    };
  }
};
</script>