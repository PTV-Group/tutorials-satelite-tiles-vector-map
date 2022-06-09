const api_key = "YOUR_API_KEY";

maplibregl.setRTLTextPlugin(
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  null,
  true // Lazy load the plugin to support right-to-left languages such as Arabic and Hebrew.
);

const styleUrl = "https://vectormaps-resources.myptv.com/styles/latest/hybrid.json";

var mapLocation = [8.4055677, 49.0070036];

var map = new maplibregl.Map({
  container: 'map',
  zoom: 11,
  pitch: 0,
  minZoom: 2,
  maxZoom: 17,
  center: mapLocation,
  antialias: true,
  hash: true,
  style: styleUrl,
  transformRequest: (url) => {
    let transformedUrl = url;
    let mapsPathIndex;
    if (url.includes("rastermaps")) {
      mapsPathIndex = url.indexOf('/rastermaps/');
    } else if (url.includes("maps")){
      mapsPathIndex = url.indexOf('/maps/');
    } else {
      return null;
    }

    if (mapsPathIndex > 0) {
      transformedUrl = 'https://api.myptv.com/' + url.substring(mapsPathIndex) + '?apiKey=' + api_key;
    } 
    return {
      url: `${transformedUrl}`
    };
  }
});

// Add controls to the map.
map.addControl(new maplibregl.NavigationControl());