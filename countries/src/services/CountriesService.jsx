import { useHttp } from "../hooks/http.hook";

const useCountriesService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://api.restcountries.com/countries/v5";
	const _baseOffset = 25;
	const _baseLimit = 20;

    const getAllCountries = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}?limit=${_baseLimit}&offset=${offset}`
		);
		return res.data.objects.map(_transformCountries);
	};

	const getFilteredCountries = async (formValues, offset = _baseOffset ) => {
		const params = new URLSearchParams();

		if (formValues.text) {
			params.append('names.common', formValues.text);
		}


		const activeFilters = Object.keys(formValues).filter(
			key => key !== 'text' && formValues[key] === true
		);
		

		if (activeFilters.length > 0) {
			activeFilters.forEach(filter => {
				params.append(`memberships.${filter}`, '1');
			});
		}

		const res = await request(
			`${_apiBase}?${params.toString()}&limit=${_baseLimit}&offset=${offset}`
		);
		return res.data.objects.map(_transformCountries);
	};

	const getCountry = async (name) => {
		const res = await request(`${_apiBase}?names.common=${name}`);
		return _transformCountries(res.data.objects[0]);
	};

    const _transformCountries = (country) => {
		return {
			name: country.names.common,
			officialName: country.names.official,
            region: country.region || "There is no region",
			subregion: country.subregion || "There is no subregion",
            flag: country.flag.url_png || null,
			description: country.descriptions.short || "There is no description",
			longDescription: country.descriptions.long || "There is no long description",
            gini: country.economy.gini_coefficient,
            area: country.area,
            borders: country.borders,
            translations: country.names.translations,
			population: country.population,
			currencies: country.currencies.map(currency => `${currency.name} (${currency.symbol})`).join(', '),
			governmentType: country.government_type || "There is no government type",
		};
	};

	return {
		loading,
		error,
		clearError,
        getAllCountries,
		getFilteredCountries,
		getCountry
	};
}

export default useCountriesService