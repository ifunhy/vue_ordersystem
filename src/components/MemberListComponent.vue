<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">
                        회원목록
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>이름</th>
                                    <th>이메일</th>
                                    <th>상세보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="member in memberList" :key="member.id">  <!-- 서버로부터 memberList의 member.id를 받아와야 함-->
                                    <td>{{ member.id }}</td>
                                    <td>{{ member.name }}</td>
                                    <td>{{ member.email }}</td>
                                    <td><v-btn :to="`/member/detail/${member.id}`">상세보기</v-btn></td>    <!-- 상세보기를 누르면 해당 url로 이동 -->
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
// import { getErrorMessage } from '@/utils/commonDataHandler';
import axios from 'axios';

export default{
    data(){
        return{
            memberList : [],
        }
    },

    async created(){
        try {
            // const accessToken = localStorage.getItem("accessToken");
            // const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`,{
            //     headers: {
            //         Authorization: `Bearer ${accessToken}` // at를 담은 헤더명
            //     }
            // })

            // axios의 요청을 main.js에 에서 인터셉팅하여 토큰 확인 처리로 위는 주석 처리
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`);
            this.memberList = getResultData(response);
        } catch(e){
            console.log(e);
            // alert(getErrorMessage(e));
        }
    }
}
</script>