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
                <ProfileLogo height="56px" width="56px" src={this.props.user.profilePic}/>
                <div className="greetingName">
                    {this.props.user.name}
                </div>
            </div>
            </div>
        )
    }
}