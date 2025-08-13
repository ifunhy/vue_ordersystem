<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        회원가입
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                label="이름"
                                type="text"
                                v-model="name"
                                prepend-icon="mdi-account"
                            />
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
                                    <v-btn color="primary" block @click="memberCreate()">   <!-- block : 속한 row에서 너비를 꽉 채우는 옵션-->
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
import axios from 'axios';

export default{
    data(){
        return{
            // 서버에 있는 dto의 이름과 같아야 함
            name : null,
            email : null,
            password : null,
        }
    },

    methods:{
        async memberCreate(){
            try {
                const data = {name:this.name, email:this.email, password:this.password}
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`, data)
                this.$router.push("/");     // 홈화면으로 이동
            // 에러가 터지는 경우 e변수 안에 서버에서 주는 error메시지가 담김
            } catch(e) {
                console.log(e);
                alert(e.response.data.status_message);
            }
        }
    }
}
</script>