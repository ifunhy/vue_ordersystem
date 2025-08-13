<template>
    <h1>store componentA</h1>
    <p>지역변수값 count : {{ count }}</p>   <!-- data()에 선언된 count값 삽입됨-->
    <v-btn @click="incrementCount()">count값 증가</v-btn>
    <p>전역store변수값 count : {{ getStoreCount }}</p>
    <v-btn @click="incrementStoreCount()">전역store count값 증가</v-btn>

    <br><br><br>
</template>

<script>
export default{
    data(){
        return{
            count: 0,
        }
    },

    computed:{
        getStoreCount(){    // count : {{ getStoreCount }}처럼 computed 내 함수는 변수처럼 사용 가능
            return this.$store.getters.getCount;
        }
    },

    methods:{
        incrementCount(){
            this.count++;
        },
        incrementStoreCount(){
            // store의 actions를 호출할 때, dispatch함수 사용
            this.$store.dispatch("incrementCount");
        }
    }
}
</script>