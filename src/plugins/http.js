import axios from "axios"
const MyHttpServer = {

}

MyHttpServer.install = (VUE) => {
        //请求地址
        axios.defaults.baseURL = window.g.BASE_URL

        VUE.prototype.$http = axios
    }
    //导出请求方法
export default MyHttpServer