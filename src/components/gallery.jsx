import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ImgFigure from './imgFigure.jsx';
import Controller from './controller.jsx'

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgData: [],
            imgArrangeArr: []
        }
    }

    componentWillMount() {
        $.ajax({
            url: this.props.dataUrl,
            success: (imagesData) => {
                let imgArrangeArr = this.state.imgArrangeArr;
                imagesData.forEach((item, index) => {
                    if (!imgArrangeArr[index]) {
                        imgArrangeArr[index] = {
                            pos: {
                                left: 0,
                                top: 0
                            },
                            rotate: 0,
                            isReverse: false,
                            isCenter: false
                        };
                    }
                });
                this.setState({
                    imgData: imagesData,
                    imgArrangeArr: imgArrangeArr
                }, ()=> {
                    this.reArrange(2);
                });
            },
            error: (xhr, status, err) => {
                console.log(err.toString());
            }
        });

    }

    reArrange(centerIndex) {
        const imgSecW = this.refs.imgSec.clientWidth;
        const imgSecH = this.refs.imgSec.clientHeight;
        const imgW = this.props.imgWidth;
        const imgH = this.props.imgHeight;
        //左边区域x取值、y取值范围，右边区域x取值、y取值范围，上边区域y取值、x取值范围
        const centerTop = imgSecH / 2 - imgH / 2,
              centerLeft = imgSecW / 2 - imgW / 2,
              leftMin = -imgW / 2,
              leftMax = imgSecW / 2 - imgW / 2 * 3,
              rightMin = imgSecW / 2 + imgW / 2,
              rightMax = imgSecW - imgW / 2,
              topMin = -imgH / 2,
              topMax = imgSecH - imgH / 2,
              topYMin = -imgH / 2,
              topYMax = imgSecH / 2 - imgH / 2 * 3,
              topXMin = imgSecW / 2 - imgW,
              topXMax = imgSecW / 2;

        let imgArrangeArr = this.state.imgArrangeArr;
        //居中图片
        let imgCenterArr = imgArrangeArr.splice(centerIndex, 1);
        //居中图片状态
        imgCenterArr[0] = {
            pos: {
                top: centerTop,
                left: centerLeft,
            },
            rotate: 0,
            isCenter: true,
            isReverse: false,
            zIndex: 11
        };

        //上边区域图片
        let imgTopArr = [],
            topIndex = 0;
        const topImgNum = Math.floor(Math.random() * 2); //上边0或1个
        topIndex = Math.floor(Math.random() * (imgArrangeArr.length - topImgNum));
        imgTopArr = imgArrangeArr.splice(topIndex, topImgNum);
        //上边图片状态
        imgTopArr.forEach((item, index) => {
            imgTopArr[index] = {
                pos: {
                    top: this.getRandom(topYMin, topYMax),
                    left: this.getRandom(topXMin, topXMax)
                },
                rotate: this.getRotateRandom(30),
                isCenter: false,
                isReverse: false,
                zIndex: 10
            }
        });

        //左右两侧图片
        imgArrangeArr.forEach((item, index) => {
            imgArrangeArr[index] = {
                pos: {
                    top: this.getRandom(topMin, topMax),
                    left: index < imgArrangeArr.length / 2 ? this.getRandom(leftMin, leftMax) : this.getRandom(rightMin, rightMax)
                },
                rotate: this.getRotateRandom(30),
                isCenter: false,
                isReverse: false,
                zIndex: 10
            }
        });

        //把上边和中间的图片再加回原数组中
        if (imgTopArr && imgTopArr[0]) {
            imgArrangeArr.splice(topIndex, 0, imgTopArr[0]);
        }
        imgArrangeArr.splice(centerIndex, 0, imgCenterArr[0]);

        this.setState({
            imgArrangeArr: imgArrangeArr
        });
    }

    reverse(nIndex) {
        return () => {
            let imgArrangeArr = this.state.imgArrangeArr;
            imgArrangeArr[nIndex].isReverse = !imgArrangeArr[nIndex].isReverse;
            this.setState({
                imgArrangeArr: imgArrangeArr
            });
        }
    }
    center(nIndex) {
        return () => {
            this.reArrange(nIndex);
        }
    }

    render() {
        let imgDataArr = this.state.imgData;
        let imgAll = [];
        let controllerAll = [];

        imgDataArr.forEach((item, index) => {
            imgAll.push(<ImgFigure key={index} dataIndex={index}
                                   src={'src/images/' + item.fileName}
                                   title={item.title}
                                   description={item.description}
                                   width={this.props.imgWidth} height={this.props.imgHeight}
                                   arrange={this.state.imgArrangeArr[index]}
                                   reverse={this.reverse(index)}
                                   center={this.center(index)}
            />);

            controllerAll.push(<Controller key={index} dataIndex={index}
                                           arrange={this.state.imgArrangeArr[index]}
                                           reverse={this.reverse(index)}
                                           center={this.center(index)}
            />);
        });

        return (
            <section className="stage">
                <section className="img-sec" ref="imgSec">
                    {imgAll}
                </section>
                <nav className="controller-nav">
                    {controllerAll}
                </nav>
            </section>

        )
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    getRotateRandom(deg) {
        return (Math.random() < 0.5 ? '-' : '') + Math.floor(Math.random() * deg);
    }
}

ReactDOM.render(
    <Gallery dataUrl="./src/data/imagesData.json" imgWidth="280" imgHeight="440"/>,
    document.getElementById('container')
);