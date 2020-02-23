export const mutations = {
  
  getHomeHot(state, result) {

    var subjects = result.data.subjects
    // console.log('subjects  ==> ', subjects );

    var subjectsL = subjects.length
    // console.log("subjectsL ==>> ", subjectsL )

    let start = Math.floor(  Math.random() * (subjectsL - 6))
    // console.log("start ==>> ", start )

    // state.homeHotData.data.subjects.push(...result.data.subjects)
    state.homeHotData.data.subjects = subjects.slice( start , start + state.params.count);

    // console.log(' state.homeHotData.data.subjects  ==> ',  state.homeHotData.data.subjects );
    
  },

  getHomeV(state, result) {

    var subjects = result.data.subjects
    // console.log('subjects  ==> ', subjects );

    var subjectsL = subjects.length
    // console.log("subjectsL ==>> ", subjectsL )

    let start = Math.floor(  Math.random() * (subjectsL - 6))
    // console.log("start ==>> ", start )

    // state.homeHotData.data.subjects.push(...result.data.subjects)
    state.homevData.data.subjects = subjects.slice( start , start + state.params.count);

    console.log(' state.homevData.data.subjects  ==> ',  state.homevData.data.subjects );
    
  }

}
