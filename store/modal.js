export const state = () => ({
  login: false,
  writing: false,
})
export const mutations = {
  SET_LOGIN_MODAL_OPEN(state) {
    state.login = true
  },
  SET_LOGIN_MODAL_CLOSE(state) {
    state.login = false
  },
  SET_WRITING_MODAL_STATE(state, display) {
    state.writing = display
  },
}
export const actions = {}
