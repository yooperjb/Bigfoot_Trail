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
  // add sources and layers for Bigfoot Trail data
  addSources();
  addLayers();

});

// When photo-point features are clicked get info
map.on("click", "photo-points", function(e){
  console.log(e.features);
  var name = e.features[0].properties.NAME;
  var wilderness = e.features[0].properties.SITE_NAME;
  var URL = e.features[0].properties.URL;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML("<h5>"+name+"</h5><p>"+wilderness+"</p><p><a target='_blank' href='"+URL+"'>"+"More Information</a>")
    .addTo(map);
})

// Change cursor over clickable layers
map.on("mouseenter", "photo-points", function() {
  map.getCanvas().style.cursor = "pointer";
});

// Change cursor back when it leaves
map.on("mouseleave", "photo-points", function(){
  map.getCanvas().style.cursor = "";
});

// checkbox functionality
$(".trailLayers input").click("input", function(){
  // get layer id that was clicked
  clickedLayer = $(this).val();
  // console.log("Checkbox Clicked");
  console.log($(this));
  console.log("Checked? ", $(this).prop('checked'));
  // get checkbox status (true/false)
  checked = $(this).prop('checked');
  // console.log($(this).val());
  //console.log("Checked: ", $(this)[0].checked);
  //console.log(clickedLayer);

  // gets properties of layer checkboxed clicked
  var vis = map.getLayoutProperty(clickedLayer,"visibility");
  //console.log("visible: ",vis);
  // Change status of layer based on checkbox state
  if (checked) {
    map.setLayoutProperty(clickedLayer,"visibility", "visible");
  }
  else {
    map.setLayoutProperty(clickedLayer,"visibility", "none");
  }
});

// Change map based on selector option
let mapType = $("#maps").change("option",function(){
  var mapSelection = $(this).val();
  console.log("Selection", $(this).val());
  map.setStyle("mapbox://styles/mapbox/"+mapSelection);
  //addLayers();
});

const addSources = () => {
  layers.forEach(layer => {
    map.addSource(layer.name,{
      'type': layer.type,
      'url': layer.url
    })
  })
};

const addLayers = () => {
  layers.forEach(layer => {
    let paintKeys = Object.keys(layer.layer.paint);
    console.log("key ", paintKeys[0]);
    console.log("key ", paintKeys[1]);
    //console.log(typeof paintKeys[1]);
    console.log("val ", layer.layer.paint[paintKeys[0]]);
    map.addLayer({
      'id': layer.layer.id,
      'type': layer.layer.type,
      'source': layer.name,
      'source-layer': layer.layer["source-layer"],
      'layout': {
        'visibility': layer.layer.layout.visibility,
      },
      'paint': {
        [paintKeys[0]]: layer.layer.paint[paintKeys[0]],
        [paintKeys[1]]: layer.layer.paint[paintKeys[1]],
      },
    })
  })
};