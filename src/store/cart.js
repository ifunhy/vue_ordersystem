function initState(){   // 새로고침 할 때마다 호출
    return {
        totalQuantity: localStorage.getItem("totalQuantity") || 0,   // 상태값 설정. localStorage에 totalQuantity의 값이 있으면 가져오고, 없으면 0
    }
}

// 배열형식이 아니라 객체형식
export const cart = {
    // 상태초기화
    state: initState, 
    // 상태값을 변경하는 메서드
    mutations: {
        addCart(state, productCount){
            state.totalQuantity = parseInt(state.totalQuantity) + productCount;    // 전체 state의 totalQuantity를 갱신(localStorage는 무조건 문자열 → 꺼내서 파싱 필요)
            localStorage.setItem("totalQuantity", state.totalQuantity); // localStorage에 저장(새로고침 시 초기화되지 않도록)
        }
    },
    actions:{
        addCart(context, productCount){
            context.commit("addCart", productCount);    // addCart함수 호출할 때마다 commit 하면서 addCart 함수와 productCount 매개변수를 넘김
        }
    },
    // 상태값을 가져가기 위한 메서드
    getters:{
        getTotalQuantity: state => state.totalQuantity  // 전역변수state의 totalQuantity의 값을 넘김
    }
}