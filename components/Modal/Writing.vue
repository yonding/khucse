<template>
  <div v-if="modal.writing" class="modal-outside">
    <div id="writing-modal">
      <div class="head">
        글쓰기
        <a class="close-btn" @click.prevent="$store.commit('modal/SET_WRITING_MODAL_STATE', false)" >
          <img src="../../static/btn/closebtn.png" alt="닫기"/>
        </a>
        
      </div>
      <div v-if="boardList.length > 0" class="dropdown">
        <a class="selected-board" @click.prevent="isBoardSelected = !isBoardSelected">
          <span>{{boardList[selectedBoard].title}}</span>
        </a>
        <div v-if="isBoardSelected" class="board-container">
          <div
            v-for="(b, i) in boardList"
            :key="b._id"
            class="board-item"
            @click="clickBoard(i)"
          >{{b.title}}</div>
        </div>
        <div class="input-container">
          <input v-model="title" type="text" placeholder="제목" />
          <textarea
            v-model="content"
            placeholder="글을 작성해주세요."
          ></textarea>
        </div>
        <div class="foot">
          <a class="upload-btn" @click.prevent="confirmUploadModal">등록</a>
        </div>
      </div>
    </div>
    <ConfirmModal :show="showConfirmModal" :title="confirmTitle" @confirm="listenConfirm" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import ConfirmModal from "@/components/Modal/Confirm";
export default {
  components:{
    ConfirmModal
  },
  data() {
    return {
      author:this.author,
      boardList: [],
      selectedBoard: 0,
      isBoardSelected: false,
      title: null,
      content: null,
      showConfirmModal: false,
      confirmTitle: null,
    };
  },
  computed: {
    ...mapState(["modal"])
  },
  created() {
    this.getBoardList();
  },
  methods: {
    async getBoardList() {
      const data = await this.$api.$get("/board/list");
      if (!Array.isArray(data)) {
        return;
      }
      this.boardList = data;
    },
    clickBoard(index) {
      this.selectedBoard = index;
      this.isBoardSelected = false;
    },
    listenConfirm(confirm) {
      !confirm ? this.closeConfirmModal() : this.uploadArticle();
    },
    closeConfirmModal(){
      this.showConfirmModal=false;
    },
    confirmUploadModal(){
      this.showConfirmModal=true;
    },
    async uploadArticle() {
      const data = await this.$api.$post("/article/create", {
        title: this.title,
        content: this.content,
        board: this.boardList[this.selectedBoard]._id,
      });
      if (!data) {
        return;
      }
      this.closeConfirmModal();
      this.$store.commit("modal/SET_WRITING_MODAL_STATE", false);
    }
  }
};
</script>
<style lang="scss" scoped>
#writing-modal {
  width: 550px;
  height: 600px;
  background: #1C1D1D;
  .dropdown {
    width: inherit;
    user-select: none;
    .selected-board {
      color: #A5A5A5;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      border-bottom: solid 1px #383838;
      .down-icon {
        transition: 0.3s ease-in-out;
        &.rotated {
          transform: rotate(180deg);
        }
      }
    }
    .board-container {
      position: absolute;
      overflow-y: auto;
      width: inherit;
      border-bottom: 1px solid #383838;
      height: auto;
      max-height: 252px;
    }
    .board-item {
      padding: 12px 20px 11px;
      font-size: 16px;
      border-bottom: 1px solid #383838;
      cursor: pointer;
      background: #444444;
      color: #A5A5A5;
      &:hover {
        background: #1C1D1D;
      }
    }
  }
  
  .input-container {
    padding: 0 52px;
  }
  input[type="text"] {
    margin-top:25px;
    color: #A5A5A5;
    padding: 26px 60px 24px 0;
    background: #1C1D1D;
    font-size: 20px;
    line-height: 1.25em;
    display: block;
    box-sizing: border-box;
    width: 100%;
    border: none;
    border-bottom: 1px solid #383838;
    -webkit-appearance: none;
    outline-style: none; 
    -moz-appearance: none;
    appearance: none;
  }
  input.placeholder{
    background: #1C1D1D;
  }
  input:focus, textarea:focus {
    background: #1C1D1D;
    outline:none;
  }
  textarea {
    font-family: 'Noto Sans KR Thin';
    color:#eeeeee;
    background: #1C1D1D;
    width: 100%;
    height:50px;
    resize: none;
    display: block;
    border: none;
    margin-top:10px;
    padding:0;
    font-size: 16px;
    min-height: 240px;
    overflow: hidden;
    letter-spacing: -0.1px;
    line-height: 1.5em;
  }
  .foot {
    background: #1C1D1D;
    height: 67px;
    padding: 0 24px;
    border: 0;
    display: flex;
    align-items: center;
  }
  .upload-btn{
    vertical-align:center;
    text-align:center;
    display:block;
    background:#DDDDDD;
    color: #1C1D1D;
    width:100px;
    height:30px;
  padding: 10px 0;
}
}
</style>