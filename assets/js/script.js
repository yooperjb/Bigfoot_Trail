mapboxgl.accessToken = "pk.eyJ1IjoieW9vcGVyamIiLCJhIjoiY2toNXR1cWI4MDV2YzJ1bndoZnJtZzY3bCJ9.4O6nJopZD7FE6pUVr7f3kg";
let cameraIcon = 'https://i.dlpng.com/static/png/5266232-camera-icon-png-image-free-download-searchpngcom-camera-icon-png-1300_989_preview.png'
// constrain json data to lat lon bounds
// const purpleAir = 'https://www.purpleair.com/json?nwlat=42.6&selat=38.9&nwlng=-124.75&selng=-119.96';
const purpleAir = 'https://api.purpleair.com/v1/sensors?fields=name%2Clatitude%2Clongitude%2Caltitude%2Cpm1.0%2Cpm2.5%2Chumidity%2Ctemperature%2Cpressure%2Cvoc%2Cozone1&location_type=0&nwlng=-124.75&nwlat=42.6&selng=-119.96&selat=38.9';
let aqData = [];

var map = new mapboxgl.Map({
    container: 'map', // HTML container id
    style: 'mapbox://styles/mapbox/light-v10',
    //style: 'mapbox://styles/yooperjb/cki6n0smk12s719pfdy1e5lnt',
  });

map.fitBounds([
  [-124.2,40.0],[-122.8,42.05]
]);

// When map loads...
map.on('load', function() {
  // Fetch PurpleAir air quality data
  fetch(purpleAir, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'A4F62FD2-44C8-11EB-9893-42010A8001E8',
    }
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data.data);
      // Convert AQ data to geojson
      convertAqData(data.data);
      
      // After AQ fetch add sources and layers
      loadImages();
      addSources();
      addLayers();

    });
});

// When photo-point features are clicked flyto and get info
map.on("click", "photo-points", function(e){
  //console.log(e.features[0]);
  map.flyTo({
    center: e.features[0].geometry.coordinates,
    speed: 0.2,

  });
  //const name = e.features[0].properties.NAME;
  //const wilderness = e.features[0].properties.SITE_NAME;
  //const elev = e.features[0].properties.ELEV;
  //const URL = e.features[0].properties.URL;
  const {NAME, SITE_NAME, ELEV, URL} = e.features[0].properties;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    //.setHTML("<h5>"+name+"</h5><p>"+wilderness+"</p><p><a target='_blank' href='"+URL+"'>"+"More Information</a>")
    .setHTML(`<h5>${NAME}</h5><p>${SITE_NAME}</p><p>Elevation ${ELEV} ft.</p><p><a target='_blank' href='${URL}'>More Information</a>`)
    .addTo(map);
});

// When AQ Data features are clicked flyto and get info
map.on("click", "AQI_data", function(e){
  //console.log(e.features[0]);
  map.flyTo({
    center: e.features[0].geometry.coordinates,
    speed: 0.2,

  });
  const {label,color,humidity,id,pm25,temp} = e.features[0].properties;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(`<h5>${label}</h5>
    <ul>
    <li>PM 2.5: ${pm25}</li>
    <li>Temp: ${temp}</li>
    <li>Humidity: ${humidity}</li>
    <li>Sensor: ${id}</li>
    </ul>`)
    .addTo(map);
});

// Change cursor over clickable layers
map.on("mouseenter", "photo-points", function() {
  map.getCanvas().style.cursor = "pointer";
});
map.on('mouseenter', 'AQI_data', function() {
  map.getCanvas().style.cursor = 'pointer';
});

// Change cursor back when it leaves
map.on("mouseleave", "photo-points", function(){
  map.getCanvas().style.cursor = "";
});
map.on("mouseleave", "AQI_data", function(){
  map.getCanvas().style.cursor = "";
});

// checkbox layer toggle functionality
$(".trailLayers input").click("input", function(){
  // get layer id that was clicked
  clickedLayer = $(this).val();
  console.log(clickedLayer);
  
  // get checkbox status (true/false)
  checked = $(this).prop('checked');

  // gets properties of layer checkboxed clicked
  let vis = map.getLayoutProperty(clickedLayer,"visibility");
  //console.log("visible: ",vis);
  // Change status of layer based on checkbox state
  if (checked) {
    map.setLayoutProperty(clickedLayer,"visibility", "visible");
  }
  else {
    map.setLayoutProperty(clickedLayer,"visibility", "none");
  }
});

// Change map style based on style selector option
let mapType = $("#maps").change("option",function(){
  var mapSelection = $(this).val();
  //console.log("Selection", $(this).val());
  map.setStyle("mapbox://styles/mapbox/"+mapSelection);
  map.on('styledata', function(){
    loadImages();
    addSources();
    addLayers();
 })
});

// add vector sources
const addSources = () => {
  layers.forEach(layer => {
    // destructure object into variables
    let {name, source } = layer;
    //console.log(name, source);
    map.addSource(name,source);
  })
};

// add vector layers
const addLayers = () => {
  layers.forEach(data => {
    // destructure layers object
    let {layer} = data;
    //console.log(data.name,layer)
    map.addLayer(layer)
  })
};

// icon images
const loadImages = () => {
  // load camera icon
  map.loadImage('https://image.flaticon.com/icons/png/128/482/482887.png', function(error, image) {
    if (error) {
      console.log("Got an error: ",error);
      throw error;
    }
    map.addImage('camera-icon', image, {sdf:true});
  });
};

// Coverte AQ data to geoJSON file
const convertAqData = (array) => {
  // start conversion timer
  let t0 = performance.now();
  array.forEach(sensor => {
    let [ID,Label, Lat, Lon, alt,pm1,pm2_5,humidity, temp_f,pressure,voc,ozone ] = sensor;
    
      let data = 
        {
          type:'Feature',
          geometry: {
            type: 'Point',
            coordinates: [Lon, Lat],
          },
          properties: {
            id: ID,
            label:Label,
            pm1: pm1,
            pm25: pm2_5,
            alt: alt,
            humidity: humidity,
            temp: temp_f,
            pressure: pressure,
            voc: voc,
            ozone: ozone,
            color: getColor(pm2_5),
          },
        }
      aqData.push(data);
    
})
  //console.log('Aq Data: ',aqData);
  let t1 = performance.now();
  console.log('Data conversion took ' + (t1-t0) + ' milliseconds');
};

// assign AQI color based on pm2.5 value
const getColor = (value) => {
  if (value < 50) {
    return '#68E143';
  }
  else if (value < 100 ) {
    return '#FFFF55';
  }
  else if (value < 150) {
    return '#EF8533';
  }
  else if (value < 200) {
    return '#EA3324';
  }
  else if (value < 300) {
    return '#8C1A4B';
  }
  else if (value < 400) {
    return '#731425';
  }
  else if (value > 400) {
    return '#731425';
  }
};
