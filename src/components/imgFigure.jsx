import React from 'react';

export default class ImgFigure extends React.Component{
    constructor(props) {
        super(props);
    }

    handleClick(e){

        if (this.props.arrange.isCenter) {
            this.props.reverse();
        }else {
            this.props.center();
        }
        e.preventDefault();
        e.stopPropagation();
    }
    render() {
        let styleObj = {};
        if (this.props.arrange.pos) {
            styleObj = {
                width:this.props.width + 'px',
                height:this.props.height + 'px',
                left:this.props.arrange.pos.left + 'px',
                top:this.props.arrange.pos.top + 'px',
            };
        }
        if (this.props.arrange.rotate) {
            const prefix = ['MozTransform', 'msTransform', 'WebkitTransform', 'transform'];
            prefix.forEach((item, index) => {
                styleObj[item] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            })
        }
        if (this.props.arrange.zIndex) {
            styleObj['zIndex'] = this.props.arrange.zIndex
        }

        let imgFigureClassName = this.props.arrange.isReverse ? 'img-figure reverse' : 'img-figure';

        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
                <img src={this.props.src} alt={this.props.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.title}</h2>
                    <div className="img-back"  onClick={this.handleClick.bind(this)}>{this.props.description}</div>
                </figcaption>
            </figure>
        )
    }
}