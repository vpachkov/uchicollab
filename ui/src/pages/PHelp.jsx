import React, { Component } from 'react'
import { User } from "../components/User";
import { Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { Button, BigButton, BigButtonWithIcon, InlineButton, ButtonHandler, InlineBigButtonWithIcon, InlineBigButton } from "../components/Buttons";
import { MiniQuestion, QuestionTitle, QuestionBody, QuestionLable } from "../components/Questions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";
import Wave from 'react-wavify'
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faClock, faCoins, faUser, faTimes, faBackward } from '@fortawesome/free-solid-svg-icons'
import { Post, profileService } from "../config";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Select from 'react-select';
import { ProfileLogo } from "../components/ProfileLogo";
import history from "../history";
import { Switch } from 'react-switch-input';

import 'bootstrap/dist/css/bootstrap.min.css';

class PHelp extends Component {
    options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    // TODO: MOVE OUT FROM HERE
    colors = {
        chocolate: "#ACB6E5",
        strawberry: "#AC00E5",
        vanilla: "#00B6E5",
    };

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            maincolor: "rgb(62, 134, 247)",
            session: cookies.get('session') || '1c8fee65-2a98-4545-9f22-263819a52b7e',
            selectedSubjectOption: null,
            tags: []
        };
    }

    handleTagAdd = (selectedOption) => {
        var tags = this.state.tags
        tags.push(selectedOption.value)
        console.log(tags)
        this.setState({ tags: tags });
    };

    handleTagRemove = (selectedOption) => {
        var tags = this.state.tags
        var index = tags.indexOf(selectedOption);
        if (index !== -1) {
            tags.splice(index, 1);
        }
        this.setState({ tags: tags });
    };

    componentDidMount() {
        // this.loadComments()
    }

    submit() {

    }

    renderFilters() {
        const selectedSubjectOption = this.state.selectedSubjectOption;
        return (
            <div>
                <BlockLine color="rgb(133, 133, 138)">Тэги</BlockLine>
                <Select
                    className="textSelector"
                    value={selectedSubjectOption}
                    onChange={this.handleTagAdd}
                    options={this.options}
                    placeholder="Поиск тега"
                />
                <AbstractBlock color="white">
                    {
                        this.state.tags === undefined ? null :
                            this.state.tags.map(tag => {
                                return (
                                    <KeywordBlock><span style={{ marginRight: "4px" }}>{tag}</span><FontAwesomeIcon color="#aaaaaa" icon={faTimes} style={{ fontSize: ".8em" }} onClick={() => { this.handleTagRemove(tag) }} /></KeywordBlock>
                                )
                            })
                    }
                </AbstractBlock>
                <BlockLine color="rgb(133, 133, 138)">Стоимость</BlockLine>
                <Row>
                    <Col><input className="inputBox" type="number" placeholder="от"></input></Col>
                    <Col><input className="inputBox" type="number" placeholder="до"></input></Col>
                </Row>
                <BlockLine color="rgb(133, 133, 138)">Выполнить до</BlockLine>
                <input className="inputBox" type="date" rows="4"></input>
                <Switch
                    name={"themeTwo"}
                    theme={"one"}
                    labelRight="Исключить отвеченные"
                    onChange={() => { }}
                />
                <div style={{ textAlign: "right", marginTop: "16px" }}>
                    <InlineButton title="сбросить" /><Button title="применить" />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <header>
                    <Container>
                        <AbstractBetweenSpacingBlock>
                            <div>
                                <div className="greetingName" style={{ color: this.state.maincolor }}>
                                    Помощь
                                </div>
                            </div>
                            <div>
                                <Span color={this.state.maincolor}>399 <FontAwesomeIcon icon={faCoins} /></Span>
                                <Span color={this.state.maincolor}>Russ Cox <FontAwesomeIcon icon={faUser} /></Span>
                            </div>
                        </AbstractBetweenSpacingBlock>
                    </Container>
                </header>
                {/* Rerender wave on width change to get the right amount of points */}
                <Wave className="wave" fill="url(#gradient)"
                    paused={false}
                    options={{
                        height: 8,
                        amplitude: 20,
                        speed: 0.10,
                        points: 10
                    }}
                >
                    <defs>
                        <linearGradient id="gradient" gradientTransform="rotate(90)">
                            <stop offset="0%" stopColor={this.state.maincolor} />
                            <stop offset="60%" stopColor="#f4f5f6" />
                        </linearGradient>
                    </defs>
                </Wave>
                <Container>
                    <main>
                        <ButtonHandler>
                            <InlineBigButtonWithIcon onClick={() => {
                                history.goBack()
                            }} icon={faBackward} title="Назад" />
                            <InlineBigButton onClick={() => {
                                history.push('/')
                            }} title="Главная" />
                        </ButtonHandler>
                        <Row>
                            <Col xs={12} md={4}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Фильтры</BlockTitle>
                                    {this.renderFilters()}
                                </Block>
                            </Col>
                            <Col xs={12} md={8}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Вопросы</BlockTitle>
                                    <MiniQuestion>
                                        <Row>
                                            <Col xs={4} lg={2}>
                                                <QuestionLable>Ответов 132</QuestionLable>
                                            </Col>
                                            <Col xs={8} lg={10}>
                                                <QuestionTitle>Рещение задачи по ТСАУ</QuestionTitle>
                                                <QuestionBody max={128} text="Russ Cox was raised by a pack of crazed hillbillies in the backwoods of Tennessee. With the bulk of his life spent in Pennsylvania, he met his wife; became a graphic designer; played in punk, alternative " />
                                                <div className="commentAuthorBlock">
                                                    <span style={{ marginRight: "8px" }}>Asked by Russ Cox</span><ProfileLogo height="16px" width="16px" src="https://pbs.twimg.com/profile_images/1137178645880037377/aeaRCnJV.png" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </MiniQuestion>
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
            this.setState({ comments: response.data.comments })
        })
    }
}

export default withCookies(PHelp);