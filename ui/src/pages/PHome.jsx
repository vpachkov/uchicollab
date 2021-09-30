import React, { Component } from 'react'
import { User } from "../components/User";
import React, {Component} from 'react'
import {User} from "../components/User";
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
import {ProgressBar} from "../components/ProgressBar";
import {SubjectColor} from "../constants";
import {BigButtonWithIcon, InlineBigButton, ButtonHandler} from "../components/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";
import Wave from 'react-wavify'
import {
    AbstractBetweenSpacingBlock,
    AbstractBlock,
    Block,
    BlockTitle,
    CommentBlock,
    CommentText,
    SquareBlock
} from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { Col, Row } from "react-bootstrap";
import { Post, profileService } from "../config";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faCoins, faPlus, faStar, faUser} from '@fortawesome/free-solid-svg-icons'
import {Post, profileService, staticData} from "../config";
import {Cookies, withCookies} from 'react-cookie';
import {instanceOf} from 'prop-types';
import history from "../history";


class PHome extends Component {
    renderProgress = [
        {
            "name": "Математика",
            "percentage": 66,
            "color": SubjectColor.algebra,
        },
        {
            "name": "Русский Язык",
            "percentage": 32,
            "color": SubjectColor.russian,
        },
        {
            "name": "Информатика",
            "percentage": 32,
            "color": SubjectColor.informatics,
        }
    ]
    review = "Russ Cox was raised by a pack of crazed hillbillies in the backwoods of Tennessee. With the bulk of his life spent in Pennsylvania, he met his wife; became a graphic designer; played in punk, alternative "

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: undefined,
                profilePic: undefined,
            }
        }
    }

    componentDidMount() {
        this.getInfo()
        this.loadComments()
    }

    render() {
        if (this.state.user === undefined) {
            return null
        }
        return (
            <div>
                <header className="coloredBackground bigHeader">
                    <Container>
                        <AbstractBetweenSpacingBlock>
                            <div>
                                <User user={this.state.user}/>
                            </div>
                            <div>
                                <HeaderSquareBlock color="white"><SquareBlockImage
                                                        ><FontAwesomeIcon
                                                        color="rgb(223, 223, 228)"
                                                        icon={faCoins}/></SquareBlockImage><SquareBlockText
                                                        color="rgb(69, 68, 79)">12</SquareBlockText></HeaderSquareBlock>
                                <HeaderSquareBlock color="white"><SquareBlockImage
                                                        ><FontAwesomeIcon
                                                        color="rgb(223, 223, 228)"
                                                        icon={faUser}/></SquareBlockImage></HeaderSquareBlock>
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
                <Container>
                    <main>
                        <ButtonHandler>
                            <BigButtonWithIcon onClick={() => {
                                history.push('/create')
                            }} color="#551a8b" backgroundColor="#ddd6f3" icon={faPlus} title="новый вопрос"/>
                            <InlineBigButton onClick={() => {
                                history.push('/help')
                            }} title="Помощь"/>
                        </ButtonHandler>
                        <Row>
                            <Col sm={12} sm={12}>
                                <Block color="white">
                                    <Row>
                                        <Col xs={12} lg={6}>
                                            <AbstractBlock color="white">
                                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Текущая
                                                    задача</BlockTitle>
                                                <ProgressBar content={this.renderProgress}/>
                                                <BlockSpacing size="20px"/>
                                                <BlockLine color="rgb(133, 133, 138)"><FontAwesomeIcon
                                                    color="rgb(133, 133, 138)" icon={faStar}/> Ты работаешь отлично!
                                                    Продолжай в том же духе!</BlockLine>
                                                <BlockLine color="rgb(133, 133, 138)"><FontAwesomeIcon
                                                    color="rgb(133, 133, 138)" icon={faClock}/> 6 дней</BlockLine>
                                                <BlockLine color="rgb(133, 133, 138)"><FontAwesomeIcon
                                                    color="rgb(133, 133, 138)" icon={faCoins}/> 20</BlockLine>
                                            </AbstractBlock>
                                        </Col>
                                        <Col xs={12} lg={6}>
                                            <AbstractBlock color="white">
                                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Аналитика</BlockTitle>
                                                <AbstractBetweenSpacingBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(250, 225, 213)"><FontAwesomeIcon
                                                        color="rgb(225, 113, 60)"
                                                        icon={faStar}/></SquareBlockImage><SquareBlockText
                                                        color="rgb(133, 133, 138)">125</SquareBlockText></SquareBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(250, 225, 213)"><FontAwesomeIcon
                                                        color="rgb(225, 113, 60)"
                                                        icon={faStar}/></SquareBlockImage><SquareBlockText
                                                        color="rgb(133, 133, 138)">125</SquareBlockText></SquareBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(250, 225, 213)"><FontAwesomeIcon
                                                        color="rgb(225, 113, 60)"
                                                        icon={faStar}/></SquareBlockImage><SquareBlockText
                                                        color="rgb(133, 133, 138)">125</SquareBlockText></SquareBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(250, 225, 213)"><FontAwesomeIcon
                                                        color="rgb(225, 113, 60)"
                                                        icon={faStar}/></SquareBlockImage><SquareBlockText
                                                        color="rgb(133, 133, 138)">125</SquareBlockText></SquareBlock>
                                                </AbstractBetweenSpacingBlock>
                                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Популярные
                                                    темы</BlockTitle>
                                                <AbstractBlock color="white">
                                                    <KeywordBlock>Математика</KeywordBlock>
                                                    <KeywordBlock>Русский язык</KeywordBlock>
                                                    <KeywordBlock>Информатика</KeywordBlock>
                                                </AbstractBlock>
                                            </AbstractBlock>
                                        </Col>
                                    </Row>
                                </Block>
                            </Col>
                            <Col sm={12} md={4}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Популярные вопросы</BlockTitle>
                                    <CommentBlock color="#e3e3e3" textColor="black" raiting={3} user={this.state.user}>
                                        <CommentText color="black" text={this.review} max={60}/>
                                    </CommentBlock>
                                    <CommentBlock color="#e3e3e3" textColor="black" raiting={3} user={this.state.user}>
                                        <CommentText color="black" text={this.review} max={60}/>
                                    </CommentBlock>
                                </Block>
                            </Col>
                            <Col sm={12} md={4}>
                                <Block color="white">
                                    <BlockTitle color="black" text="bold">Новые вопросы</BlockTitle>
                                    <CommentBlock color="#e3e3e3" textColor="black" raiting={3} user={this.state.user}>
                                        <CommentText color="black" text={this.review} max={60}/>
                                    </CommentBlock>
                                    <CommentBlock color="#e3e3e3" textColor="black" raiting={3} user={this.state.user}>
                                        <CommentText color="black" text={this.review} max={60}/>
                                    </CommentBlock>
                                </Block>
                            </Col>
                            <Col sm={12} md={4}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Последние отзывы</BlockTitle>
                                    {
                                        this.state.comments === undefined ? null :
                                            this.state.comments.map(comment => {
                                                return (
                                                    <CommentBlock color="#eeeeee" textColor="rgb(69, 68, 79)"
                                                                  raiting={comment.score}
                                                                  user={{
                                                                      name: comment.name,
                                                                      profilePic: staticData + comment.imagepath
                                                                  }}>
                                                        <CommentText text={comment.text} max={60}/>
                                                    </CommentBlock>
                                                )
                                            })
                                    }
                                </Block>
                            </Col>
                        </Row>
                    </main>
                </Container>
            </div>
        )
    }

    loadComments() {
        Post(
            profileService + "comments", {
                number: 5
            }, (response) => {
                this.setState({comments: response.data.comments})
            })
    }

    getInfo() {
        Post(profileService + "userinfo", {}, (response) => {
            this.setState({
                user: {
                    name: response.data.name,
                    profilePic: staticData + response.data.imagepath,
                }
            })
        })
    }
}

export default withCookies(PHome);