<template>
    <!-- 단방향바인딩, 새로고침하지 않아도 실시간으로 값이 변경 -->
     <!-- 화면 내에서는 this를 붙일 필요가 없음 -->
    <h1>hello world {{language}}</h1>
    <!-- v-model 문법을 사용하면 양방향 데이터 바인딩 -->
    <input type="text" v-model="value">
    <button @click="changeValue()">변수변경</button>
    <button @click="showValue()">변수확인</button>
</template>

<script>

    export default{
        // data() 함수는 화면에서 사용할 변수들을 정의
        data(){
            return {
                language: "JAVA",
                value: "java"
            }
        },

        // 개발자가 정의하는 함수는 methods 안에 정의
        methods: {
            changeValue() {
                // this의 의미는 현재 컴포넌트 객체 자신을 의미
                // this는 주로 컴포넌트 내부에 선언된 변수(data함수내)에 접근할 때 주로 사용
                // 데이터에서 접근하는 건 this가 필요하고, 파라미터가 들어올 경우 해당 파라미터의 값을 변환하거나 리턴한 건 문제되지 않음
                this.value = "C++";
            },
            showValue() {
                alert(this.value);
            }

        }
    }
</script>