mapboxgl.accessToken = "pk.eyJ1IjoieW9vcGVyamIiLCJhIjoiY2toNXR1cWI4MDV2YzJ1bndoZnJtZzY3bCJ9.4O6nJopZD7FE6pUVr7f3kg";
let cameraIcon = 'https://i.dlpng.com/static/png/5266232-camera-icon-png-image-free-download-searchpngcom-camera-icon-png-1300_989_preview.png'

var map = new mapboxgl.Map({
    container: 'map', // HTML container id
    style: 'mapbox://styles/mapbox/outdoors-v11',
    //style: 'mapbox://styles/yooperjb/cki6n0smk12s719pfdy1e5lnt',
  });

map.fitBounds([
  [-124.2,40.0],[-122.8,42.05]
]);

map.on('load', function() {

  // load camera icon
  map.loadImage('https://image.flaticon.com/icons/png/128/482/482887.png', function(error, image) {
    if (error) {
      console.log("Got an error: ",error);
      throw error;
    }
    map.addImage('camera-icon', image, {sdf:true});
  });

  // add sources and layers for Bigfoot Trail data
  addSources();
  addLayers();

  // map.addSource("photo-points",{
  //   type: "vector",
  //   url: "mapbox://yooperjb.ckh9xrkoe01rf22lfji34unkd-0sszg",//tileset ID
  // })
//   map.addLayer({
//     "id": "photo-points",
//     "type": "symbol",
//     "source": "photo-points",
//     "source-layer": "bigfoot-photo-points", //name on mapbox
//     "layout": {
//       "icon-image": 'camera-icon',
//       "icon-size": .15,
//       "visibility": "visible"},
//     "paint": {
//       "icon-color": 'black',
//       "icon-opacity": 1,
//     }
//   },
// )
});

// When photo-point features are clicked get info
map.on("click", "photo-points", function(e){
  //console.log(e.features);
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

// checkbox layer toggle functionality
$(".trailLayers input").click("input", function(){
  // get layer id that was clicked
  clickedLayer = $(this).val();
  // console.log("Checkbox Clicked");
  //console.log($(this));
  //console.log("Checked? ", $(this).prop('checked'));
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

// Change map style based on selector option
let mapType = $("#maps").change("option",function(){
  var mapSelection = $(this).val();
  console.log("Selection", $(this).val());
  map.setStyle("mapbox://styles/mapbox/"+mapSelection);
  //addLayers();
});

const addSources = () => {
  layers.forEach(layer => {
    // destructure object into variables
    let {type, url } = layer;
    map.addSource(layer.name,{
      'type': type,
      'url': url
    })
  })
};

const addLayers = () => {
  layers.forEach(layer => {
    // destructure layers object
    let {id, type, source, 'source-layer':sourceLayer,layout,paint } = layer.layer;
    //console.log(id, type, source, sourceLayer,layout,paint);
    let paintKeys = Object.keys(layer.layer.paint);
    //console.log("key ", paintKeys[0]);
    //console.log("key ", paintKeys[1]);
    //console.log(typeof paintKeys[1]);
    //console.log("val ", layer.layer.paint[paintKeys[0]]);
    map.addLayer({
      'id': id,
      'type': type,
      'source': source,
      'source-layer': sourceLayer,
      'layout': layout,
      'paint': paint,
    })
  })
};