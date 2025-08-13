<template>
    <h1>store componentB</h1>
    <p>지역변수값 count : {{ count }}</p>   <!-- data()에 선언된 count값 삽입됨-->
    <p>전역store변수값 count : {{ getStoreCount }}</p>
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
}
</script> 