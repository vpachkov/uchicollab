import React, { Component, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { ProfileLogo } from "./ProfileLogo";

export class User extends Component {
    render() {
        return (
            <div>
            <div className="greetingMsg">
                {this.props.prefix}
            </div>
            <div className="greetingNameHandler">
                <ProfileLogo height="48px" width="48px" src={this.props.profilePic}/>
                <div className="greetingName">
                    {this.props.name}
                </div>
            </div>
            </div>
        )
    }
}