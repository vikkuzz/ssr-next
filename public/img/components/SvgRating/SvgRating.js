import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const SvgRating = ({ colorPercent1, colorPercent2, id, classStyle }) => {
    const color1 = colorPercent1 + '%';
    const color2 = colorPercent2 + '%';
    return (
        <svg
            width="27"
            height="28"
            viewBox="0 0 27 28"
            fill={`url(#${id})`}
            xmlns="http://www.w3.org/2000/svg"
            className={classStyle}
        >
            <defs>
                <linearGradient id={id}>
                    <stop offset={color1} stopColor="#51b37f" />
                    <stop offset={color2} stopColor="white" />
                </linearGradient>
            </defs>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27 0H0V28H27V0ZM19.3718 23.5345L17.638 18.1971L13.5032 19.269L19.3718 23.5345ZM15.7444 12.3704H23V12.3712L17.1314 16.6351L13.5032 19.2682L7.62742 23.5337L9.87575 16.6351L4 12.3625L11.2556 12.372L13.504 5.46631L15.7444 12.3704Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default SvgRating;
