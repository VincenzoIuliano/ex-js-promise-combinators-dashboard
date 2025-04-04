async function getDashboardData(query) {
    try{
        console.log(`Carico la query di ${query}`);

    const destinationPromise = fetch(`https://freetestapi.com/api/v1/destinations?search=${query}`).then( res => res.json())
    const weathersPromise = fetch(`https://freetestapi.com/api/v1/weathers?search=${query}`).then( res => res.json())
    const airportsPromise = fetch(`https://freetestapi.com/api/v1/airports?search=${query}`).then( res => res.json())
    
    const promises = [destinationPromise , weathersPromise , airportsPromise]

    const promisesResults = await Promise.all(promises);

    const destinations = promisesResults[0];
    const weathers = promisesResults[1];
    const airports = promisesResults[2];

    return {
        city: destinations[0].name,
        country: destinations[0].country,
        temperature: weathers[0].temperature,
        weather: weathers[0].weather_description,
        airport: airports[0].name
    }
    }catch(error) {
        error => console.error(error)
    }
}

getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));