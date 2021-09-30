import React, { Component, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { User } from "../components/User";
import { Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { BigButton, BigButtonWithIcon } from "../components/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";
import Wave from 'react-wavify'
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faClock, faCoins, faUser, faPlus } from '@fortawesome/free-solid-svg-icons'

export class PHome extends Component {
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
    review="Russ Cox was raised by a pack of crazed hillbillies in the backwoods of Tennessee. With the bulk of his life spent in Pennsylvania, he met his wife; became a graphic designer; played in punk, alternative "
    user = {
        name: "Russ Cox",
        profilePic: "https://pbs.twimg.com/profile_images/1137178645880037377/aeaRCnJV.png",
    }

    render() {
        return (
            <div>
                <header>
                    <Container>
                        <AbstractBetweenSpacingBlock>
                            <div>
                                <User user={this.user}/>
                            </div>
                            <div>
                                <Span color="white">399 <FontAwesomeIcon color="white" icon={faCoins} /></Span>
                                <Span color="white"><FontAwesomeIcon color="white" icon={faUser} /></Span>
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
                            <Block color="white" id = "svg1">
                            <Row>
                                <Col xs={12} lg={6}>
                                    <AbstractBlock color="white">
                                        <BlockTitle color="rgb(69, 68, 79)" text="bold">Текущая задача</BlockTitle>
                                        <ProgressBar content={this.renderProgress}/>
                                        <BlockSpacing size="20px"/>
                                        <BlockLine color="rgb(133, 133, 138)"><FontAwesomeIcon color="rgb(133, 133, 138)" icon={faStar} /> Ты работаешь отлично! Продолжай в том же духе!</BlockLine>
                                        <BlockLine color="rgb(133, 133, 138)"><FontAwesomeIcon color="rgb(133, 133, 138)" icon={faClock} /> 6 дней</BlockLine>
                                        <BlockLine color="rgb(133, 133, 138)"><FontAwesomeIcon color="rgb(133, 133, 138)" icon={faCoins} /> 20</BlockLine>
                                    </AbstractBlock>
                                </Col>
                                <Col xs={12} lg={6}>
                                    <AbstractBlock color="white">
                                        <BlockTitle color="rgb(69, 68, 79)" text="bold">Аналитика</BlockTitle>
                                        <AbstractBetweenSpacingBlock>
                                            <SquareBlock color="white"><SquareBlockImage color="rgb(250, 225, 213)"><FontAwesomeIcon color="rgb(225, 113, 60)" icon={faStar} /></SquareBlockImage><SquareBlockText color="rgb(133, 133, 138)">125</SquareBlockText></SquareBlock>
                                            <SquareBlock color="white"><SquareBlockImage color="rgb(250, 225, 213)"><FontAwesomeIcon color="rgb(225, 113, 60)" icon={faStar} /></SquareBlockImage><SquareBlockText color="rgb(133, 133, 138)">125</SquareBlockText></SquareBlock>
                                            <SquareBlock color="white"><SquareBlockImage color="rgb(250, 225, 213)"><FontAwesomeIcon color="rgb(225, 113, 60)" icon={faStar} /></SquareBlockImage><SquareBlockText color="rgb(133, 133, 138)">125</SquareBlockText></SquareBlock>
                                            <SquareBlock color="white"><SquareBlockImage color="rgb(250, 225, 213)"><FontAwesomeIcon color="rgb(225, 113, 60)" icon={faStar} /></SquareBlockImage><SquareBlockText color="rgb(133, 133, 138)">125</SquareBlockText></SquareBlock>
                                        </AbstractBetweenSpacingBlock>
                                        <BlockTitle color="rgb(69, 68, 79)" text="bold">Популярные темы</BlockTitle>
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
                                <CommentBlock color="#e3e3e3" textColor="black" raiting={3} user={this.user}>
                                    <CommentText color="black" text={this.review} max={60}/>
                                </CommentBlock>
                                <CommentBlock color="#e3e3e3" textColor="black" raiting={3} user={this.user}>
                                    <CommentText color="black" text={this.review} max={60}/>
                                </CommentBlock>
                            </Block>
                        </Col>
                        <Col sm={12} md={4}>
                            <Block color="white">
                                <BlockTitle color="black" text="bold">Новые вопросы</BlockTitle>
                                <CommentBlock color="#e3e3e3" textColor="black" raiting={3} user={this.user}>
                                    <CommentText color="black" text={this.review} max={60}/>
                                </CommentBlock>
                                <CommentBlock color="#e3e3e3" textColor="black" raiting={3} user={this.user}>
                                    <CommentText color="black" text={this.review} max={60}/>
                                </CommentBlock>
                            </Block>
                        </Col>
                        <Col sm={12} md={4}>
                            <Block color="white">
                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Последние отзывы</BlockTitle>
                                <CommentBlock color="#eeeeee" textColor="rgb(69, 68, 79)" raiting={3} user={this.user}>
                                    <CommentText text={this.review} max={60}/>
                                </CommentBlock>
                                <CommentBlock color="#eeeeee" textColor="rgb(69, 68, 79)" raiting={3} user={this.user}>
                                    <CommentText text={this.review} max={60}/>
                                </CommentBlock>
                            </Block>
                        </Col>
                    </Row>
                </main>
                </Container>
            </div>
        )
    }
}