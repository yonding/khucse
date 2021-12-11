<template>
<div class="nav-container">
  <nav>
    <div class="left-side">
      <nuxt-link to="/">
        <img src="../static/logo/logo.png" alt="홈페이지 로고" style="width:100px">
      </nuxt-link>
    <SearchBar/>
    </div>
    <div class="right-side">
      <a @click.prevent="clickWritingButton">
        글쓰기
      </a>
      <a @click.prevent="clickLoginButton">
        {{user.email ? "로그아웃":"로그인"}}
      </a>
    </div>
    <LoginModal/>
    <WritingModal/>
  </nav>
</div>
</template>
<script>
import {mapState} from "vuex"
import LoginModal from "./Modal/Login"
import WritingModal from "./Modal/Writing"
import SearchBar from "./SearchBar"
export default {
  components:{
    LoginModal,
    WritingModal,
    SearchBar
  },
  computed:{
    ...mapState(["user"]),
  },
  methods:{
    clickWritingButton(){
      if(!this.user.email){
        this.$store.commit("modal/SET_LOGIN_MODAL_OPEN");
        return;
      }
      this.$store.commit("modal/SET_WRITING_MODAL_STATE", true);
    },
    clickLoginButton(){
      if(!this.user.email){
        this.$store.commit("modal/SET_LOGIN_MODAL_OPEN");
        return;
      }
      this.logout();
    },
    logout() {
      this.$store.commit("user/SET_USER", {
        email: null,
        nickname: null
      });
    }
  }
}
</script>
<style lang="scss">
.nav-container{
  background: black;
  border-bottom: 1px solid #aaaaaa;
}
nav{
  margin:auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  height: 120px;
  padding:0 20px;
  max-width: 1100px;
  .left-side, .right-side{
    display: flex;
    height: 100%;
    align-items:center;
    img{
      margin: 0 60px 0 35px;
    }
    img:hover{
      opacity:80%;
    }
    .menu{
      font-size:20px;
      margin-right: 30px;
      font-weight: 600;
      text-decoration: none;
      color: #eeeeee;
      font-family:'Noto Sans KR Thin';
    }
    .menu:hover{
      color:#ffffff;
    }
  }
  .right-side a{
    font-size:20px;
    margin-left: 30px;
    font-weight: 600;
    text-decoration: none;
    color: #eeeeee;
    font-family:'Noto Sans KR Thin';
    cursor: pointer;
  }
  .right-side a:hover {
    color:#ffffff;
  }
}
</style>