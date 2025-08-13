<template>
        <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">
                        {{ pageTitle }}
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                        <!-- <v-table v-if="memberDetail"> -->
                            <tbody>
                                <tr>
                                    <td>ID : </td>
                                    <td>{{ memberDetail.id }}</td>
                                </tr>
                                <tr >
                                    <td>이름 : </td>
                                    <td>{{ memberDetail.name }}</td>
                                </tr>
                                <tr>
                                    <td>이메일 : </td>
                                    <td>{{ memberDetail.email }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getResultData } from '@/utils/commonDataHandler';
import axios from 'axios';


export default{
    // 화면 간 매개변수를 넘길 때 사용하는 변수값을 props라 칭함
    props: ['isMyPage', 'pageTitle'], // 분기처리의 대상이 되는 매개변수를 나열
    
    data(){
        return{
            // memberDetail: null,
            memberDetail: {}
        }
    },

    async created(){
        try{
            // props 생성 후 분기 처리
            // MyPage인 경우
            if (this.isMyPage){
            // axios의 요청을 main.js에 에서 인터셉팅하여 토큰 확인 처리로 위는 주석 처리
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/myinfo`);  // 서버 엔드포인트가 /member/myinfo
            this.memberDetail = getResultData(response);
            } else{      // MyPage 아닌 경우
            const memberId = this.$route.params.id;
            // axios의 요청을 main.js에 에서 인터셉팅하여 토큰 확인 처리로 위는 주석 처리
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/detail/${memberId}`);
            this.memberDetail = getResultData(response);
            }
        } catch(e){
            console.log(e);
        }
    },
}
</script>