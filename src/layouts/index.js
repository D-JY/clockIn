import React from 'react'
import Header from './header'
import Nav from './menu'
import styles from './index.less'
import { connect } from 'react-redux'

@connect(({ login }) => ({
    userInfo: login.userInfo
}))

class Layouts extends React.Component{
    state = {
        whiteList: ['/login', '/404']
    }
    render() {
        const { location: { pathname } } = this.props
        if (this.state.whiteList.includes(pathname)) {
            return this.props.children
        } else {
            return (
                <div className={styles.box}>
                    <Header></Header>
                    <div className={`${styles.main} flexbox`}>
                        <Nav></Nav>
                        <div className="flex">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            )   
        }
    }
}

export default Layouts
