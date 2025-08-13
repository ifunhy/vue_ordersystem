<template>
    <h1>vue 조건식</h1>

    <button v-if="!isLogined" @click="doLogin()">로그인버튼</button>
    <button v-if="isLogined" @click="doLogout()">로그아웃버튼</button>

    <div v-if="!isLogined">로그인해주세요</div>
    <div v-if="isLogined">환영합니다</div>

    <h1>상품목록조회</h1>
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in productList" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>

            </tr>
        </tbody>
    </table>
</template>

<script>
import axios from 'axios';

export default{
    data(){
        return {
            isLogined : false,
            productList: []
            // productList: [{id:1, name:"사과", price:1000}, {id:2, name:"바나나", price:1500}, {id:3, name:"귤", price:1200}]
        }
    },
    // created : 화면이 열림과 동시에 실행되는 hook함수
    async created() {
        const response = await axios.get("http://localhost:8080/product/list")
        console.log(response);
        this.productList = response.data.result.content;    // 배열 형식으로 담겨 있을 것, 서버에서 page 객체를 사용했기 때문에 .content
    },

    // 개발자가 정의한 함수
    methods: {
    doLogin() {
        this.isLogined = true;
        alert("환영합니다")
    },
    doLogout() {
        this.isLogined = false;
        alert("로그인해주세요");
    }
}
}
</script>