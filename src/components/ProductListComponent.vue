<template>
  <v-container>
    <v-row class="d-flex justify-content-between mt-5">
        <v-col>
            <v-form>
                <v-row>
                    <v-col cols="auto">
                        <v-select
                        v-model="searchType"
                        :items="searchOptions"
                        item-title="text"
                        item-value="value"
                        />  <!-- 검색 옵션 설정 -->
                    </v-col>
                    <v-col>
                        <v-text-field label="search" v-model="searchValue" @keyup.enter="searchProduct" />
                    </v-col>
                    <v-col cols="auto">
                        <v-btn @click="searchProduct()">검색</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
        <!-- Admin일 때 분기처리 -->
        <v-col cols="auto" v-if="!isAdmin">
            <v-btn @click="addCart()" color="primary">장바구니</v-btn>
            <v-btn @click="createdOrder()" color="secondary">주문하기</v-btn>
        </v-col>
        <v-col cols="auto" v-if="isAdmin">
            <v-btn :to="'/product/create'" color="primary">상품등록</v-btn>
        </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-h5 text-center">
            {{ pageTitle }}
          </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>제품사진</th>
                  <th>제품명</th>
                  <th>가격</th>
                  <th>재고수량</th>
                  <!-- Admin, User 분기처리 -->
                  <th v-if="!isAdmin">주문수량</th>
                  <th v-if="!isAdmin">주문선택</th>
                  <th v-if="isAdmin">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in productList" :key="product.id">
                  <td>
                    <v-img :src="product.productImage"></v-img>
                  </td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.stockQuantity }}</td>
                  <td v-if="!isAdmin">
                    <!-- input박스는 화면에서 숫자처럼 보여도, 실제 입력값은 문자열 -->
                    <!-- v-model.number로 number 형변환 -->
                    <v-text-field
                    v-model.number="product.productCount"
                    type="number"
                    style="width:65px;"
                    />  <!-- 주문수량 -->
                  </td>
                  <!-- Admin, User 분기처리 -->
                  <td v-if="!isAdmin">
                    <input type="checkbox" v-model="product.selected">  <!-- selected라는 변수에 product.id가 false로 기본 세팅-->
                </td>
                <td v-if="isAdmin">
                    <v-btn color="secondary">상품삭제</v-btn>
                </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';
  export default{
    props: ['isAdmin', 'pageTitle']
    ,

    data() {
      return {
        productList: [],
        pageSize: 7,    // 로드되는 페이지 사이즈
        currentPage: 0, // 로드되는 현재 페이지
        isLoading: false,    // 데이터 로딩 중복 방지
        isLastPage: false,  // 마지막 페이지 확인
        searchType: "productName",     // 사용자가 입력한 값
        searchValue: "",    // 사용자가 선택한 카테고리값
        searchOptions: [{text:"상품명", value:"productName"}, {text:"카테고리", value:"category"}],  // 검색 옵션 배열
        // searchOptions: [{text:"선택", value:"optional"}, {text:"상품명", value:"productName"}, {text:"카테고리", value:"category"}],  // 검색 옵션 배열
      }
    },

    created() {
        this.loadData();    // 시작하자마자 loadData를 호출
        window.addEventListener('scroll', this.scrollPaging);    // 스크롤 시 scrollPaging() 함수가 호출되는 이벤트 설정
    },

    methods:{
      addCart(){
        let totalQuantity = 0;
        const orderProductList = this.productList
                                .filter(p=>p.selected && Number(p.productCount) > 0)
                                .map(p=> ({productId: p.id, productCount: Number(p.productCount),
                                }))
        for(let i=0; i<orderProductList.length; i++){
          totalQuantity += orderProductList[i].productCount;
        }
        console.log(totalQuantity); // 장바구니에 담을 수량 잘 찍히는지
        this.$store.dispatch("addCart", totalQuantity);
      },
      searchProduct(){
          // 검색 시 초기화
          this.productList = [];
          this.currentPage = 0;
          this.isLastPage = false;
          this.isLoading = false;
          // 초기화 후 데이터 로드
          this.loadData();
      },

      scrollPaging(){
          // 현재화면높이 + 스크롤로 이동한 거리 > 전체화면높이 - n(내가원하는길이) 가 성립되면 추가 데이터 로드
          const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;   // boolean값

          if (isBottom && !this.isLoading && !this.isLastPage){   // isBottom=true, this.isLoading=false(실행 안 되는 상태), this.isLastPage=false 면 데이터 로드
              this.loadData();
              console.log("test");
          }
      },

      async loadData(){
          this.isLoading = true;
          // 문자열로 직접 ?size=xx&page=yy&&productName=ee&&category=zz 형태로도 조립 가능하지만, params라는 객체를 사용하면 파라미터형식으로 url 조립
          let params={
              size: this.pageSize,
              page: this.currentPage,
          }

          if (this.searchType == "productName") {
              params.productName = this.searchValue;  // 사용자가 입력한 값
          }

          if (this.searchType == "category") {
              params.category = this.searchValue; // 사용자가 선택한 카테고리
          }

          const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`, {params});
          const additionalData = response.data.result.content.map(p=>({...p, productCount:0, selected:false})); // 기존의 데이터 + productCount = 0, selected를 false로 세팅
          
          if (additionalData.length == 0) {   // 받아올 데이터가 더이상 없으면
              this.isLastPage = true;
          }
          this.productList = [...this.productList, ...additionalData];   // 기존 페이지 데이터 + 새 페이지 데이터 로드
          // 로드된 후 현재페이지 값 ++
          this.currentPage++;
          this.isLoading = false;
      },

      orderedProduct(){
          return this.productList
          .filter(p=>p.selected && Number(p.productCount) > 0)
          .map(p=> ({productId: p.id, productCount: Number(p.productCount),
          }))
      },

      async createdOrder(){
          try{
              const orderedProductList = this.orderedProduct();

              // 선택/수량 검증
              if (orderedProductList.length === 0) {
                  alert('선택된 상품이 없거나 주문수량이 1개 이상이 아닙니다.');
                  return;
              }

              console.log('보낼 데이터:', orderedProductList);

              // JWT 쓰면 토큰 첨부
              const accessToken = localStorage.getItem('accessToken');

              const res = await axios.post(
                  `${process.env.VUE_APP_API_BASE_URL}/ordering/create`,
                  orderedProductList,
                  {
                  headers: {
                      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
                      'Content-Type': 'application/json',
                  },
              });
              console.log(res.data);

              // 성공 처리
              alert('주문이 완료되었습니다.');
              // 성공 시 초기화
              // window.location.reload();
              this.selected = {};
              this.productList = this.productList.map(p => ({ ...p, productCount: 0, selected: false }));
          } catch (e) {
              console.error(e);
              alert('주문 중 오류가 발생했습니다.');
          }
      },
  },
}
</script>