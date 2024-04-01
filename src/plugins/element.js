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
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Tag,
    Switch,
    Tooltip,
    PageHeader,
    Pagination,
    Dialog,
    Tree,
    Select,
    Option,
    } from 'element-ui'
Vue.use(Button)
Vue.use(Option)
Vue.use(Select)
Vue.use(Tree)
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
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(PageHeader)
Vue.use(Pagination)
Vue.use(Dialog)

