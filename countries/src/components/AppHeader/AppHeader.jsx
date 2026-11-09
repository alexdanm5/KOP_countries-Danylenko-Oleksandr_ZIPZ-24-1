import { useState, useContext } from 'react';
import { FilterContext } from '../../context/FilterContext';
import { ThemeContext } from '../../context/ThemeContext';

import Searcher from '../Searcher/Searcher';

import './appHeader.scss'

const AppHeader = () => {

    const { sortAToZ, sortZToA, sortByArea } = useContext(FilterContext);

    const { theme, toggleTheme } = useContext(ThemeContext);

    const BUTTONS = [
        { id: 'nameAsc', label: 'Sort by country A-Z', fn: sortAToZ },
        { id: 'nameDesc', label: 'Sort by country Z-A', fn: sortZToA  },
        { id: 'area', label: 'Sort by area of country', fn: sortByArea }
    ];
    const [activeBtn, setActiveBtn] = useState(BUTTONS[0].id);
    
    return (
        <div className='appHeader'>
            <button onClick={toggleTheme} className="appHeader__btn" style={{marginBottom: '10px'}}>
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>

            <div className='appHeader__search'>
                <Searcher />
            </div>
            
            <div className='appHeader__btns'>
                {BUTTONS.map((btn) => (
                    <button
                        key={btn.id}
                        className={`appHeader__btn ${activeBtn === btn.id ? 'btn-active' : ''}`}
                        onClick={()=>{btn.fn(); setActiveBtn(btn.id)}}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default AppHeader