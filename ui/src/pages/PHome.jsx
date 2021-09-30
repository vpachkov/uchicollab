import React, { Component, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { User } from "../components/User";
import { AbstractBlock, Block, BlockTitle, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock   } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";

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
                    <User user={this.user}/>
                </header>
                <main>
                    <Row>
                        <Col sm={12} sm={12}>
                            <Block color="white">
                            <Row>
                                <Col xs={12} md={6}>
                                    <AbstractBlock color="white">
                                        <BlockTitle color="black" text="bold">Аналитика</BlockTitle>
                                        <AbstractBetweenSpacingBlock>
                                            <SquareBlock color="white"></SquareBlock>
                                            <SquareBlock color="white"></SquareBlock>
                                            <SquareBlock color="white"></SquareBlock>
                                            <SquareBlock color="white"></SquareBlock>    
                                        </AbstractBetweenSpacingBlock>
                                    </AbstractBlock>
                                </Col>
                                <Col xs={12} md={6}>
                                    <AbstractBlock color="white">
                                        <BlockTitle color="black" text="bold">Текущая задача</BlockTitle>
                                        <ProgressBar content={this.renderProgress}/>
                                    </AbstractBlock>
                                </Col>
                            </Row>
                            </Block>
                        </Col>
                        <Col sm={12} md={4}>
                            <Block color="white">
                                <BlockTitle color="black" text="bold">Популярные вопросы</BlockTitle>
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
                                <BlockTitle color="black" text="bold">Последние отзывы</BlockTitle>
                                <CommentBlock color="#e3e3e3" textColor="black" raiting={3} user={this.user}>
                                    <CommentText color="black" text={this.review} max={60}/>
                                </CommentBlock>
                                <CommentBlock color="#e3e3e3" textColor="black" raiting={3} user={this.user}>
                                    <CommentText color="black" text={this.review} max={60}/>
                                </CommentBlock>
                            </Block>
                        </Col>
                    </Row>
                </main>
            </div>
        )
    }
}