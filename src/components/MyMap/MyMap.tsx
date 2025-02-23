import { useRef, useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import {useCoordinateState} from "../../CoordinateState.tsx";

const MyMap = () => {
  // ol.proj.transform([-8367174.179297738, 4859025.894138464],"WGS84", "EPSG:900913");
  const mapRef = useRef(Map);
  const [center] = useState([-75.165, 39.952]);
  const [zoom] = useState(14);
  const [clickCoordinate, setClickCoordinate] = useState(null);
  const {updateCurrentCoordinates} = useCoordinateState()

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
        center: fromLonLat(center),
        zoom: zoom
      })
    });

    const handleMapClick = (event) => {
      const coordinate = event.coordinate;
      updateCurrentCoordinates(coordinate);
      setClickCoordinate(coordinate);
    };

    map.on('click', handleMapClick);

    return () => {
      map.setTarget(undefined);
    };
  }, [center, zoom]);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
      {clickCoordinate && (
        <div>
          Clicked Coordinate: {clickCoordinate[0]}, {clickCoordinate[1]}
        </div>
      )}
    </div>
  );
};

export default MyMap;