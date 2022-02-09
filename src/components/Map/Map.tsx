import { useState, useEffect } from "react"
import { FeatureCollection } from "geojson"
import ReactMapboxGl, { GeoJSONLayer, Popup } from "react-mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

const Mapbox: any = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS!,
})

const geojson: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-1.6588797440500005, 54.456662454641595],
      },
      properties: {
        type: "venue",
        place: "Middleton Lodge Estate",
        id: "middleton",
        lat: -1.6588797440500005,
        lng: 54.456662454641595,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-1.6676150973478692, 54.44525027257386],
      },
      properties: {
        type: "hotel",
        place: "Travelodge",
        id: "travelodge",
        lat: -1.6676150973478692,
        lng: 54.44525027257386,
      },
    },
    {
      type: "Feature",
      properties: {
        type: "hotel",
        place: "Holiday Inn",
        id: "holiday-inn",
        lat: -1.6727498481617193,
        lng: 54.44318116310167,
      },
      geometry: {
        type: "Point",
        coordinates: [-1.6727498481617193, 54.44318116310167],
      },
    },
  ],
}

export const Map: React.FC = () => {
  const [latLng, setLatLng] = useState<number[]>([
    -1.6588797440500005, 54.456662454641595,
  ])
  const [zoom, setZoom] = useState<number[]>([12])
  const [currentHotel, setCurrentHotel] = useState<any>()

  const handleCircleClick = (event: any) => {
    setLatLng([
      event.features[0].properties.lat,
      event.features[0].properties.lng,
    ])

    setCurrentHotel({
      place: event.features[0].properties.place,
      id: event.features[0].properties.id,
      lat: event.features[0].properties.lat,
      lng: event.features[0].properties.lng,
    })
  }

  const handleLinkClick = (info: any) => {
    setLatLng([info.lat, info.lng])

    setCurrentHotel({
      place: info.place,
      id: info.id,
      lat: info.lat,
      lng: info.lng,
    })
  }

  useEffect(() => {
    setCurrentHotel({
      place: "Middleton Lodge Estate",
      id: "middleton",
      lat: -1.6588797440500005,
      lng: 54.456662454641595,
    })
  }, [])

  return (
    <div>
      <a
        href="https://www.google.com/maps/dir//Middleton+Lodge+Estate,+Kneeton+Ln,+Middleton+Tyas,+Richmond+DL10+6NJ/@54.4565315,-1.6610952,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x487e9fb0027c20cb:0xa31baf2d13a285e9!2m2!1d-1.6589012!2d54.4565315!3e0"
        target="_blank"
        rel="noopener noreferrer"
      >
        Driving directions
      </a>

      <Mapbox
        style="mapbox://styles/mapbox/streets-v8" // eslint-disable-line react/style-prop-object
        zoom={zoom}
        pitch={[50]}
        center={latLng}
        containerStyle={{
          height: "500px",
          width: "500px",
        }}
        flyToOptions={{
          speed: 0.5,
        }}
        onZoomEnd={(event: any) => {
          setZoom([event.style.z])
        }}
      >
        <GeoJSONLayer
          data={geojson}
          circlePaint={{
            "circle-color": [
              "match",
              ["get", "type"],
              "hotel",
              "#fbb03b",
              "venue",
              "pink",
              /* other */ "#ccc",
            ],
            "circle-radius": [
              "match",
              ["get", "type"],
              "hotel",
              8,
              "venue",
              12,
              /* other */ 8,
            ],
            "circle-stroke-color": "white",
            "circle-stroke-width": 3,
            "circle-opacity": 0.8,
          }}
          circleOnClick={handleCircleClick}
        />

        {currentHotel && (
          <Popup coordinates={[currentHotel.lat, currentHotel.lng]}>
            {currentHotel.place}
          </Popup>
        )}
      </Mapbox>

      <ul>
        {geojson.features.map((feature) => {
          if (!feature.properties) return false

          return (
            <li
              onClick={() => handleLinkClick(feature.properties)}
              key={feature.properties.id}
            >
              {feature.properties.place}
              {currentHotel &&
                currentHotel.id === feature.properties.id &&
                " selected!"}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Map
