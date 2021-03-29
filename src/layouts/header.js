import React from 'react'
import styles from './header.less'
import { Menu, Dropdown } from 'antd'
import { connect } from 'react-redux'
import { message } from 'antd'
import { withRouter } from 'react-router-dom'

class Header extends React.Component{
    componentDidMount() {
        const { dispatch, history } = this.props
        dispatch({ type: 'login/getUserInfo' }).then(data => {
            if (data.success) {
                this.setState({
                    render: this.props.children
                })
            } else {
                message.warn(data.message)
                history.replace('/login')
            }
        })
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item><i className="iconfont icon-tuichu"></i>退出</Menu.Item>
            </Menu>
        )
        return (
            <header className="flexbox">
                <h1 className={`${styles.logo} flexbox align justify`}>
                    <img src={require('../assets/image/logo.png')} alt="logo"></img>
                    <p>智能提醒<br />管理后台</p>
                </h1>
                <div className={`${styles.headerBox} flex flexbox align between`}>
                    <i className={`iconfont icon-shousuo ${styles.iconfont}`}></i>
                    <Dropdown overlay={menu} placement="bottomLeft" arrow>
                        <div className={`${styles.nameBox}`}>
                            <i className={styles.portrait}></i>
                            <b className={styles.name}>{this.props.userInfo && this.props.userInfo.username}</b>
                        </div>
                    </Dropdown>
                </div>
            </header>
        )
    }
}

export default withRouter(connect((state, props) => {
    return {
        userInfo: state.login.userInfo
    }
})(Header))
