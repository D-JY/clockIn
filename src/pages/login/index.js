import React from 'react'
import styles from './index.less'
import { message } from 'antd'
import { connect } from 'dva'

class Login extends React.Component{
    state = {
        username: '',
        password: ''
    }
    render() {
        return (
            <div className={styles['login-page']}>
                <div className={styles['login-page-left']}>
                    <img className={styles['login-page-pic']} alt="" src={require('../../assets/image/login-pic.png')} />
                </div>
                <div className={styles['login-page-right']}>
                    <form className={styles['login-page-form']}>
                    <div className={styles['login-page-form-title']}>智能提醒</div>
                    <div style={{height:'16px'}}></div>
                    <dl>
                        <dt><label>&emsp;账号</label></dt>
                        <dd><input name="username" type="text" className={styles['login-page-form-input']} value={this.state.username} onChange={this.handleChange} /></dd>
                    </dl>
                    <dl>
                        <dt><label>&emsp;密码</label></dt>
                        <dd><input name="password" type="password" className={styles['login-page-form-input']} value={this.state.password} onChange={this.handleChange} /></dd>
                    </dl>
                    <div className={styles['login-page-form-btns']}>
                        <div className={`${styles['login-page-form-btn']} ${styles['dark']}`} onClick={this.handleSubmit}>登录</div>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = () => {
        if (!this.state.username) {
            message.warning('请输入用户名')
            return
        }
        if (!this.state.password) {
            message.warning('请输入密码')
            return
        }
        const { dispatch } = this.props
        dispatch({ type: 'login/getLoginInfo', payload: { name: this.state.username, password: this.state.password } }).then(data => {
            if (data.success) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', data.data)
                this.props.history.replace('/')
            }
        })
    }
}

export default connect()(Login)
