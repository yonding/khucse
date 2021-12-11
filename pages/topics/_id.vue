<template>
  <div class="board-container">
    <section v-if="boardList.length > 0" class="board">
      <nuxt-link
        v-for="b in boardList"
        :key="b._id"
        :class="['board-item', $route.params.id === b.slug && 'active']"
        :to="{
        name: 'topics-id',
        params: {
          id: b.slug
        }
      }"
      >{{b.title}}</nuxt-link>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boardList: [],
    };
  },
  created() {
    this.getBoardList();
  },
  methods: {
    async getBoardList() {
      const data = await this.$api.$get("/board/list");
      this.boardList = data;
    },
  }
};
</script>
<style lang="scss">

.board-container {
  padding: 32px 0;
  width: 100%;
  max-width: 1100px;
  margin: auto;
  section.board {
    font-size: 20px;
    height: 35px;
    width: 100%;
    padding-top: 1px;
    padding-bottom:20px;
    border-bottom: 2px solid #dbdee7;
    a {
      color: rgb(148, 150, 155);
      padding: 0 32px 20px;
      border-bottom: 2px solid transparent;
      &.active {
        color: rgb(34, 34, 34);
      }
    }
  }
  section.total {
    padding: 20px 0 10px;
    border-bottom: 2px solid #dbdee7;
  }
  .article-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
  
</style>