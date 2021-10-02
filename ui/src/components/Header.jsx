import React, { Component, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { User } from "../components/User";
import {
    AbstractBetweenSpacingBlock,
    AbstractBlock,
    Block,
    BlockLine,
    BlockSpacing,
    BlockTitle,
    CommentBlock,
    CommentText,
    KeywordBlock,
    Span,
    SquareBlock,
    SquareBlockImage,
    SquareBlockText,
    HeaderSquareBlock
} from "../components/Blocks";
import { Col, Container, Row } from "react-bootstrap";
import { BriefQuestion } from "../components/Questions";
import { ProgressBar } from "../components/ProgressBar";
import { SubjectColor } from "../constants";
import { BigButtonWithIcon, InlineBigButton, ButtonHandler } from "../components/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css';
import Wave from 'react-wavify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faClock, faCoins, faFire, faHeart, faPlus, faQuestion, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import { Post, profileService, staticData } from "../config";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import history from "../history";
import '../css/Header.css';

export class Header extends Component {
    random = (min, max) => {
        max+=1
        return Math.floor(Math.random() * (max - min) + min);
    }

    constructor(props) {
        super(props)
        this.state = {
            classColor: "coloredBackground"+this.random(0, 3),
        }
    }

    render() {
        return (
            <div>
                <header className={this.state.classColor+" bigHeader"}>
                    <Container>
                        <AbstractBetweenSpacingBlock>
                            <div>
                                <User prefix={this.props.prefix} user={this.props.user} />
                            </div>
                            <div>
                                <HeaderSquareBlock color="white"><SquareBlockImage
                                ><FontAwesomeIcon
                                        color="rgb(223, 223, 228)"
                                        icon={faCoins} /></SquareBlockImage><SquareBlockText
                                            color="rgb(69, 68, 79)">{this.props.user.coins}</SquareBlockText></HeaderSquareBlock>
                                <HeaderSquareBlock color="white"><SquareBlockImage onClick={() => { history.push(`/user/${this.props.user.login}`) }}
                                ><FontAwesomeIcon
                                        color="rgb(223, 223, 228)"
                                        icon={faUser} /></SquareBlockImage></HeaderSquareBlock>
                            </div>
                        </AbstractBetweenSpacingBlock>
                    </Container>
                    {/* Rerender wave on width change to get the right amount of points */}
                </header>
                <Wave className="wave" fill='#f4f5f6'
                    paused={false}
                    options={{
                        height: 8,
                        amplitude: 20,
                        speed: 0.10,
                        points: 10
                    }}
                />
            </div>
        )
    }
}

export class Navigation extends Component {
    render() {
        return (
            <ButtonHandler>
                {this.props.children}
                <InlineBigButton onClick={() => {
                    history.push('/')
                }} title="Главная" />
                <InlineBigButton onClick={() => {
                    history.push('/help')
                }} title="Все Вопросы" />
            </ButtonHandler>
        )
    }
}