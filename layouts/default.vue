<template>
  <div>
    <NavigationBar/>
    <Nuxt />
  </div>
</template>
<script>
export default {
  created() {
    this.initLogin();
  },
  methods: {
    async initLogin() {
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await this.$api.$get("/user/token");
        if (!data.email) {
          return;
        }
        this.$store.commit("user/SET_USER", {
          email: data.email,
          nickname: data.nickname,
          // eslint-disable-next-line object-shorthand
          token:token
        });
    }
  }
};
</script>