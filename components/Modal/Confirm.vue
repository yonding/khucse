<template >
  <div v-if="show" class="modal-outside">
    <div id="confirm-modal">
    <div class="title">{{title}}</div>
    <span style="color:white; ">등록하시겠습니까?</span>
    <div class="btn-container">
      <button class="cancel-btn" @click="$emit('confirm', false)">
      취소      
      </button>
      <button class="confirm-btn" @click="$emit('confirm', true)">
      {{confirmBtnText}}
      </button>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    show:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default:"",
      required:true,
    },
    confirmBtnText:{
      type:String,
      default:"확인",
    }
  }
}
</script>
<style lang="scss">
  #confirm-modal {
  width: 320px;
  padding: 24px;
  background: black;
  text-align:center;
  .btn-container {
    display: flex;
    margin-top: 30px;
  }
}
  .cancel-btn, .confirm-btn {
    background-color: #888888;
    width: 100%;
    height: 48px;
    margin: 0 6px;
    font-size: 16px;
    font-weight: 400;
    color: #fff;
    border: none;
    &.confirm {
      background-color: #222;
    }
    &:hover{
      opacity:0.7;
    }
  }
</style>