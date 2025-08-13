<template>
    <v-app-bar> <!-- 상단의 헤더 -->
        <v-container>
            <v-row>
                <v-col class="d-flex justify-start">    <!-- justify-start : 왼쪽 기준 정렬 -->
                    <div v-if="userRole==='ADMIN'">     <!-- ADMIN만 보이는 버튼-->
                        <v-btn :to="'/member/list'">회원관리</v-btn>    <!-- router에 넘겨주기 위한 작은따옴표 '/member/list' -->
                        <v-btn :to="'/product/manage'">상품관리</v-btn>
                        <v-btn href="/order/list">실시간주문건수 {{ liveOrderCount }}</v-btn>
                        <!-- <v-btn :to="'/practice/store'">스토어테스트</v-btn> -->
                    </div>
                </v-col>
                <v-col class="text-center">
                    <v-btn :to="'/'">java shop</v-btn>  <!-- :to="'/'" : home 경로로 감-->
                </v-col>
                <v-col class="d-flex justify-end">      <!-- justify-end : 오른쪽 기준 정렬 -->
                    <v-btn v-if="isLogined" :to="'/order/cart'">장바구니 {{ totalQuantity }}</v-btn>    <!-- 전역상태관리하여 totalQuantity 값 업데이트 -->
                    <v-btn :to="'/product/list'">상품목록</v-btn>
                    <v-btn v-if="isLogined" :to="'/member/mypage'">마이페이지</v-btn>
                    <v-btn v-if="!isLogined" :to="'/member/create'">회원가입</v-btn>   <!-- Login이 안 된 상태인 경우-->
                    <v-btn v-if="!isLogined" :to="'/member/login'">로그인</v-btn>   <!-- Login이 안 된 상태인 경우-->
                    <v-btn v-if="isLogined" @click="doLogout()">로그아웃</v-btn>   <!-- Login 상태인 경우-->
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import { EventSourcePolyfill } from 'event-source-polyfill';
import { jwtDecode } from 'jwt-decode';

export default{
    data(){
        return {
            userRole : null,
            isLogined : false,
            liveOrderCount : 0, // 실시간주문건수
        }
    },

    created(){
        // 로그인 시 토큰이 존재한다면 isLogined를 true로 변경
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            const payload = jwtDecode(accessToken);  // accessToken 파싱
            console.log(payload);
            this.userRole = payload.role;   // payload에서 role을 꺼냄
            this.isLogined = true;
        }

        // sse 연결 및 메시지 수신
        // 헤더 컴포넌트의 실시간주문건수 커넥트
        if (this.userRole === 'ADMIN') {
            // sse연결을 위한 event-source-polyfill라이브러리 사용
            let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/sse/connect`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            sse.addEventListener('connect', (event) => {
                console.log(event); // 콜백함수
            })
            sse.addEventListener('ordered', (event) => {
                console.log(event); // 콜백함수
                this.liveOrderCount++;  // ordered 이벤트가 들어오면 liveOrderCount의 값 증가
            })
        }
    },

    computed:{
        totalQuantity(){
            return this.$store.getters.getTotalQuantity;    // cart.js의 getter에 있는 함수를 바라보다가(변수명으로 확인) 값이 변경되면 template의 '장바구니 {{ totalQuantity }}'값 변경
        }
    },

    methods:{
        doLogout(){
            localStorage.clear();
            // window.location.reload();
            this.isLogined = false;
            this.userRole = null;
            this.$router.push("/");
        }
    }

}
</script>