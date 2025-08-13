function initState(){   // 새로고침 할 때마다 호출
    return {
        totalQuantity: localStorage.getItem("totalQuantity") || 0,   // 상태값 설정. localStorage에 totalQuantity의 값이 있으면 가져오고, 없으면 0
        productsInCart: JSON.parse(localStorage.getItem("productsInCart")) || []    // localStorage에 배열형식으로 저장되는 걸 JSON형태로 파싱) 
    }
}

// 배열형식이 아니라 객체형식
export const cart = {
    // 상태초기화
    state: initState, 
    // 상태값을 변경하는 메서드
    mutations: {
        addCart(state, product){    // orderProductList에서 하나씩 넘어온 product 정보를 사용
            // 장바구니 수량
            state.totalQuantity = parseInt(state.totalQuantity) + product.productCount;    // 전체 state의 totalQuantity를 갱신(localStorage는 무조건 문자열 → 꺼내서 파싱 필요)
            localStorage.setItem("totalQuantity", state.totalQuantity); // localStorage에 totalQuantity 저장(새로고침 시 초기화되지 않도록)

            // 장바구니 안의 상품목록
            const existProduct = state.productsInCart.find(p => p.productId === product.productId); // 장바구니에 존재하는 id와 새로 담을 productId의 동일 여부 확인
            
            if (existProduct) {
                existProduct.productCount += product.productCount;  // 기존 productId에 값 증가
            }else {
                state.productsInCart.push(product); // productsInCart배열에 product 정보를 push(전역상태관리와는 무관)                
            }

            localStorage.setItem("productsInCart", JSON.stringify(state.productsInCart));   // localStorage에 productsInCart를 직렬화하여 저장
        },
        clearCart(state){
            state.productsInCart = [];
            state.totalQuantity = 0;
            localStorage.removeItem("productsInCart");
            localStorage.removeItem("totalQuantity");
        }
    },
    actions:{   // actions에서 mutations 호출
        addCart(context, product){
            context.commit("addCart", product);    // addCart함수 호출할 때마다 commit 하면서 addCart 함수와 productCount 매개변수를 넘김
        },
        clearCart(context){
            context.commit("clearCart");
        }
    },
    // 상태값을 가져가기 위한 메서드
    getters:{
        getTotalQuantity: state => state.totalQuantity,  // 전역변수state의 totalQuantity의 값을 넘김
        getProductsInCart: state => state.productsInCart
    }
}