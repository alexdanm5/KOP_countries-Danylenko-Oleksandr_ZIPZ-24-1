import { Link } from 'react-router';

import './cardHeader.scss'

const CardHeader = ({countryHeader}) => {
    
    const {name, flag, description, region, gini} = countryHeader;

    
    const arrGini = Object.values(gini);

    const giniCoficiente = arrGini[arrGini.length - 1] - arrGini[0];


    return (
        <div className="info">
            <div className="info__header">
                <h3 className="info__region">{region}</h3>
                <div className="info__flag">
                    <img src={flag} alt="Flag" />
                </div> 
            </div>

            <div className="info__general">
                <h2 className="info__name">{name}</h2>
                <div className="info__description">{description}</div>
            </div>
            {(!arrGini ||arrGini.length === 0) ? (<div>No data of gini</div>) : 
               ( <div className={`info__data ${giniCoficiente > 0 ? 'giniUp' : 'giniDown'}`}>
                    <div className="info__gini">
                        <div className="info__gini-arrow">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.9162 9.9162V4.0838H4.0838M9.9162 4.0838L4.0838 9.9162" strokeWidth="1.8" strokeLinecap="round" stroke="#187452" />
                            </svg>
                        </div>
                        <div className="info__gini-value">{giniCoficiente.toFixed(1)}</div>
                    </div>
                    <div className="info__years">gini cofficiente</div>
                </div>)
            }
            <Link to={`/country/${name}`} className="info__btn">
                Read More
            </Link>
        </div>
            
    )
        
    
}

export default CardHeader