import React, { Component, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import '../css/Main.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export class ProgressBar extends Component {
    render() {
        const bars = []
        this.props.content.map((item, index) => {
            bars.push(
                <div className="circularProgressbarHandler">
                    <div style={{ width: 80, height: 80, display: 'inline-block' }}>
                        <CircularProgressbar value={item.percentage} text={`${item.percentage}%`} styles={{
                            root: {},
                            path: {
                                stroke: item.color,
                            },
                            trail: {
                                stroke: '#eee',
                                strokeLinecap: 'butt',
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                            },
                            text: {
                                fill: '#000',
                                fontSize: '16px',
                            },
                            background: {
                                fill: '#000',
                            },
                        }} />
                    </div>
                    <div className='text'>{item.name}</div>
                </div>);
        })
        return (
            <div className="progressbarHandler">
                {bars}
            </div>
        )
    }
}