<template>
<div class="q-pa-md">
<BreadCrumbs :title='title' />
<q-page class="q-pa-md">
    
    <!-- table -->
    <q-table
      :data="attributes"
      :columns="columns"
      :filter="filter"
      :rows-per-page-options="[20, 30, 50, 0]"
      row-key="id"
    >
      <template v-slot:top>
        <q-btn color="primary" @click="openPrompt" :label="$t('btns.create')"  />
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
          <q-btn size="sm" color="green" :label="$t('attribute.assignToCatigory')" :to="{name:'attribute.category', params:{id:props.row.id}}"  /> 
          &nbsp;
          <q-btn size="sm" color="info" :label="$t('btns.edit')" @click="openPrompt(props.row)"  /> 
          &nbsp;
          <q-btn size="sm" color="red" :label="$t('btns.delete')" @click="deleteThis(props.row)" />
        </q-td>
      </template>
    </q-table>
    <!-- dialog create - edit -->
    <q-dialog v-model="prompt" position="top">
        <q-card class="column">
          <q-form @submit="save(attribute)">
            <q-card-section class="col-3 row">
              <div class="text-h4">{{dialogHeader}}</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section class="col-3">
              <q-input dense filled outlined v-model="attribute.enName" :placeholder="$t('attribute.enName')"  />
            </q-card-section>
            <q-card-section class="col-3">
              <q-input dense filled outlined v-model="attribute.arName" :placeholder="$t('attribute.arName')" />
            </q-card-section>
            <q-card-actions  class="col-1 text-primary">
              <q-btn flat :label="$t('btns.cancel')" v-close-popup />
              <q-btn flat :label="$t('btns.save')" type='submit' v-close-popup />
            </q-card-actions>
          </q-form>
        </q-card>
    </q-dialog>
  </q-page>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BreadCrumbs from 'components/BreadCrumbs';
export default {
  name: "Attributes",
  components:{
    BreadCrumbs
  },
  computed:{
    ...mapGetters({
      attributes:'allAttributes',
      options: 'allAttributeOptions'
    })
  },
  methods:{
    ...mapActions(['getAttributes', 'storeAttribute', 'updateAttribute', 'deleteThisAttribute']),
    save(attribute){
      if( attribute.id ) {
        this.updateAttribute(attribute).then((response) => {
          this.$notifyAlert(response);
        });
      }
      else {
        this.storeAttribute(attribute).then((response) => {
          this.$notifyAlert(response);
        });
      }   
      this.attribute = this.defaultAttribute;
    },
    deleteThis(thisAttribute){
      this.deleteThisAttribute(thisAttribute);
    },
    openPrompt(row){
      if(row.id) {
        this.dialogHeader = this.$t('headers.edit');
        this.attribute = {
          id: row.id,
          arName: row.name,
          enName: row.name
        };
      }
      else{
        this.dialogHeader = this.$t('headers.create');
        this.attribute = this.defaultAttribute;
      }
      this.prompt = !this.prompt;
    }
  },
  created(){
    this.getAttributes();
  },
  data() {
    return {
      title: this.$t('table.attributes.title'),
      lang : this.$i18n.locale === 'en-us' ? this.$i18n.locale.substr(0, 2) : this.$i18n.locale,
      filter: "",
      attribute:{
        arName: "",
        enName: ""
      },
      defaultAttribute:{
        arName: "",
        enName: ""
      },
      prompt: false,
      dialogHeader: this.$t('headers.create'),
      columns: [
        {
          name: "#",
          required: true,
          label: this.$t("table.attributes.headers.id"),
          align: "left",
          field: (row) => (this.attributes.indexOf(row) +1 ),
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: this.$t("table.attributes.headers.name"),
          align: "center",
          field: (row) => row.name,
          sortable: true,
        },
        {
          name: "belongsTo",
          required: true,
          label: this.$t("table.attributes.headers.belongsTo"),
          align: "center",
          field: (row) => (row.category ? row.category.map((key) =>( key.name + ' '))  : ''),
          sortable: true,
        },
        {
          name: "actions",
          align: "center",
          label: this.$t("table.attributes.headers.actions")
        }
      ]
    };
  }
};
</script>