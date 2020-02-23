export const mutations = {
  videosData(state, result) {
    if (state.isInit) {
      state.isInit = false;
    }

    if (state.isInitial) {
      state.isInitial = false;
    }

    if (result.data.subjects.length < state.params.count) {
      state.isHas = false;
    }

    state.videosData.data.subjects.push(...result.data.subjects)
    console.log("result.data.subjects ==>> ", result.data.subjects)

    state.params.start += state.params.count;

  },

  changevidosBox(state, o) {
    state.vidosBoxData.vidosBox = o.vidosBox;
    // console.log("state.vidosBoxData.vidosBox ==> ", state.vidosBoxData.vidosBox)

    state.vidosBoxData.vidosBoxH = o.vidosBoxH
    // console.log("state.vidosBoxData.vidosBoxH ==> ", state.vidosBoxData.vidosBoxH)
  }
}
