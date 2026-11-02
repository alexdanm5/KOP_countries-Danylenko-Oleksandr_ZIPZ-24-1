import Categories from '../Categories/Categories';

const SortWidget = ({ onSortAToZ, onSortZToA }) => {
    return (
        <Categories title="Sort">
            <ul className="categories__list">
                <li className="categories__item" onClick={onSortAToZ}>Sort by country A to Z</li>
                <li className="categories__item" onClick={onSortZToA}>Sort by country Z to A</li>
            </ul>
        </Categories>
    );
};

export default SortWidget