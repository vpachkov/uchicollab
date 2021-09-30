<<<<<<< HEAD
import React, { Component } from 'react'
import { User } from "../components/User";
<<<<<<< HEAD
import { Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { BigButton, BigButtonWithIcon } from "../components/Buttons";
=======
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
    SquareBlockText
} from "../components/Blocks";
import {ProgressBar} from "../components/ProgressBar";
import {BigButtonWithIcon} from "../components/Buttons";
>>>>>>> b9c203f... profile and pictures
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";
import Wave from 'react-wavify'
<<<<<<< HEAD
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faClock, faCoins, faUser, faPlus } from '@fortawesome/free-solid-svg-icons'
=======
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
>>>>>>> b89b673... sessions in ui
=======
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faCoins, faPlus, faStar, faUser} from '@fortawesome/free-solid-svg-icons'
import {Post, profileService, staticData} from "../config";
import {Cookies, withCookies} from 'react-cookie';
import {instanceOf} from 'prop-types';
>>>>>>> b9c203f... profile and pictures

class PHome extends Component {
    renderProgress = [
        {
            "name": "Математика",
            "percentage": 66,
            "color": "#f400f4",
        },
        {
            "name": "Русский Язык",
            "percentage": 32,
            "color": "#00f4f4",
        },
        {
            "name": "Информатика",
            "percentage": 32,
            "color": "#f4f400",
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
                <header className="coloredBackground">
                    <Container>
                        <AbstractBetweenSpacingBlock>
                            <div>
                                <User user={this.state.user}/>
                            </div>
                            <div>
                                <Span color="white">399 <FontAwesomeIcon color="white" icon={faCoins}/></Span>
                                <Span color="white"><FontAwesomeIcon color="white" icon={faUser}/></Span>
                            </div>
                        </AbstractBetweenSpacingBlock>
                    </Container>
                </header>
                {/* Rerender wave on width change to get the right amount of points */}
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
                        <BigButtonWithIcon icon={faPlus} title="Create"/>
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
                                                                  user={{name: comment.name, profilePic:staticData+comment.imagepath}}>
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
                    profilePic: staticData+response.data.imagepath,
                }
            })
        })
    }
}

export default withCookies(PHome);