import axios from 'axios'

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) =>{
    try{
        let changeableUrl = url;
        if(country){
            changeableUrl = `${url}/countries/${country}`
        }
        //const {data} = await axios.get(url);
        // or 
        const {data : {confirmed, recovered,deaths,lastUpdate}} = await axios.get(changeableUrl);
        return {
            confirmed: confirmed,
            recovered: recovered,
            deaths: deaths,
            lastUpdate: lastUpdate
        }
    }
    catch(err){
        console.log(err);
    }
}

export const fetchDailyData = async()=>{
    try{
        const { data } = await axios.get(`${url}/daily`);

        const modifiedData = data.map((dailyData) =>
            ({
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate,
            }) // returning an object for each data through the map
        );
        return modifiedData;
    }
    catch(err){
        console.log(err);
    }
}

export const fetchCountries = async()=>{
    try{
        const {data:{countries}} = await axios.get(`${url}/countries`)
        return countries.map((country)=> country.name);
    }
    catch(err){
        console.log(err);
    }
}