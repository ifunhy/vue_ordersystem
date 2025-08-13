<template>
    <h1>Hook 실습</h1>
    <button @click="moveScreen()">다른 화면으로 이동</button>
    <h1>{{ count1 }}</h1>
    <button @click="incrementCount()">count1 증가</button>
    <!-- computed를 통해 계산된 함수의 결과갑은 함수명 그대로 변수처럼 사용 가능 -->
    <h1>computed된 값 : {{ doubleCount }}</h1>
</template>

<script>
export default{
    data() {
        return {
            count1: 0,
        }
    },
    // // 화면이 열리기 전(vue인스턴스가 생성되기 전) 실행되는 함수
    // // 예시) 목록조회, 상세조회
    // created(){
    //   alert("created 테스트");  
    // },

    // 컴포넌트가 화면 상에서 제거될 때 실행되는 함수(라우트 이동 시)
    // 예시) 채팅화면을 벗어나 다른 화면으로 이동 시 실시간 연결 종료
    beforeUnmount() {
        alert("화면종료");
    },

    // 종속된 데이터가 변경될 때 함수를 다시 실행하여 값을 계산해서 리턴하는 함수
    // 예시) 장바구니 수량 보여줄 때
    computed:{
        doubleCount(){
            // this.count1이 변경되면, doubleCount값이 변하는 로직
            return this.count1 * 2; // this.count1이 변경되면 *2를 하고 그 값을 doubleCount()에 담음
        }
    },
    // // 특정 변수값의 변경사항을 인지하여 함수를 실행하는 hook 함수
    // // 예시) 검색어 입력 시 자동 api 호출
    // watch:{
    //     // 인지하고자 하는 변수값과 일치되는 함수명 사용
    //     count1(){
    //         alert("watch 함수 실행")
    //     }
    // },
    // 화면의 변경사항을 인지하는 hook 함수
    updated(){
        alert("updated함수 호출")
    },

    methods:{
        moveScreen() {
            this.$router.push("/practice/vuetify");
        },
        incrementCount() {
            this.count1++;
        }
    }

}

</script>