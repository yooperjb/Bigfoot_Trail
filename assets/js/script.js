mapboxgl.accessToken = "pk.eyJ1IjoieW9vcGVyamIiLCJhIjoiY2toNXR1cWI4MDV2YzJ1bndoZnJtZzY3bCJ9.4O6nJopZD7FE6pUVr7f3kg";
   
var map = new mapboxgl.Map({
    container: 'map', // HTML container id
    style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
    //center: [-124.0828, 40.8665], // starting position as [lng, lat]
    //zoom: 11
  });

map.fitBounds([
  [-124.2,40.0],[-122.8,42.05]
]);

map.on('load', function() {
  // add source and layer for Bigfoot Trail
  map.addSource('bigfoot-trail', {
    type: "vector",
    url: "mapbox://yooperjb.5k1rs37y"
    });
  
  map.addSource('photo-points', {
    type: "vector",
    url: "mapbox://yooperjb.20exx7ob"
    });

  map.addLayer ({
    "id": "bigfoot-trail", // custom name
    "type": "line",
    "source": "bigfoot-trail",// must be name from addSource above
    "source-layer": "Bigfoot_Trail-29rrnr",// found below layer details in tilesets
    "layout": {
      "line-join": "round",
      "line-cap": "round",
      "visibility": "visible"},
    "paint": {
      "line-color": '#a27759',
      "line-width": 2 }
    });
  map.addLayer({
    "id": "photo-points", 
    "type": "circle",
    "source": "photo-points",
    "source-layer": "high_points-aa54oz",
    "layout": {
      "visibility": "none"},
    "paint": {
      "circle-radius": 4,
      "circle-color": 'black'
    }
  });
});

// When layer features are clicked get info
map.on("click", "photo-points", function(e){
  console.log(e.features);
})

// Change cursor over clickable layers
map.on("mouseenter", "photo-points", function() {
  map.getCanvas().style.cursor = "pointer";
});

// Change cursor back when it leaves
map.on("mouseleave", "photo-points", function(){
  map.getCanvas().style.cursor = "";
});

$(".trailLayers input").click("input", function(){
  clickedLayer = $(this).val();
  // console.log("Checkbox Clicked");
  //console.log($(this));
  // console.log($(this).val());
  //console.log("Checked: ", $(this)[0].checked);
  //console.log(clickedLayer);
  var vis = map.getLayoutProperty(clickedLayer,"visibility");
  //console.log("visible: ",vis);
  if (vis === "visible") {
    map.setLayoutProperty(clickedLayer,"visibility", "none");
  }
  else {
    map.setLayoutProperty(clickedLayer,"visibility", "visible");
  }
})

// Change map based on selector option
var mapType = $("#maps").change("option",function(){
  var mapSelection = $(this).val();
  console.log("Selection", $(this).val());
  map.setStyle("mapbox://styles/mapbox/"+mapSelection);
  addLayers();
});

