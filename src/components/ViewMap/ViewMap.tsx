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
import {Icon, Style} from "ol/style";

interface ViewMapProps {
  longitudeAndLatitudePoints: number[][];
}

function ViewMap({longitudeAndLatitudePoints}: ViewMapProps) {
  const mapRef = useRef();
  const [center] = useState(fromLonLat([-75.1652, 39.9526]));
  const [zoom] = useState(14);

  useEffect(() => {
    console.log("LONGLAT POINTS: ", longitudeAndLatitudePoints);
    const features: Feature[] = []
    longitudeAndLatitudePoints.forEach((point) => {
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat(point)),
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'src/assets/up_arrow.png',
        }),
      });

      iconFeature.setStyle(iconStyle);
      features.push(iconFeature);
    })

    console.log("FEATURES: ", features);

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: new VectorSource({
            features: features,
          }),
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
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}

export default ViewMap;
