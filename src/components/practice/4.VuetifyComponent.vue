<template>
    <v-container>
        <v-row> <!-- 전체 화면을 줄로 나누는 게 v-row -->
            <v-col cols="8">    <!-- cols의 전체 길이는 12. 그걸 8과 4로 나눈 코드-->
                helloworld1
            </v-col>
            <v-col cols="4">
                helloworld2
            </v-col>
        </v-row>
        <v-row>
            <v-card>
                <v-card-title>
                    회원가입
                </v-card-title>
                <v-card-text>
                    회원가입을 해주세요.
                </v-card-text>
            </v-card>
        </v-row>
        <v-row>
            <v-simple-table>
                <thead>
                    <tr>
                        <th>이름</th><th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>test</td><td>test@naver.com</td>
                    </tr>
                    <tr>
                        <td>test2</td><td>test2@naver.com</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-row>
    </v-container>

    <v-card>
        <v-card-title id="signup-title" style="font-size: 30px;">회원가입</v-card-title>
        <v-card-text>
            <v-form>
                <!-- v-text-field는 input 박스 -->
                <v-text-field
                    label="name"
                    type="text"
                />
                <v-text-field
                    label="email"
                    type="email"
                />
                <v-text-field
                    label="password"
                    type="password"
                />
                <v-btn color="secondary">제출하기</v-btn>
            </v-form>
        </v-card-text>
    </v-card>

    <!-- 모달창(팝업) 위한 v-dialog -->
     <v-btn @click="cancel()">취소버튼</v-btn>
     <!-- v-dialog는 내부적으로 true/false값을 가지고 외부 공개될지 말지 여부가 결정 -->
     <v-dialog v-model="trueOrFalse" max-width="400px">   <!-- 초기값은 false로 세팅-->
        <v-card>
            <v-card-title>
                정말 취소하시겠습니까?
            </v-card-title>
            <v-card-actions>
                <v-btn color="primary" @click="closeModal()">예</v-btn>
                <v-btn color="secondary" @click="closeModal()">아니오</v-btn>
            </v-card-actions>
        </v-card>
     </v-dialog>
</template>

<script>
export default{
    data(){
        return {
            trueOrFalse : false
        }
    },
    methods:{
        cancel(){
            this.trueOrFalse = true;
            
        },
        closeModal(){
            this.trueOrFalse = false;
        }

    }
}
</script>

<style>
#signup-title{
    color:rgb(155, 95, 233);
}
</style>