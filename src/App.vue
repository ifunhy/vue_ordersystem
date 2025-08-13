<!-- 화면의 요소는 template안에 코딩 -->
<template>
  <!-- vue(vuetify)에서는 모든 태그의 최상단에 v-app으로 감싸져 있어야 정상적으로 동작 -->
  <v-app>
    <HeaderComponent/>
    <v-main>  <!-- header, footer를 제외한 실질적인 화면의 내용 v-main 안에 들어감 -->
      <router-view/>
    </v-main>
    <FooterComponent/>
  </v-app>
</template>

<!-- script에는 js코드를 코딩 -->
<script>
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';


// vue는 export를 통하여 해당 요소를 다른 화면에서도 import할 수 있도록 설정
// 즉 아래 문법은 App.vue라는 화면을 다른 파일에서도 import할 수 있도록 component화(모듈화) 시킨 것
export default {
  name: 'App',
  // 다른 화면을 import한 이후에 template에서 사용하려고 할 때는 components라는 변수에 나열
  components: {
    HeaderComponent, FooterComponent
  }
}
</script>

<!-- 디자인요소는 style태그 안에 코딩 -->
<style>

</style>
