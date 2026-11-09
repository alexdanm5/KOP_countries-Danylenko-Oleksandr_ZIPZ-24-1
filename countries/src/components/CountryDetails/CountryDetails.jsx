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
        onRequest(name);
    }, [name]); 

    const onRequest = (name) => {
        getCountry(name)
            .then(onCountryLoaded);
    }

    const onCountryLoaded = (countryData) => {
        setCountry(countryData);
    };

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    if (loading) return <div className="details">{spinner}</div>;
    if (error) return <div className="details">{errorMessage}</div>;
    
    if (!country) return <div className="details"><button onClick={() => navigate(-1)} className="details__btn">← Go Back</button></div>;  

    return (
        
        <div className="details">
            <button onClick={() => navigate(-1)} className="details__btn">
                ← Go Back
            </button>

                    <div className="details__header">
                        <img className="details__img" src={country.flag} alt={country.name} />
                        <div className="details__names">
                            <h2 className="details__name">Name: {country.name}</h2>
                            <h3 className="details__name">Official Name: {country.officialName}</h3>
                            <div className="details__descr">
                                {country.longDescription}
                            </div>
                            </div>
                    </div>
                    <div className="details__info">
                        <div className="details__text">Region: {country.region}</div>
                        <div className="details__text">Population: {country.population.toLocaleString()}</div>
                        <div className="details__text">Currency: {country.currencies}</div>
                        <div className="details__text">Government Type: {country.governmentType}</div>
                    </div>

        </div>
    );
};



export default CountryDetails;