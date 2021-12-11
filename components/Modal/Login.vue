<template>
  <div v-if="modal.login" class="modal-outside">
    <div id="login-modal">
      <div class="head">
          SIGN IN
        <a class="close-btn" @click.prevent="$store.commit('modal/SET_LOGIN_MODAL_CLOSE')"> 
          <img src="../../static/btn/closebtn.png" alt="닫기"/>
        </a>
      </div>
      <div class="body">
        <div class="row">
          <label for="user-email" aria-placeholder="EMAIL"></label>
          <input id="user-email" v-model="email" type="email" placeholder="EMAIL">
        </div>
        <div class="row">
          <label for="user-password"></label>
          <input id="user-password" v-model="password" type="password" placeholder="PASSWORD">
        </div>
        <button class="login-btn" @click="loginWithEmail">SIGN IN</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from "vuex";
  export default {
    computed: {
      ...mapState(["modal"]), 
      },
    methods:{
      async loginWithEmail(){
        // eslint-disable-next-line no-unused-vars
        const data = await this.$axios.$post(`/user/login`,{email:this.email, password: this.password});

        if (data.error) {
        return;
        }

        this.$store.commit("user/SET_USER", {
          email: data.email,
          nickname: data.nickname,
          token: data.token
        });

        this.$store.commit('modal/SET_LOGIN_MODAL_CLOSE');
      },
    }
  };
</script>
<style lang="scss" scoped>
  #login-modal {
    background: #1C1D1D;
    width: 550px;
    height: 450px;

  .body{
    padding: 70px 30px;
    color: #A5A5A5;
    font-size: 15px;
    font-weight: 300;
    text-align: center;
    letter-spacing: 7px;
  }
  .row{
    margin:0px;
    label{
      display: block;
    }
    @keyframes input-box {
      from{
      }
      to{
        background: #eeeeee;
      }
    }
    input{
      box-sizing: border-box;
      width:300px;
      height:55px;
      background: #bbbbbb; 
      border: none;
      font-size:15px;
      padding: 5px 20px;
    }
    input:focus {outline:none;}
    input::placeholder{
      color: #666666;
    }
    input:hover{
      animation: input-box 0.1s forwards;
    }
  }
  .login-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #a3a3a3;
    border:none;
    width:300px;
    height: 50px;
    font-family: 'Noto Sans KR Thin';
    color: #666666; 
    font-size: 15px;
    letter-spacing: 3px;
    font-weight: 400;
    margin: 20px auto;
  }
  .login-btn:hover{
    animation: input-box 0.1s forwards;
  }
  }
</style>