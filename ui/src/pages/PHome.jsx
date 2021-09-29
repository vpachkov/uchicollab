import React, { Component } from 'react'
import { User } from "../components/User";
<<<<<<< HEAD
import { Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { BigButton, BigButtonWithIcon } from "../components/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";
import Wave from 'react-wavify'
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
    user = {
        name: "Russ Cox",
        profilePic: "https://pbs.twimg.com/profile_images/1137178645880037377/aeaRCnJV.png",
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        const {cookies} = props;
        this.state = {
            session: cookies.get('session') || '1c8fee65-2a98-4545-9f22-263819a52b7e'
        };
    }

    componentDidMount() {
        this.loadComments()
        // Post(1,1,1,1)
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
                                <BlockTitle color="black" text="bold">Последние отзывы</BlockTitle>
                                {
                                    this.state.comments === undefined ? null :
                                        this.state.comments.map(comment => {
                                            return (
                                                <CommentBlock color="#e3e3e3" textColor="black" raiting={comment.score}
                                                              user={this.user}>
                                                    <CommentText color="black" text={comment.text} max={60}/>
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
}

export default withCookies(PHome);