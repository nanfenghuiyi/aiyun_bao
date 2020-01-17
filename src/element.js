// 导入需要的组件(按需引入elementUI)
import { Drawer, RadioGroup, Loading, CollapseItem, Radio, Collapse, backtop, Icon, Image, Rate } from 'element-ui';

const element = {
  install: function (Vue) {
    Vue.use(Drawer)
    .use(RadioGroup)
    .use(Loading)
    .use(CollapseItem)
    .use(Radio)
    .use(Collapse)
    .use(backtop)
    .use(Icon)
    .use(Image)
    .use(Rate)
  }
}
export default element