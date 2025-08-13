<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        로그인
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                label="이메일"
                                type="email"
                                v-model="email"
                                prepend-icon="mdi-email"
                            />
                            <v-text-field
                                label="비밀번호"
                                type="password"
                                v-model="password"
                                prepend-icon="mdi-lock"
                            />
                            <v-row>
                                <v-col>
                                    <v-btn color="primary" block @click="memberLogin()">   <!-- block : 속한 row에서 너비를 꽉 채우는 옵션-->
                                        등록
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getErrorMessage, getResultData } from '@/utils/commonDataHandler';
import axios from 'axios';

export default{
    data(){
        return{
            // 서버에 있는 dto의 이름과 같아야 함
            email : null,
            password : null,
        }
    },

    methods:{
        async memberLogin(){
            try {
                const data = {email:this.email, password:this.password}
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/doLogin`, data)

                const result = getResultData(response); // commonDataHandler로 response를 보냄
                const accessToken = result.accessToken;
                const refreshToken = result.refreshToken;
                localStorage.setItem("accessToken", accessToken);  // localStorage.setItem(key, value)
                localStorage.setItem("refreshToken", refreshToken);

                console.log(response);
                alert("로그인이 완료되었습니다.");

                window.location.href = "/"; // 홈화면으로 이동
            } catch(e) {        // 에러가 터지는 경우 e변수 안에 서버에서 주는 error메시지가 담김
                console.log(e);
                alert(getErrorMessage(e));  // commonDataHandler로 e를 보냄
            }
        }
    }
}
</script>