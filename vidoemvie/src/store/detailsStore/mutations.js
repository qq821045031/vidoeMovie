export const mutations = {
  getdetailData(state, data) {
    state.detailsData = data;
  },

  //修改宽度
  changeW(state, w) {
    state.detailsData.w = w;
  },

  // 修改行数
  changeDisplay(state) {
    state.display = state.display == 'block' ? '-webkit-box' : 'block';
  },


  //重置state
  resetState(state) {
    state.detailsData = {
      images: {},
      durations: [],
      rating: {},
      casts: [],
      trailerurls:"",
    };

  },

}
