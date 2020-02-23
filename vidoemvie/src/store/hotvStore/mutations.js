export const mutations = {
  changeHotData(state, result) {

    if (state.isInit) {
      state.isInit = false;
    }

    if (state.isInitial) {
      state.isInitial = false;
    }

    if (result.data.subjects.length < 5) {
      state.isHas = false;
    }

    state.HotData.data.subjects.push(...result.data.subjects);

    state.params.start += state.params.count;

  },

  changeHotBox(state, o) {
    state.hotBoxData.hotBox = o.hotBox;
    state.hotBoxData.hotBoxH = o.hotBoxH;
  },

}
