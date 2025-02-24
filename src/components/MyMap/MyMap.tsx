import { useRef, useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {fromLonLat, toLonLat} from 'ol/proj';
import 'ol/ol.css';
import {useCoordinatesStore} from "../../CoordinatesStore.tsx";
import {Point} from "ol/geom";
import {Feature, MapBrowserEvent} from "ol";
import {Icon, Style} from "ol/style";

const MyMap = () => {
  const mapRef = useRef();
  const [center] = useState(fromLonLat([-75.1652, 39.9526]));
  const [zoom] = useState(14);
  const {updateCoordinates} = useCoordinatesStore();

  const [iconFeatures, setIconFeatures] = useState<Feature<Point>[]>([]);


  useEffect(() => {
    const iconLonLat = [-75.1652, 39.9526];
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat(iconLonLat)),
      name: 'Philadelphia',
      population: 4000,
      rainfall: 500,
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'src/assets/green_dot.png',
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),

        new VectorLayer({
          source: vectorSource,
        })
      ],
      view: new View({
        center: center,
        zoom: zoom
      })
    });

    const handleMapClick = (event: MapBrowserEvent<UIEvent>) => {
      const coordinate: number[] = event.coordinate

      // Add an icon where it's clicked
      const iconFeature = new Feature({
        geometry: new Point(coordinate),
        name: 'Philadelphia',
        population: 4000,
        rainfall: 500,
      });
      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'src/assets/green_dot.png',
        }),
      });
      iconFeature.setStyle(iconStyle);
      setIconFeatures([iconFeature])

      updateCoordinates(toLonLat(coordinate));
    };

    map.on('click', handleMapClick);

    // Rerender when we add a new icon to the map (on Clicks)
    const newVectorSource = new VectorSource({
      features: iconFeatures,
    });
    map.setLayers([
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: newVectorSource,
        })
      ],
    )

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

export default MyMap;