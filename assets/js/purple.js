const purpleAirAPI = 'https://api.purpleair.com/v1/sensors?fields=name%2Chumidity%2Ctemperature%2Cpressure%2Cvoc%2Cozone1&location_type=0&nwlng=-124.75&nwlat=42.6&selng=-119.96&selat=38.9';


fetch(purpleAirAPI, {
    method: 'GET',
    headers: {
        'X-API-Key': 'A4F62FD2-44C8-11EB-9893-42010A8001E8',
        'Content-Type':'application/json',}
}).then(data => data.json())
    .then(data => console.log("Data: ",data));

