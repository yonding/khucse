<template>
  <div class="main-container">
    <main>
      <div class="board-card-container">
        <BoardCard v-for="b in mainContent" :key="b.slug" :title="b.title" :slug="b.slug" :article-list="b.content"/>
      </div>
    </main>
    <div class="side-content">
    </div>
  </div>
</template>

<script>
import BoardCard from "@/components/Main/BoardCard";
export default{
  components:{
    BoardCard
  },
  data(){
    return {
      mainContent:[]
    }
  },
  created() {
    this.getRecentBoardArticleList();
  },
  methods:{
    async getRecentBoardArticleList(){
      const data = await this.$api.$get("/main");
      if(data.error){
        return;
      }
      this.mainContent = data.content;
    }
  }
}
</script>
<style lang="scss">
  .main-container{
    justify-items:center;
    justify-content:center;
    display:flex;
    margin:auto;
    max-width:1100px;
    padding-top:40px;
    main{
      padding-left:40px;
      width:100%;
      max-width:900px;
    }
  }
  .board-card-container{
    width:100%;
    display:grid;
    grid-template-columns:1fr 1fr;
    grid-gap: 50px 40px;
  }
</style>
