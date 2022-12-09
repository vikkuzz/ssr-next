import React from 'react';

import styles from '../../styles/Accordion/Accordion.module.scss';

const AccordionItem = ({
    showDescription,
    ariaExpanded,
    fontWeightBold,
    item,
    index,
    onClick,
}) => (
    <div className={`${styles.faq__question}`} key={item.question}>
        <dt>
            <button
                aria-expanded={ariaExpanded}
                aria-controls={`${styles[`faq${index + 1}_desc`]}`}
                data-qa="faq__question_button"
                className={`${styles.faq__question_button} ${fontWeightBold}`}
                onClick={onClick}
            >
                {item.question}
            </button>
        </dt>
        <dd>
            <p
                id={`faq${index + 1}_desc`}
                data-qa="faq__desc"
                className={`${styles.faq__desc} ${showDescription}`}
            >
                {item.answer}
            </p>
        </dd>
    </div>
);

export default AccordionItem;
