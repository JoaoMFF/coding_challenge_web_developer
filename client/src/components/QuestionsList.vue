<template>
  <div class="content">
    <h4 class="title">Question List</h4>

    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Observations</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(question, index) in questions" :key="index">
          <td>{{ question.name }}</td>
          <td>{{ question.email }}</td>
          <td>{{ question.observations }}</td>
          <td class="date-field">{{ question.date }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-center">
      <search-paginator
          :current-page="currentPage"
          :last-page="lastPage"
          @page-change="getQuestions">
      </search-paginator>
    </div>
  </div>
</template>

<script>
import SearchPaginator from "@/components/SearchPaginator";
import axios from "axios";

export default {
  name: "questions-list",
  components: {SearchPaginator},
  data() {
    return {
      questions: [],
      currentPage: 1,
      lastPage: 3,
    };
  },
  mounted() {
    this.getQuestions(this.currentPage);
  },
  methods: {
    getQuestions(page) {
      axios.get(process.env.VUE_APP_API_URL + '/questions', {
        params: {
          page: page
        }
      }).then((response) => {
        let data = response.data;
        this.questions = data.questions;
        this.currentPage = data.currentPage;
        this.lastPage = data.lastPage;
      }).catch((error) => {
        this.questions = [];
        this.currentPage = 1;
        this.lastPage = 1;
        throw error;
      });
    }
  }
};
</script>

<style>
.date-field {
  white-space: nowrap
}
.content {
  margin: 4rem;
}
.title {
  margin-bottom: 2rem;
}
</style>