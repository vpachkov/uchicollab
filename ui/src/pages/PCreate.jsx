import React, { Component } from 'react'
import { User } from "../components/User";
import { AuthorBlock, Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { Button, ButtonHandler, BigButton, BigButtonWithIcon, InlineBigButtonWithIcon, InlineBigButton } from "../components/Buttons";
import { MiniQuestion, QuestionTitle, QuestionBody, QuestionLable } from "../components/Questions";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";
import Wave from 'react-wavify'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowAltCircleLeft, faCoins, faTimes, faUser} from '@fortawesome/free-solid-svg-icons'
import {Post, profileService, questionsService} from "../config";
import {Cookies, withCookies} from 'react-cookie';
import {instanceOf} from 'prop-types';
import Select from 'react-select';
import {ProfileLogo} from "../components/ProfileLogo";
import history from "../history";

import 'bootstrap/dist/css/bootstrap.min.css';

class PCreate extends Component {
    options = [
        {value: 'algebra', label: 'Алгебра'},
        {value: 'geometry', label: 'Геометрия'},
        {value: 'russian', label: 'Русский язык'},
        {value: 'english', label: 'Английский язык'},
    ];

    // TODO: MOVE OUT FROM HERE
    colors = {
        algebra: "#ACB6E5",
        geometry: "#AC00E5",
        russian: "#00B6E5",
        english: "#00B655",
    };

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        const {cookies} = props;
        this.state = {
            maincolor: "rgb(62, 134, 247)",
            session: cookies.get('session') || '1c8fee65-2a98-4545-9f22-263819a52b7e',
            selectedSubjectOption: null,
            selectedTagsOption: null,
            tags: new Set(),
        };
    }

    handleSubjectChange = (selectedOption) => {
        this.setState({
            selectedSubjectOption: selectedOption,
            maincolor: this.colors[selectedOption.value]
        });
    };

    handleTagAdd = (selectedOption) => {
        const tags = this.state.tags
        tags.add(selectedOption.value)
        this.setState({tags: tags});
    };

    handleTagRemove = (selectedOption) => {
        const tags = this.state.tags
        tags.delete(selectedOption)
        this.setState({tags: tags})
    };

    componentDidMount() {
        this.loadTags()
    }

    submit() {

    }

    renderTextInput() {
        const selectedSubjectOption = this.state.selectedSubjectOption;
        const selectedTagsOption = this.state.selectedTagsOption;

        return (
            <div>
                <Select
                    className="textSelector"
                    value={selectedSubjectOption}
                    onChange={this.handleSubjectChange}
                    options={this.options}
                    placeholder="Выберите предмет"
                />
                <Select
                    className="textSelector"
                    value={selectedTagsOption}
                    onChange={this.handleTagAdd}
                    options={this.state.loadedTags}
                    placeholder="Поиск тега"
                />
                <AbstractBlock color="white">
                    {
                        this.state.tags === undefined ? null :
                            [...this.state.tags].map(tag => {
                                return (
                                    <KeywordBlock><span style={{marginRight: "4px"}}>{tag}</span><FontAwesomeIcon
                                        color="#aaaaaa" icon={faTimes} style={{fontSize: ".8em"}} onClick={() => {
                                        this.handleTagRemove(tag)
                                    }}/></KeywordBlock>
                                )
                            })
                    }
                </AbstractBlock>
                <BlockLine color="rgb(133, 133, 138)">Вопрос</BlockLine>
                <textarea className="textBox" rows="4" placeholder="Название"></textarea>
                <BlockLine color="rgb(133, 133, 138)">Стоимость</BlockLine>
                <input className="inputBox" type="number" rows="4" placeholder="Стоимость"></input>
                <BlockLine color="rgb(133, 133, 138)">Выполнить до</BlockLine>
                <input className="inputBox" type="date" rows="4"></input>
                <div style={{textAlign: "right", marginTop: "16px"}}>
                    <Button title="Проверьте Ваш вопрос"/>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.loadedTags === undefined) {
            return null
        }
        return (
            <div>
                <header>
                    <Container>
                        <AbstractBetweenSpacingBlock>
                            <div>
                                <div className="greetingName" style={{ color: this.state.maincolor }}>
                                    С чем тебе помочь?
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
                            <stop offset="0%" stopColor="rgb(161, 178, 190)" />
                            <stop offset="60%" stopColor="#f4f5f6" />
                        </linearGradient>
                    </defs>
                </Wave>
                <Container>
                    <main>
                        <ButtonHandler>
                            <InlineBigButtonWithIcon onClick={() => {
                                history.goBack()
                            }} icon={faArrowAltCircleLeft} title="Назад" />
                            <InlineBigButton onClick={() => {
                                history.push('/')
                            }} title="Главная" />
                        </ButtonHandler>
                        <Row>
                            <Col xs={12} md={4}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Сформулировать вопрос</BlockTitle>
                                    {this.renderTextInput()}
                                </Block>
                            </Col>
                            <Col xs={12} md={8}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Похожие вопросы</BlockTitle>
                                    <MiniQuestion>
                                        <Row>
                                            <Col xs={4} lg={2}>
                                                <QuestionLable>Ответов 132</QuestionLable>
                                            </Col>
                                            <Col xs={8} lg={10}>
                                                <QuestionTitle>Рещение задачи по ТСАУ</QuestionTitle>
                                                <QuestionBody max={128} text="Russ Cox was raised by a pack of crazed hillbillies in the backwoods of Tennessee. With the bulk of his life spent in Pennsylvania, he met his wife; became a graphic designer; played in punk, alternative " />
                                                <AuthorBlock author={"Русс"} date={"28"} profilePic={""} authorid={0}/>
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

    loadTags() {
        Post(
            questionsService + "tags", {}, (response) => {
                this.setState({
                    loadedTags: response.data.tags
                })
            }
        )
    }
}

export default withCookies(PCreate);