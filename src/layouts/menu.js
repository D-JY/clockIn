import React from 'react'
import { Menu } from 'antd'
import styles from './menu.less'
import { withRouter } from 'react-router-dom'

const { SubMenu } = Menu
class Nav extends React.Component{
    state = {
        collapsed: false,
        navList: [
            { title: '用户管理', icon: 'icon-yonghuguanli', children: [
               { title: '用户管理', url: '/user' },
               { title: '微信用户', url: '/user/weixin_user' }
            ] },
            { title: '微信设置', icon: 'icon-shezhi', children: [
                { title: '自定义菜单', url: '/weixin_setting/weixin_menu' }
            ] }
        ]
    }
    jump = (url) => {
        const { history } = this.props
        history.push(url)
    }
    render() {
        return (
            <div className={styles.box}>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                    style={{height: '100%'}}
                >
                    { this.state.navList.map((val, key) => {
                        const Icon = () => <i className={`${styles.iconfont} iconfont ${val.icon}`}></i>
                        return (
                            val.children && val.children.length > 0 ? 
                                <SubMenu key={key} title={
                                    <>
                                        <Icon />
                                        {val.title}
                                    </>
                                }>
                                    {val.children.map((v, k) => {
                                        return (
                                            <Menu.Item key={`${key}-${k}`} onClick={() => this.jump(v.url)}>{v.title}</Menu.Item>
                                        )
                                    })}
                                </SubMenu> : 
                                <Menu.Item key={key} onClick={() => this.jump(val.url)}>
                                    <>
                                        <Icon />
                                        {val.title}
                                    </>
                                </Menu.Item>
                        )
                    }) }
                </Menu>
            </div>
        )
    }
}

export default withRouter(Nav)
