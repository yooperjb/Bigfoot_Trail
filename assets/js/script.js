mapboxgl.accessToken = "pk.eyJ1IjoieW9vcGVyamIiLCJhIjoiY2toNXR1cWI4MDV2YzJ1bndoZnJtZzY3bCJ9.4O6nJopZD7FE6pUVr7f3kg";
   

var map = new mapboxgl.Map({
    container: 'map', // HTML container id
    style: 'mapbox://styles/yooperjb/ckh5ysbtw0amo1apht59y2614', // style URL
    //center: [-124.0828, 40.8665], // starting position as [lng, lat]
    //zoom: 11
  });

map.fitBounds([
  [-124.2,40.0],[-122.8,42.05]
]);

map.on('load', function(){
  map.addSource('bigfoot-trail', {
    type: "vector",
    url: 'mapbox://yooperjb.5k1rs37y'
  });
  map.addLayer ({
    "id": "bigfoot-trail", // custom name
    "type": "line",
    "source": "bigfoot-trail",// must be name from addSource above?
    "source-layer": "Bigfoot_Trail-29rrnr",// found below layer details in tilesets
    "layout": {
      "line-join": "round",
      "line-cap": "round"},
    "paint": {
      "line-color": '#a27759',
      "line-width": 2 }
    })
  });


var marker = new mapboxgl.Marker()
  .setLngLat([-124.0828, 40.8665])
  .addTo(map);

// Change map based on selector option
var mapType = $("#maps").change("option",function(){
  var mapSelection = $(this).val();
  //console.log("Selection", $(this).val());
  map.setStyle("mapbox://styles/mapbox/"+mapSelection);
});

