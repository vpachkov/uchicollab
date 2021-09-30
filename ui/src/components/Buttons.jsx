import React, {Component} from 'react'
import '../css/Buttons.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export class BigButton extends Component {
    render() {
        return (
            <div className="bigButton" style={{backgroundColor: this.props.color}}>
                {this.props.title}
            </div>
        )
    }
}

export class BigButtonWithIcon extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="bigButton" style={{backgroundColor: this.props.color}}>
                <FontAwesomeIcon color="rgb(133, 133, 138)" icon={this.props.icon}/> {this.props.title}
            </div>
        )
    }
}

export class Button extends Component {
    render() {
        return (
            <div className="button">
                {this.props.title}
            </div>
        )
    }
}
