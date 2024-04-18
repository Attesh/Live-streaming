import { fetchData } from '@services/base.js';


export async function getAllCountries() {
    try {
        let countries = {};
        countries = await fetchData('get-all-countries');
        return countries?.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllStatesByCountry(country_id) {
    try {
        let states;
        const params = { country_id: country_id };
        states = await fetchData('get-states-by-country', params);
        return states?.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllCitiesByState(state_id) {
    try {
        let cities;
        const params = { state_id: state_id };
        cities = await fetchData('get-cities-by-state', params);
        return cities?.data;
    } catch (error) {
        console.log(error);
    }
}
