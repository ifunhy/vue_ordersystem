<template>
    <StoreTestComponentA/>
    <StoreTestComponentB/>
</template>

<script>
import StoreTestComponentA from './6.StoreTestComponentA.vue';
import StoreTestComponentB from './6.StoreTestComponentB.vue';

export default{
    // 화면의 요소로 A,B 컴포넌트 추가
    components:{
        StoreTestComponentA, StoreTestComponentB
    }
}
</script>