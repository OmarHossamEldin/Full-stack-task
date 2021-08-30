<template>
  <div class="q-pa-md">
  <!--========BreadCrumbs=========-->
  <BreadCrumbs :title='title' />

  <q-page class="q-pa-md">
    <!-- table -->
    <q-table
      :data="reviews"
      :columns="columns"
      :filter="filter"
      :rows-per-page-options="[20, 30, 50, 0]"
      row-key="id"
    >
      <template v-slot:top>
        <q-btn color="primary" @click="openPrompt" :label="$t('btns.create')"  />
        <q-space />
        <q-input
          debounce="300"
          color="primary"
          v-model="filter"
          dense
          :placeholder="$t('tables.search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-active="props">
        <q-td :props="props">
          <q-btn size="sm"
            :color="!!props.row.review ?  'warning':'green'" round icon="edit"
            @click="openPrompt(props.row)" />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" >
          &nbsp;
          <q-btn size="sm" color="red" :label="$t('btns.delete')" @click="deleteThis(props.row)" />
        </q-td>
      </template>
    </q-table>
      <!-- dialog create - write review -->
      <q-dialog v-model="prompt" position="top" >
        <q-card class="column dialogForm">
          <q-form @submit="save(review)">
            <q-card-section class="col-2 row">
              <div class="text-h4">{{dialogHeader}}</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
             <!-- dialog create -->
            <q-card-section class="col-2" v-if="dialogHeader === $t('btns.create')" >
              <v-select :options="reviewers" v-model='review.reviewer_id' :reduce="reviewer_id => reviewer_id.id" label="name" :placeholder="$t('tables.headers.review.reviewer')"></v-select>
            </q-card-section>
            <q-card-section class="col-2" v-if="dialogHeader === $t('btns.create')">
              <v-select :options="reviewees" v-model='review.reviewee_id' :reduce="reviewee_id => reviewee_id.id" label="name" :placeholder="$t('tables.headers.review.reviewee')"></v-select>
            </q-card-section>
             <!-- dialog write review -->
            <q-card-section class="col-2" v-if="dialogHeader === this.$t('tables.headers.review.review')" >
               <q-input v-if="dialogHeader !==$t('btns.create')" dense filled outlined v-model="newSkill" :placeholder="$t('tables.headers.review.skill')" />
               
            </q-card-section>
            <q-card-actions  class="col-1 text-primary">
              <q-btn  color='red'  :label="$t('btns.cancel')" v-close-popup />
              <q-btn color='green'  :label="$t('btns.save')" type="submit"  v-close-popup />
              <q-btn  size="sm" color='info' round icon="add" @click="addNewSkill" v-if="dialogHeader === this.$t('tables.headers.review.review')" />
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
  name: "Reviews",
  components:{
    BreadCrumbs
  },
  watch: {
    'review.reviewer_id': function (newVal){
      this.reviewees = newVal ? this.reviewers.filter((reviewer) => reviewer.id != newVal) : [];
    }
  },
  computed:{
    ...mapGetters({
      reviews:'allReviews',
      reviewers: 'allUsersOptions',
    })
  },
  methods:{
     ...mapActions(['getUsers', 'getReviews', 'storeReview', 'writeReview', 'deleteReview']),
    save(review){
      if(review.id) {
        this.writeReview({new:review, old:this.oldReview}).then((response) => {
          this.$notifyAlert(response);
        });
      }
      else{
        this.storeReview(review).then((response) => {
          this.$notifyAlert(response);
        });
      }
      this.review = this.defaultReview;
    },
    deleteThis(thisReview){
      this.deleteReview(thisReview);
    },
    openPrompt(row){
      if(row.id) {
        this.dialogHeader = this.$t('tables.headers.review.review');
        this.oldReview = row;
        this.review = {
          id: row.id,
          skills: []
        };
      }
      else {
        this.dialogHeader = this.$t('btns.create');
        this.review = this.defaultReview;
      }
      this.prompt = !this.prompt;
    },
    addNewSkill(){
      this.review.skills.push({skill: this.newSkill});
      this.newSkill = ''
    }
  },
  created(){
    this.getUsers();
    this.getReviews();
  },
  data() {
    return {
      title: this.$t('mainNavigation.performanceReview.subNavigation.index'),
      filter: "",
      reviewees: [],
      review:{
        reviewer_id: '',
        reviewee_id: '',
      },
      defaultReview:{
        reviewer_id: '',
        reviewee_id: '',
      },
      oldReview: {},
      newSkill: '',
      prompt: false,
      dialogHeader: this.$t('btns.create'),
      columns: [
        {
          name: "#",
          required: true,
          label: this.$t("tables.headers.id"),
          align: "left",
          field: (row) => (this.reviews.indexOf(row) +1 ),
          sortable: true,
        },
        {
          name: "reviewer",
          required: true,
          label: this.$t("tables.headers.review.reviewer"),
          align: "center",
          field: (row) => row.reviewer.name,
          sortable: true,
        },
        {
          name: "reviewee",
          required: true,
          label: this.$t("tables.headers.review.reviewee"),
          align: "center",
          field: (row) => row.reviewee.name,
          sortable: true,
        },
        {
          name: "active",
          align: "center",
          label: this.$t("tables.headers.review.review"),
          field: (row) => row.review
        },
        {
          name: "actions",
          align: "center",
          label: this.$t("tables.headers.actions")
        }
      ]
    };
  }
};
</script>
<style lang="sass">
.dialogForm
  width: 500px
</style>