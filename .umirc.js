
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  // routes: [
  //   { path: '/', component: '../layouts/index.js', routes: [
  //     { path: '/', component: './user/index.js' },
  //     { path: '/user', component: './user/index.js' },
  //     { path: '/notice', component: './notice/index.js' }
  //   ] }
  // ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true
      },
      dynamicImport: true,
      title: '智能提醒管理后台',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
