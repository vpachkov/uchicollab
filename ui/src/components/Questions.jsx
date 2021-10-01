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

export class MiniQuestion extends Component {
    render() {
        return (
            <div onClick={this.props.onClick} className="miniQuestion" style={{ borderColor: this.props.borderColor === undefined ? "lightgray" : this.props.borderColor }}>
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
    render() {
        var question = this.props.question

        return (
            <MiniQuestion onClick={() => {
                history.push(`/question/${question.id}`)
            }}>
                <Row>
                    <Col>
                        <QuestionTitle>{question.title}</QuestionTitle>
                        <QuestionBody max={128} text={question.description} />
                        <AbstractBetweenSpacingBlock style={{ marginTop: "8px" }}>
                            <div style={{ width: "100%" }}><Span fontWeight="regular" color={this.state.maincolor}>{question.answers} <FontAwesomeIcon color="" icon={faComment} /></Span></div>
                            <AuthorBlock author={question.askedbyname} date={"TODO BRIEF DATE HERE"} profilePic={staticData + question.askedbyimagepath} authorid={question.askedbylogin} />
                        </AbstractBetweenSpacingBlock>
                    </Col>
                </Row>
            </MiniQuestion>
        )
    }

}

