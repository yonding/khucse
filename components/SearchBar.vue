<template >
  <div class="wrap-searchbar">
  <SearchIcon class="search-icon" />
    <input v-model="query" type="text" placeholder="SEARCH"/>
  </div>

</template>
<script>
import {SearchIcon} from 'vue-feather-icons';
export default {
  components:{
    SearchIcon
  },
  data(){
    return{
      query:null
    }
  }
  
}
</script>
<style lang="scss" scoped>
.wrap-searchbar{
  width:650px;
  margin-top:30px;
  margin-bottom:20px;
  & > .search-icon{
    position:absolute;
    margin-left:20px;
    margin-top:18px;
  }
  & > input {
    background:white;
    display:block;
    width: inherit;
    height:55px;
    padding:0 10px 0 60px;
    border: none;
    box-sizing:boder-box;
    font-size:18px;
  }
}
  
</style>