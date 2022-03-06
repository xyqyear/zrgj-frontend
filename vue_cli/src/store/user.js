export default{
    state:{
        token:''
    },
    mutations:{
        getToken(state){
            state.token = state.token || localStorage.getItem('token')
        }
    }
}
