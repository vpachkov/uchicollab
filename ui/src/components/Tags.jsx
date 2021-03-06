import { AbstractBlock, BlockLine, KeywordBlock } from "./Blocks";
import { CustomAddableSelect, CustomSelect, Button, ButtonHandler, BigButton, BigButtonWithIcon, InlineBigButtonWithIcon, InlineBigButton } from "../components/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import { Post, questionsService } from "../config";


export class Tags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTagsOption: null,
            tags: new Set(),
        }
    }

    componentDidMount() {
        this.loadTags()
        this.props.onChange([...this.state.tags])
    }

    render() {
        return (
            <div>
                <CustomSelect
                    id={this.props.id}
                    value=""
                    onChange={(selectedOption) => {
                        const tags = this.state.tags
                        tags.add(selectedOption.value)
                        this.setState({ tags: tags })
                        this.props.onChange([...this.state.tags])
                    }}
                    
                    options={this.state.loadedTags}
                    placeholder="Поиск тега"
                />
                <AbstractBlock color="white">
                    {
                        this.state.tags === undefined ? null :
                            [...this.state.tags].map(tag => {
                                return (
                                    <KeywordBlock>
                                        <span style={{ marginRight: "4px" }}>{tag}</span>
                                        <FontAwesomeIcon
                                            color="#aaaaaa"
                                            icon={faTimes}
                                            style={{ fontSize: ".8em" }}
                                            onClick={() => {
                                                const tags = this.state.tags
                                                tags.delete(tag)
                                                this.setState({ tags: tags })
                                                this.props.onChange([...this.state.tags])
                                            }}
                                        />
                                    </KeywordBlock>
                                )
                            })
                    }
                </AbstractBlock>
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


export class AddableTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTagsOption: null,
            tags: new Set(),
        }
    }

    componentDidMount() {
        this.loadTags()
        this.props.onChange([...this.state.tags])
    }

    render() {
        return (
            <div>
                <CustomAddableSelect
                    id={this.props.id}
                    value=""
                    onChange={(selectedOption) => {
                        const tags = this.state.tags
                        tags.add(selectedOption.value)
                        this.setState({ tags: tags })
                        this.props.onChange([...this.state.tags])
                    }}
                    
                    options={this.state.loadedTags}
                    placeholder="Поиск тега"
                />
                <AbstractBlock color="white">
                    {
                        this.state.tags === undefined ? null :
                            [...this.state.tags].map(tag => {
                                return (
                                    <KeywordBlock>
                                        <span style={{ marginRight: "4px" }}>{tag}</span>
                                        <FontAwesomeIcon
                                            color="#aaaaaa"
                                            icon={faTimes}
                                            style={{ fontSize: ".8em" }}
                                            onClick={() => {
                                                const tags = this.state.tags
                                                tags.delete(tag)
                                                this.setState({ tags: tags })
                                                this.props.onChange([...this.state.tags])
                                            }}
                                        />
                                    </KeywordBlock>
                                )
                            })
                    }
                </AbstractBlock>
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