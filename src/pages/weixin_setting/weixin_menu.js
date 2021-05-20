import React from 'react'
import styles from './weixin_menu.less'
import { Menu, Dropdown, Button } from 'antd'
import DataForm from '../../components/dataForm'


class WeixinMenu extends React.Component{
    state = {
        config: [
            { type: 'input', label: '标签名称', key: 'name', rules: [{ required: true, message: '请输入标签名称' }] },
            { type: 'input', label: '跳转地址', key: 'url', rules: [{ required: true, message: '请输入跳转地址' }] }
        ],
    }
    formRef = {}
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="https://www.antgroup.com">1st menu item</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="https://www.aliyun.com">2nd menu item</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        )
        return (
            <div className={`${styles.bg} flexbox`}>
                <div className={styles.leftBox}>
                    <img src={require('../../assets/image/phone.png')} alt="phone"></img>
                    <div className={styles.menuBg}></div>
                    <ul className={styles.menuBox}>
                        <li>
                            <Dropdown overlay={menu} trigger={['click']} arrow>
                                <h6>
                                    <i className={`${styles.icon} iconfont icon-liebiao`}></i>
                                    发送通知
                                </h6>
                            </Dropdown>
                        </li>
                        <li>
                            <i className={`${styles.addIcon} iconfont icon-icon-test`}></i>
                        </li>
                        <li>
                            <i className={`${styles.addIcon} iconfont icon-icon-test`}></i>
                        </li>
                    </ul>
                </div>
                <div className={`${styles.rightBox} flex`}>
                    <DataForm
                        onRef={(ref) => this.formRef = ref}
                        config={this.state.config}
                        labelWidth={5}
                        wrapperWidth={17}
                        layout="horizontal"
                        width="400px">
                    </DataForm>
                    <Button type="primary" className={styles.btn}>提交</Button>
                </div>
            </div>
        )
    }
}

export default WeixinMenu
