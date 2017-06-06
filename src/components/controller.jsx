import React from 'react';

export default class Controller extends React.Component{
    constructor(props) {
        super(props);
    }
    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.arrange.isCenter) {
            this.props.reverse();
        }else {
            this.props.center();
        }
    }
    render() {
        let controllerClassName = this.props.arrange.isCenter ? 'controller center' : 'controller';
        controllerClassName += this.props.arrange.isReverse ? ' reverse' : '';

        return (
           <span className={controllerClassName} onClick={this.handleClick.bind(this)}/>
        )
    }
}