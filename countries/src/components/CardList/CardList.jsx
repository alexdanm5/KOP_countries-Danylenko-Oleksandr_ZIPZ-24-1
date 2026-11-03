import {useState, useEffect} from 'react';
import useCountriesService from '../../services/CountriesService'
import Spinner from '../Spinner/Spinner'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

import AppHeader from '../AppHeader/AppHeader';
import Card from '../Card/Card'

import './cardList.scss'

const CardList = () => {
    const [countriesList, setCountriesList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [sortBy, setSortBy] = useState('name'); 
    const [sortOrder, setSortOrder] = useState('asc');

    

    const {loading, error, getAllCountries, getFilteredCountries} = useCountriesService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])


    const onRequest = (offset) => {
        getAllCountries(offset)
            .then(onCountriesListLoaded)

    }

    const onFilteredRequest = (formValues, offset) => {
        getFilteredCountries(formValues, offset)
            .then(onCountriesListLoaded)
    }

    const onCountriesListLoaded = (newCountriesList) => {
        setCountriesList(newCountriesList);
    }

    const sortedData = [...countriesList].sort((a, b) => { 
        if (sortBy === 'name') {
            return sortOrder === 'asc' 
                ? a.name.localeCompare(b.name) 
                : b.name.localeCompare(a.name);
        }
        
        if (sortBy === 'area') {
            return sortOrder === 'asc' 
                ? a.area.kilometers - b.area.kilometers 
                : b.area.kilometers - a.area.kilometers;
        }
        
        return 0;
    });

    const sortAToZ = () => {
        setSortBy('name');
        setSortOrder('asc')
    }

    const sortZToA = () => {
        setSortBy('name');
        setSortOrder('desc')
    }

     const sortByArea = () => {
        setSortBy('area');
        setSortOrder('desc')
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="widgetsLayout">
            <AppHeader filter={onFilteredRequest} sortAToZ={sortAToZ} sortZToA={sortZToA} sortByArea={sortByArea}/>

            <div className="widgetsLayout__wrapper">
                {errorMessage}
                {spinner}
                {loading ? null : sortedData.map((item, i) => (
                    <Card key={i} country={item}/>
                ))}   
            </div>
            
        </div>
    )
}

export default CardList