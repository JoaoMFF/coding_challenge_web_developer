<template>
  <div class="form">
    <h4 class="title">Add Question</h4>

    <form class="row g-3 needs-validation" role="form" method="POST" @submit.prevent="handleSubmitForm">
      <div class="col-md-4">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="name" required>
      </div>
      <div class="col-md-4">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="col-md-4">
        <label for="observationDate" class="form-label">Date</label>
        <input type="date" class="form-control" id="observationDate" v-model="date" :min="dateInTwoDays" required>
      </div>
      <div class="col-md-12">
        <label for="observations" class="form-label">Observations</label>
        <textarea class="form-control" id="observations" v-model="observations" rows="4" cols="50" required></textarea>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" type="submit">Submit form</button>
      </div>
    </form>

    <div v-if="isSuccess" class="alert alert-success" role="alert">
      Question added with success!
    </div>
    <div v-if="isError" class="alert alert-danger" role="alert">
      Something went wrong!
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "add-question",
  data() {
    return {
      name: "",
      email: "",
      observations: "",
      date: "",
      isSuccess: false,
      isError: false,
    };
  },
  computed: {
    dateInTwoDays() {
      let oneDay = 1000 * 60 * 60 * 24
      return new Date(new Date().getTime() + oneDay * 2).toISOString().split('T')[0];
    },
  },
  mounted() {
    this.date = this.dateInTwoDays;
  },
  methods: {
    handleSubmitForm() {
      axios.post(process.env.VUE_APP_API_URL + '/questions', {
        name: this.name,
        email: this.email,
        observations: this.observations,
        date: this.date,
      }).then(() => {
        this.isSuccess = true;
        this.name = "";
        this.email = "";
        this.observation = "";
        this.date = "";
      }).catch(() => {
        this.isError = true;
      });
    }
  }
};
</script>

<style>
.form {
  margin: 4rem 0;
}

.title {
  margin-bottom: 2rem;
}

.alert {
  margin-top: 2rem;
}
</style>
