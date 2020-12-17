
// vector tileset layers
let layers = [
    {
    name:'bigfoot-trail',
    source: {
      type: "vector",
      url: "mapbox://yooperjb.5k1rs37y" },
    layer: {
      "id": "bigfoot-trail", 
      "type": "line",
      "source": "bigfoot-trail",
      "source-layer": "Bigfoot_Trail-29rrnr",
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible"},
      "paint": {
        "line-color": '#a27759',
        "line-width": 2 }
      },
    },
    {
    name: 'water-points',
    source: {
      type: "vector",
      url: "mapbox://yooperjb.d3fmw0q7"},
    layer: {
      "id": "water-points", 
      "type": "circle",
      "source": "water-points",
      "source-layer": "water_points-d2zqcw", 
      "layout": {
        "visibility": "none"},
      "paint": {
        "circle-radius": 4,
        "circle-color": '#5776f2'}
      },
    },
    {
      name: 'photo-points', 
      source: {
        type: "vector",
        url: "mapbox://yooperjb.ckh9xrkoe01rf22lfji34unkd-0sszg"},
      layer: {
        "id": "photo-points",
        "type": "symbol",
        "source": "photo-points",
        "source-layer": "bigfoot-photo-points",
        "layout": {
          "icon-image": 'camera-icon',
          "icon-size": .15,
          "visibility": "none"},
        "paint": {
          "icon-color": 'black',
          "icon-opacity": 1,}
        },
      },
      {
        name: 'AQI_data',
        source: {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': aqData}
          },
        layer: {
          'id': 'AQI_data',
          'type': 'circle',
          'source': 'AQI_data',
          'layout': {
            "visibility": "none"},
          // Automate circle color based on pm2.5 value
          'paint': {
            'circle-radius': 7,
            'circle-color': {
              type: 'identity',
              property: 'color',},
          }
        },
      },
  ];