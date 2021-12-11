<template>
    <div class="board-card">
      <div class="head">
        <div class="title-side">
          <h2>{{title}}</h2>
        </div>
        <nuxt-link :to="{
          name: 'topics-id',
          params: {
            id: 'bestboard'
          }
        }">더보기</nuxt-link>
      </div>

      <div class="body">
        <ul class="article-list">
          <li v-for="a in articleList" :key="a._id">
            <span class="article-title">{{a.title}}</span>
            <div class="count-display">
              <div class="count-item">
                {{a.commentCount}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true
      },
      articleList: {
        type: Array,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: [],
      }
    }
  }
</script>
<style lang="scss">

</style>