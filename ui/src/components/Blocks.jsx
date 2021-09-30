import React, { Component, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import '../css/Main.css';
import { ProfileLogo } from "./ProfileLogo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export class Block extends Component {
    render() {
        return (
            <div className="block" style={{backgroundColor: this.props.color}}>
                {this.props.children}
            </div>
        )
    }
}

export class AbstractBlock extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}


export class BlockTitle extends Component {
    render() {
        return (
            <div className="blockTitle" style={{color: this.props.color, fontWeight: this.props.text}}>
                {this.props.children}
            </div>
        )
    }
}

export class BlockText extends Component {
    render() {
        return (
            <div className="blockText" style={{color: this.props.color, fontWeight: this.props.text}}>
                {this.props.children}
            </div>
        )
    }
}

export class BlockLine extends Component {
    render() {
        return (
            <div className="blockLine" style={{color: this.props.color, fontWeight: this.props.text}}>
                {this.props.children}
            </div>
        )
    }
}

export class Span extends Component {
    render() {
        return (
            <div className="spanInBlock" style={{color: this.props.color, fontWeight: this.props.fontWeight}}>
                {this.props.children}
            </div>
        )
    }
}

export class BlockSpacing extends Component {
    render() {
        return (
            <div style={{width: "100%", height: this.props.size}}></div>
        )
    }
}

export class CommentBlock extends Component {
    render() {
        var stars = []
        for (var i = 0; i < 5; i++) {
            if (i < this.props.raiting) {
                stars.push(<FontAwesomeIcon icon={faStar} />)
            } else {
                stars.push(<FontAwesomeIcon icon={faStar} style={{opacity: ".3"}}/>)
            }
        }
        return (
            <div style={{color: this.props.textColor}}>
                <div className="commentBlock" style={{backgroundColor: this.props.color, color: this.props.textColor}}>
                    {this.props.children}
                    {stars}
                </div>
                <div className="commentAuthorBlock" style={{color: this.props.textColor}}>
                    <span style={{marginRight: "8px"}}>{this.props.user.name}</span><ProfileLogo height="16px" width="16px" src={this.props.user.profilePic}/>
                </div>
            </div>
        )
    }
}

export class CommentText extends Component {
    render() {
        var rt = this.props.text
        if (this.props.max != -1 && rt.length > this.props.max) {
            rt = rt.substring(0, this.props.max - 3) + "..."
        }
        return (
            <div>
                {rt}
            </div>
        )
    }
}

export class AbstractAroundSpacingBlock extends Component {
    render() {
        return (
            <div className="aroundSpacingBlock" style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

export class AbstractBetweenSpacingBlock extends Component {
    render() {
        return (
            <div className="betweenSpacingBlock" style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

export class SquareBlock extends Component {
    render() {
        return (
            <div className="squareBlock" style={{backgroundColor: this.props.color}}>
                {this.props.children}
            </div>
        )
    }
}

export class SquareBlockImage extends Component {
    render() {
        return (
            <div className="squareBlockImage" style={{backgroundColor: this.props.color}}>
                {this.props.children}
            </div>
        )
    }
}

export class SquareBlockText extends Component {
    render() {
        return (
            <div className="squareBlockText" style={{color: this.props.color}}>
                {this.props.children}
            </div>
        )
    }
}

export class KeywordBlock extends Component {
    render() {
        return (
            <div className="keywordBlock" style={{backgroundColor: this.props.backgroundColor, color: this.props.color}}>
                {this.props.children}
            </div>
        )
    }
}

export class AuthorBlock extends Component {
    render() {
        return (
            <div className="commentAuthorBlock">
                <span style={{ marginRight: "8px" }}>{this.props.date ? this.props.date + "," : ""}</span> <ProfileLogo height="16px" width="16px" src={this.props.profilePic} /><span><a href='/user/{this.props.authorid}'>{this.props.author}</a></span>
            </div>
        )
    }
}