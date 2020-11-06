mapboxgl.accessToken = "pk.eyJ1IjoieW9vcGVyamIiLCJhIjoiY2toNXR1cWI4MDV2YzJ1bndoZnJtZzY3bCJ9.4O6nJopZD7FE6pUVr7f3kg";
   

var map = new mapboxgl.Map({
    container: 'map', // HTML container id
    style: 'mapbox://styles/yooperjb/ckh5ysbtw0amo1apht59y2614', // style URL
    center: [-124.0828, 40.8665], // starting position as [lng, lat]
    zoom: 10
  });

// var marker = new mapboxgl.Marker()
//     .setLngLat([-21.9270884, 64.1436456])
//     .addTo(map);

//$("#map").show();
//map.resize();

//document.getElementById('#map').style.display = 'block';