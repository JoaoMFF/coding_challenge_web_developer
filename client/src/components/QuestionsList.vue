<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Questions List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index === currentIndex }"
            v-for="(tutorial, index) in questions"
            :key="index"
        >
          {{ tutorial.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "questions-list",
  data() {
    return {
      questions: [],
      currentIndex: 1,
    };
  },
  methods: {

  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>