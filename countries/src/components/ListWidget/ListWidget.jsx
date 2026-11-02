import { useState } from 'react';

import Categories from '../Categories/Categories';
import SortWidget from '../SortWidget/SortWidget';
import FilteredList from '../FilteredList/FilteredList';
import './listWidget.scss';

const ListWidget = ({list}) => {

    const [style, setStyle] = useState(false);

    const {translations} = list;

    const [translationList, setTranslationList] = useState(translations);


    const sortByCountryNameAZ = () => {
        const sortedObj = Object.keys(translations)
            .sort() 
            .reduce((acc, key) => {
                acc[key] = translations[key];
                return acc; 
            }, {});
            
        setTranslationList(sortedObj);
    }

    const sortByCountryZA = () => {
        const sortedObj = Object.keys(translations)
            .sort()      
            .reverse()   
            .reduce((acc, key) => {
                acc[key] = translations[key];
                return acc;
            }, {});
        setTranslationList(sortedObj);
    }


    return(
        <div className="listWidget">
            <div className="listWidget__title">{list.name} in Different Languages</div>

            <div className="listWidget__categories">
                <SortWidget onSortAToZ={sortByCountryNameAZ} onSortZToA={sortByCountryZA}/>
            </div>
            <div className="listWidget__filteredList">
                <FilteredList translation={translationList} style={style} />
            </div>
            <button className='listWidget__btn'
            onClick={() => {
               style ? setStyle(false) : setStyle(true)
            }}
            >Show more</button>
        </div>
    )
}

export default ListWidget