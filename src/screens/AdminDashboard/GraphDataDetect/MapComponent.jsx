import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Overlay } from 'ol';
import pinIcon from '../../../assets/icons/yellowDot.avif';  // Import the pin icon

const MapComponent = ({ locations }) => {
  const mapElement = useRef();
  const popupElement = useRef();
  const overlay = useRef();

  useEffect(() => {
    const features = locations.map(location => {
      const { latitude, longitude, pincode, name } = location;
      const feature = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
        pincode: pincode,
        location: name,
      });

      feature.setStyle(new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: pinIcon,
          width:20
        }),
      }));

      return feature;
    });

    const vectorSource = new VectorSource({
      features: features,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    overlay.current = new Overlay({
      element: popupElement.current,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -50],
    });

    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      overlays: [overlay.current],
      view: new View({
        center: fromLonLat(locations.length > 0 ? [locations[0].longitude, locations[0].latitude] : [0, 0]),
        zoom: 10,
      }),
    });

    map.on('click', (event) => {
      const features = map.getFeaturesAtPixel(event.pixel);
      if (features.length > 0) {
        const feature = features[0];
        const coordinates = feature.getGeometry().getCoordinates();
        const [lon, lat] = toLonLat(coordinates).map(coord => coord.toFixed(2));
        const pincode = feature.get('pincode');
        const location = feature.get('location');
        const content = `<div>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Latitude:</strong> ${lat}</p>
          <p><strong>Longitude:</strong> ${lon}</p>
          <p><strong>Pincode:</strong> ${pincode}</p>
        </div>`;
        popupElement.current.innerHTML = content;
        overlay.current.setPosition(coordinates);
      } else {
        overlay.current.setPosition(undefined);
      }
    });

    return () => {
      map.setTarget(undefined);
    };
  }, [locations]);

  return (
    <div>
      <div ref={mapElement} id="map" style={{ width: '100%', height: '400px' }}></div>
      <div ref={popupElement} className="ol-popup" />
    </div>
  );
};

export default MapComponent;