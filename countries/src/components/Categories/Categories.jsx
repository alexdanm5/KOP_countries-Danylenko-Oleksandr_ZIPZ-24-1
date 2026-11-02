import { useState } from 'react';

import './categories.scss';

const Categories = ({ title = "Filter", children }) => {
    const [isListVisible, setIsListVisible] = useState(false);

    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible);
    };

    return(
        <div className={`categories ${isListVisible ? 'listActive' : ''}`}>
            <div className="categories__header">
                <div className="categories__icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.33279 3.33279H14.6672M3.99967 7.99999H12.0003M5.99983 12.6672H10.0002" strokeWidth="1.6" strokeLinecap="round" stroke="#5553AD" />
                    </svg>
                </div>
                <div className="categories__title"> Filter</div>
                <button className={`categories__btn ${isListVisible ? 'rotateArrow' : ''}`}
                    onClick={toggleListVisibility}
                    type='button'
                >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.75 5.625L7.5 9.375L11.25 5.625" strokeWidth="1.6" strokeLinecap="round" stroke="#5553AD" />
                    </svg>
                </button>
            </div>
            <ul className="categories__list">
                {children}
            </ul>
        </div>
    )
}

export default Categories