<template>
    <v-container>
        <v-row justify="center">
            <v-col class="text-center text-h5">
                장바구니 목록
            </v-col>
        </v-row>
        <v-row justify="space-between">
            <v-col cols="auto">
                <v-btn color="secondary" @click="clearCart()">장바구니 비우기</v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn color="primary" @click="orderCreate()">주문하기</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-table>
                    <thead>
                        <tr>
                            <th>제품ID</th>
                            <th>제품명</th>
                            <th>주문수량</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in getProductsInCart" :key="product.productId">  <!-- 상태관리로 getter에서 getProductsInCart 가져옴-->
                            <td>{{ product.productId }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.productCount }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default{
    computed:{
        getProductsInCart(){
            return this.$store.getters.getProductsInCart; // cart.js의 getter에 있는 getProductsInCart함수를 바라보다가(변수명으로 확인) 값이 변경되면 template의 '장바구니 {{ totalQuantity }}'값 변경
        }
    },

    methods:{
        clearCart(){
            this.$store.dispatch("clearCart");
        },
        async orderCreate(){
            
        }
    }
}
</script>