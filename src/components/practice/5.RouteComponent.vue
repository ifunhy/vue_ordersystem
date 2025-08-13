<template>
    <v-container>
        <v-btn href="/practice/route2">
            일반 라우팅
        </v-btn>
        <v-btn @click="hrefRouting()">
            일반 라우팅(함수)
        </v-btn>

        <v-btn :to="'/practice/route2'">
            SPA 경로 기반 라우팅
        </v-btn>
        <v-btn @click="spaRouting1()">
            SPA 경로 기반 라우팅(함수)
        </v-btn>

        <v-btn :to="{ name: 'RouteComponent2' }">
            SPA 이름 기반 라우팅
        </v-btn>
        <v-btn @click="spaRouting2()">
            SPA 이름 기반 라우팅(함수)
        </v-btn>

        <v-btn :to="'/practice/route3/1'">
            게시글 1번 보기
        </v-btn>

        <v-btn @click="goToPost(1)">
            게시글 1번 보기
        </v-btn>
    </v-container>
</template>

<script>
export default {
    methods: {
        hrefRouting() {
            // 화면 전체 새로고침이 발생하여 사용자 경험이 떨어질 수 있다.
            // 화면 상의 모든 컴포넌트가 새롭게 created
            window.location.href = "/practice/route2";
        },

        spaRouting1() {
            // spa는 Single Page Application의 약어이다.
            // 새로고침 없이 페이지가 로드된다.
            // 사용자경험이 좋다 ~~~~ !
            // 새롭게 라우드되는 컴포넌트만 created 되고, 기존의 컴포넌트는 created 되지 않음
            this.$router.push("/practice/route2");
        },

        spaRouting2() {
            this.$router.push({ name: "RouteComponent2" });
        },

        goToPost(postId) {
            this.$router.push(`/practice/route3/${postId}`);
        }
    }
}
</script>