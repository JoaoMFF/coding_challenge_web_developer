<template>
  <nav aria-label="paginator" v-if="lastPage !== 1">
    <ul class="pagination">
      <li class="page-item" :class="{disabled: currentPage === 1}">
        <a class="page-link" aria-label="Previous" @click.prevent.stop="displayPagePrevious">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li v-for="page in pages" :key="page" class="page-item" :class="{active: page === currentPage}">
        <a v-if="page !== '...'" class="page-link" @click.prevent.stop="displayPage(page)">{{ page }}</a>
        <span v-else class="page-link no-hover">...</span>
      </li>

      <li class="page-item" :class="{disabled: lastPage === currentPage}">
        <a class="page-link" aria-label="Next" @click.prevent.stop="displayPageNext">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "search-paginator",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    lastPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    pages() {
      return this.generatePagination();
    },
  },
  methods: {
    generatePagination: function () {
      const delta = 1;

      let range = [];
      for (
          let i = Math.max(2, this.currentPage - delta);
          i <= Math.min(this.lastPage - 1, this.currentPage + delta);
          i++
      ) {
        range.push(i);
      }

      if (this.currentPage - delta > 2) {
        range.unshift('...');
      }
      if (this.currentPage + delta < this.lastPage - 1) {
        range.push('...');
      }

      range.unshift(1);
      range.push(this.lastPage);

      return range;
    },

    displayPage (page) {
      this.$emit('page-change', page);
      window.scrollTo(0, 0);
    },

    getPrevious: function () {
      const prev = this.currentPage - 1;
      if (prev === 0) {
        return 1;
      }

      return prev;
    },

    getNext: function () {
      const next = this.currentPage + 1;
      if (next > this.lastPage) {
        return this.lastPage;
      }

      return next;
    },

    displayPagePrevious: function () {
      this.displayPage(this.getPrevious());
    },

    displayPageNext: function () {
      this.displayPage(this.getNext());
    },
  },
};
</script>

<style>
.pagination {
  cursor: pointer;
}
.no-hover {
  pointer-events: none;
}
</style>