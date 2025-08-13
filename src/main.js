// 중괄호가 쳐져 있으면, export된 항목 중 하나만 선택하여 import
// 중괄호가 없으면 default(대표요소) 요소를 import
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios';
import store from './store';

const app = createApp(App);

// axios의 모든 요청을 인터셉팅하여 모든 요청마다 엑세스 토큰을 자동으로 포함
axios.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        // 에러가 발생시, 사용자의 본래요청의 화면으로 되돌아가야함
        return Promise.reject(error);
    }
)

// 모든 axios요청에서 401을 받을경우에 interceptor를 통해 rt를 통한 at 재발급
// rt마저 만료되었을때는 login창으로 이동
axios.interceptors.response.use(
    response => response,
    async error => {
        if(error.response && error.response.status === 401 ){
            try{
                console.log("heeer")
                const refreshToken = localStorage.getItem('refreshToken');
                const response =  await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/refresh-at`, {refreshToken}); // Body로 refreshToken 삽입(단축속성명 사용)
                const accessToken = response.data.result.accessToken;
                localStorage.setItem("accessToken", accessToken);
                console.log("갱신성공")
                window.location.reload();
            }catch(e){  // 모든 axios 요청을 받고, response의 모든 at, rt까지 만료되었을 시 catch
                console.log("갱신 실패", e);
                localStorage.clear();
                window.location.href = "/member/login";
            }
        }
        return Promise.reject(error);
    }
)

app.use(store)
app.use(vuetify)
app.use(router)
app.mount('#app')
