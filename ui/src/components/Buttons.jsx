import React, {Component} from 'react'
import '../css/Buttons.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export class BigButton extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="bigButton" style={{backgroundColor: this.props.color}}>
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
            }} className="bigButton" style={{color: this.props.color, backgroundColor: this.props.backgroundColor}}>
                <FontAwesomeIcon icon={this.props.icon}/> <span style={{marginLeft: "4px"}}>{this.props.title}</span>
            </div>
        )
    }
}

export class Button extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="button">
                {this.props.title}
            </div>
        )
    }
}

export class InlineBigButton extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="inlineBigButton">
                {this.props.title}
            </div>
        )
    }
}

export class InlineBigButtonWithIcon extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="inlineBigButton">
                <FontAwesomeIcon color="rgb(133, 133, 138)" icon={this.props.icon}/> <span style={{marginLeft: "4px"}}>{this.props.title}</span>
            </div>
        )
    }
}

export class InlineButton extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="inlineButton">
                {this.props.title}
            </div>
        )
    }
}

export class InlineButtonWithIcon extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="inlineButton">
                <FontAwesomeIcon color="rgb(133, 133, 138)" icon={this.props.icon}/> <span style={{marginLeft: "4px"}}>{this.props.title}</span>
            </div>
        )
    }
}

export class ButtonHandler extends Component {
    render() {
        return (
            <div className="buttonHandler">
                {this.props.children}
            </div>
        )
    }
}