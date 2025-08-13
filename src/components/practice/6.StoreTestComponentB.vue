<template>
    <h1>store componentB</h1>
    <p>지역변수값 count : {{ count }}</p>   <!-- data()에 선언된 count값 삽입됨-->
    <p>전역store변수값 count : </p>
</template>

<script>
export default{
    data(){
        return{
            count: 0,
        }
    }
}
</script>