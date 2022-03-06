export default{
    state:{
        token:''
    },
    mutations:{
        setToken(state,val){
            state.token = val
            localStorage.set('token',val)
        },
        clearToken(state){
            state.token = ''
            localStorage.remove('token')
        },
        getToken(state){
            state.token = state.token || localStorage.get('token')
        }
    }
}
