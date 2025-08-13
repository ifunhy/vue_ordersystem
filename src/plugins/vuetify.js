import { createVuetify } from "vuetify";
import 'vuetify/styles'
// components는 vuetify에서 사용할 수 있는 UI컴포넌트를 의미
import * as components from 'vuetify/components';
// directives는 vuetify가 제공하는 추가 디자인 요소
import * as directives from 'vuetify/directives';
import {mdi} from 'vuetify/iconsets/mdi';

export default createVuetify({
    components,directives,
    icons: {defaultSet: 'mdi', sets: {mdi}}
})