import React from 'react'
import CheckLogin from './checkLogin'
import Header from './header'

class Layouts extends React.Component{
    state = {
        whiteList: ['/login']
    }
    render() {
        const { location: { pathname } } = this.props
        if (this.state.whiteList.includes(pathname)) {
            return this.props.children
        } else {
            return (
                <CheckLogin>
                    <Header></Header>
                    {this.props.children}
                </CheckLogin>
            )
        }
    }
}

export default Layouts
