import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useCountriesService from '../../services/CountriesService'

import Spinner from '../Spinner/Spinner'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

import './details.scss';

const CountryDetails = () => {
    const { name } = useParams(); 
    const navigate = useNavigate();
    
    const [country, setCountry] = useState(null);

    const {loading, error, getCountry} = useCountriesService();

    useEffect(() => {
        getCountry()
            .then(onCountryLoaded);
    }, [name]); 

    const onCountryLoaded = (countryData) => {
        setCountry(countryData);
    };

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;


    // if (!country) return <div>Country not found</div>;

    return (
        
        <div className="details">
            <button onClick={() => navigate(-1)} className="details__btn">
                ← Go Back
            </button>

            {errorMessage}
            {spinner}
            
            {loading? null : 
                <>
                    <div className="details__header">
                        <img className="details__img" src="https://flags.restcountries.com/v5/w640/ca.png" alt="Canada" />
                        <div className="details__names">
                            <h2 className="details__name">Name: Canada</h2>
                            <h3 className="details__name">Official Name: Canada</h3>
                            <div className="details__descr">
                                Canada is a Commonwealth realm with Ottawa as its capital and English and French as official languages. The Canadian dollar is the currency, and energy, minerals, forestry, manufacturing and services support a mostly southern population.
                            </div>
                        </div>
                    </div>
                    <div className="details__info">
                        <div className="details__text">Region: North America</div>
                        <div className="details__text">Population: 41798407</div>
                        <div className="details__text">Currency: Canadian dollar $</div>
                        <div className="details__text">Government Type: Federal parliamentary constitutional monarchy</div>
                    </div>
                </>
            }
        </div>
    );
};



export default CountryDetails;