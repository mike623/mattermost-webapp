import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DynamicInput extends Component {
    static defaultProps = {
        datas: []
    }
    static propTypes = {
        children: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired
    }
    constructor(p) {
        super(p);
        this.state = {
            datas: p.datas.length === 0 ? [''] : p.datas
        };
    }
    handleButtonClick = (i) => {
        if (this.isLast(this.state.datas.length, i)) {
            // console.log('last click');
            this.setState((p) => ({
                datas: [].concat(p.datas, '')
            }), () => {

                // console.log(this.state.datas);
            });
        } else {
            // console.log('delete', i);
            const newDatas = [].concat(this.state.datas);
            newDatas.splice(i, 1);

            // console.log({newDatas});
            this.setState((p) => ({
                datas: newDatas
            }), () => {
                this.props.onChange && this.props.onChange(this.state.datas);
            });
        }
    }
    handleChange = (i, value) => {
        this.setState((p) => {
            const datas = [].concat(p.datas);
            datas[i] = value;
            return ({
                datas
            });
        }, () => {
            this.props.onChange && this.props.onChange(this.state.datas);
        });
    }
    isLast = (length, index) => {
        return length - 1 === index;
    }
    getType = (length, index) => {
        if (length === 1) {
            return 'plus';
        }

        // last
        const type = this.isLast(length, index) ? 'plus' : 'minus';
        return type;
    }

    render() {
        return (
            <div>
                {this.state.datas.map((data, i) => (
                    <div key={i}>
                        {this.props.children(i, this.handleButtonClick, this.handleChange, this.getType(this.state.datas.length, i))}
                    </div>
                ))}
            </div>
        );
    }
}

export default DynamicInput;