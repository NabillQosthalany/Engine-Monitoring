export const state = () => ({
    keterangan:"",
    projectName:0,
    projectId:"",
    username:""
})


export const mutations = {
    keterangan: (state,data) => {
        state.keterangan = data
    }
    projectName: (state,data) => {
        state.name = data
    }
    projectId: (state,data) => {
        state.id = data
    }
    username: (state,data) => {
        state.username = data
    }
}