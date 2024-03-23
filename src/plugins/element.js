import Vue from 'vue'
import { 
    Button, 
    Form, 
    FormItem, 
    Input, 
    Message, 
    Container, 
    Header, 
    Main, 
    Aside, 
    Menu, 
    MenuItem, 
    Submenu,
    RadioGroup,
    MenuItemGroup ,
    Alert,
    MessageBox,
    } from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message    // 挂载到Vue原型对象上
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(RadioGroup)
Vue.use(MenuItemGroup)
Vue.use(Alert)
Vue.prototype.$alert = MessageBox.confirm

