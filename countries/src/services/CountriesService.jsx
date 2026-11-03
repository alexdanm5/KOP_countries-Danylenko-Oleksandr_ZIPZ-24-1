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
		console.log(`${_apiBase}?${params.toString()}&limit=${_baseLimit}&offset=${offset}`);

		const res = await request(
			`${_apiBase}?${params.toString()}&limit=${_baseLimit}&offset=${offset}`
		);
		return res.data.objects.map(_transformCountries);
	};

    const _transformCountries = (country) => {
		return {
			name: country.names.common,
            region: country.region || "There is no region",
            flag: country.flag.url_png || null,
			description: country.descriptions.long || "There is no description",
            gini: country.economy.gini_coefficient,
            area: country.area,
            borders: country.borders,
            translations: country.names.translations
		};
	};

	return {
		loading,
		error,
		clearError,
        getAllCountries,
		getFilteredCountries
	};
}

export default useCountriesService