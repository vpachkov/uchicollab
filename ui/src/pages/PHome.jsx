import React, { Component, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { User } from "../components/User";
import { Block, BlockTitle, CommentBlock, CommentText } from "../components/Block";
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
                        <Col sm={12} md={9}>
                            <Block color="#fc6379">
                                <BlockTitle color="white" text="bold">Текущая задача</BlockTitle>
                                <ProgressBar content={this.renderProgress}/>
                            </Block>
                        </Col>
                        <Col sm={12} md={3}>
                            <Block color="#599beb">
                                <BlockTitle color="white" text="bold">Последние отзывы</BlockTitle>
                                <CommentBlock color="#0000CD" textColor="white" raiting={3} user={this.user}>
                                    <CommentText color="white" text={this.review} max={60}/>
                                </CommentBlock>
                                <CommentBlock color="#0000CD" textColor="white" raiting={3} user={this.user}>
                                    <CommentText color="white" text={this.review} max={60}/>
                                </CommentBlock>
                            </Block>
                            <Block color="#599beb">
                                <BlockTitle color="white" text="bold">Новые отзывы</BlockTitle>
                            </Block>
                        </Col>
                    </Row>
                </main>
            </div>
        )
    }
}