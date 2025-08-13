import ProductListComponent from "@/components/ProductListComponent.vue";
import ProductCreate from "@/views/ProductCreate.vue";

export const productRouter = [
    // 공통화 작업으로 분기 처리
    // 상품목록(USER)
    {
        path: "/product/list",
        name: "ProductList",
        component: ProductListComponent,
        props: {pageTitle: "상품목록", isAdmin: false}
    },

    // 상품목록(ADMIN)
    {
        path: "/product/manage",
        name: "ProductListManage",
        component: ProductListComponent,
        props: {pageTitle: "상품관리", isAdmin: true}
    },

    // 상품등록
    {
        path: "/product/create",
        name: "ProductCreate",
        component: ProductCreate
    },
]