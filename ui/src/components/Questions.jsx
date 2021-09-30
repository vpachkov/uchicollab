import React, { Component, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import '../css/Buttons.css';
import '../css/Question.css';
import { ProfileLogo } from "./ProfileLogo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class MiniQuestion extends Component {
    render() {
        return (
            <div className="miniQuestion">
                {this.props.children}
            </div>
        )
    }
}

export class QuestionTitle extends Component {
    render() {
        return (
            <div className="questionTitle">
                {this.props.children}
            </div>
        )
    }
}

export class QuestionLable extends Component {
    render() {
        return (
            <div className="questionLable">
                {this.props.children}
            </div>
        )
    }
}

export class QuestionBody extends Component {
    render() {
        var rt = this.props.text
        if (this.props.max != -1 && rt.length > this.props.max) {
            rt = rt.substring(0, this.props.max - 3) + "..."
        }
        return (
            <div className="questionBody">
                {rt}
            </div>
        )
    }
}

