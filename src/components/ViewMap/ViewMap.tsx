import { useRef, useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import 'ol/ol.css';
import {Point} from "ol/geom";
import {Feature} from "ol";

const ViewMap = () => {
  const mapRef = useRef();
  const [center] = useState(fromLonLat([-75.1652, 39.9526]));
  const [zoom] = useState(14);

  const [iconFeatures, setIconFeatures] = useState<Feature<Point>[]>([]);

  // Load the
  useEffect(() => {

  }, []);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),

        new VectorLayer({
          source: new VectorSource(),
        })
      ],
      view: new View({
        center: center,
        zoom: zoom
      })
    });

    return () => {
      map.setTarget(undefined);
    };
  }, [center, zoom, iconFeatures]);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default ViewMap;
