import React, { Component, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import '../css/Buttons.css';
import '../css/Question.css';
import { ProfileLogo } from "./ProfileLogo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col } from "react-bootstrap";
import history from "../history";
import { AuthorBlock, HeaderSquareBlock, Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { faStar, faClock, faCoins, faUser, faTimes, faArrowAltCircleLeft, faFire, faComment } from '@fortawesome/free-solid-svg-icons'
import { SubjectColor, Subjects } from "../constants";
import { Post, profileService, questionsService, staticData } from "../config";
import { ButtonGray } from './Buttons';

export class MiniQuestion extends Component {
    render() {
        var style = this.props.style === undefined ? {} : this.props.style
        style["borderColor"] = this.props.borderColor === undefined ? "lightgray" : this.props.borderColor
        return (
            <div onClick={this.props.onClick} className="miniQuestion" style={style}>
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

export class BriefQuestion extends Component {
    formatTimestamp = (timestamp) => {
        var date = new Date(timestamp);
        var year = date.getFullYear()
        var date2 = ("0" + date.getDate()).substr(-2)
        var month = ("0" + date.getMonth()).substr(-2)
        var hours = ("0" + date.getHours()).substr(-2)
        var minutes = ("0" + date.getMinutes()).substr(-2)
        var seconds = ("0" + date.getSeconds()).substr(-2)
        var formattedTime = date2 + '/' + month + '/' + year + ' ' + hours + ':' + minutes
        return formattedTime
    }
    
    render() {
        var question = this.props.question
        console.log(question)

        return (
            <MiniQuestion onClick={() => {
                history.push(`/question/${question.id}`)
            }}>
                <Row>
                    <Col>
                        <QuestionTitle>{question.title}</QuestionTitle>
                        <QuestionBody max={128} text={question.description} />
                        <AbstractBetweenSpacingBlock style={{ marginTop: "8px" }}>
                            <div style={{ width: "100%", color: "rgb(69, 68, 79)" }}>
                                <Span fontWeight="regular">{question.answers} <FontAwesomeIcon color="" icon={faComment} style={{ marginRight: "12px" }} /></Span>
                                <Span fontWeight="regular">{question.cost} <FontAwesomeIcon color="" icon={faCoins} /></Span>
                            </div>
                            <AuthorBlock author={question.askedbyname} date={this.formatTimestamp(question.date)} profilePic={staticData + question.askedbyimagepath} authorid={question.askedbylogin} />
                        </AbstractBetweenSpacingBlock>
                    </Col>
                </Row>
            </MiniQuestion>
        )
    }
}

export class Notification extends Component {
    render() {
        var notification = this.props.notification

        return (
            <MiniQuestion>
                <Row>
                    <Col>
                        <QuestionTitle>{notification.title}</QuestionTitle>
                        <QuestionBody max={-1} text={notification.text} />
                        <div style={{float: "right", marginTop: "8px"}}><ButtonGray title="открыть" onClick={() => {history.push(notification.link)}} /></div>
                    </Col>
                </Row>
            </MiniQuestion>
        )
    }
}

