import React, { useEffect } from 'react';

const SvgContainer = ({
    item,
    color,
    hover,
    classStyle,
    opacity,
    fillRule,
    clipRule,
    stroke,
}) => {
    const svg = React.createRef();

    useEffect(() => {
        svg.current.style.fill = color;
    }, []);

    const onHover = () => {
        svg.current.style.fill = hover;
    };
    const onHoverOut = () => {
        svg.current.style.fill = color;
    };

    return (
        <svg
            className={classStyle}
            onMouseLeave={onHoverOut}
            onMouseEnter={onHover}
            ref={svg}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={item.viewBox}
        >
            <path
                d={item.d}
                opacity={opacity}
                fillRule={fillRule}
                clipRule={clipRule}
                stroke={stroke}
                strokeLinejoin={item.strokeLinejoin}
                strokeLinecap={item.strokeLinecap}
                strokeWidth={item.strokeWidth}
            />
            {item.d2 && <path d={item.d2} />}
            {item.circle && (
                <circle
                    cx={item.circle.cx}
                    cy={item.circle.cy}
                    r={item.circle.r}
                    fill={item.circle.fill}
                />
            )}
        </svg>
    );
};

export default SvgContainer;
