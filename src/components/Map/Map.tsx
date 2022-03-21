import { useState, useEffect } from "react"
import classNames from "classnames"
import { FeatureCollection } from "geojson"
import ReactMapboxGl, { GeoJSONLayer, Popup } from "react-mapbox-gl"

import "mapbox-gl/dist/mapbox-gl.css"
import styles from "./Map.module.css"

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
        address: "Kneeton Ln, Middleton Tyas, Richmond DL10 6NJ",
        phone: "01325 377 977",
        website: "http://www.middletonlodge.co.uk/",
        directions:
          "https://www.google.com/maps/dir//Middleton+Lodge+Estate,+Kneeton+Ln,+Middleton+Tyas,+Richmond+DL10+6NJ/@54.4565315,-1.6610952,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x487e9fb0027c20cb:0xa31baf2d13a285e9!2m2!1d-1.6589012!2d54.4565315!3e0",
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
        address: "Middleton Tyas Ln, Richmond DL10 6PQ",
        phone: "0871 984 6176",
        website:
          "http://www.travelodge.co.uk/hotels/219/scotch-corner-a1-southbound-hotel?utm_source=google&utm_medium=maps&utm_campaign=Scotch%20Corner%20A1%20Southbound",
        id: "travelodge",
        directions:
          "https://www.google.com/maps/dir//Travelodge+Scotch+Corner+A1+Southbound,+Middleton+Tyas+Lane,+Richmond/@54.4497903,-1.6693564,15z/data=!4m9!4m8!1m0!1m5!1m1!1s0x487e9f9455de3697:0x4e7b7b96d17a73af!2m2!1d-1.6672812!2d54.4442867!3e0",
        lat: -1.6676150973478692,
        lng: 54.44525027257386,
        venueTravelDistance: "1.7mi",
        venueTravelTime: "5min",
      },
    },
    {
      type: "Feature",
      properties: {
        type: "hotel",
        place: "Holiday Inn",
        address: "Scotch Corner, Darlington, DL10 6NR",
        phone: "01748 850 900",
        website:
          "https://www.ihg.com/holidayinn/hotels/gb/en/darlington/xvgdl/hoteldetail",
        directions:
          "https://www.google.com/maps/dir//Holiday+Inn+Darlington+-+A1+Scotch+Corner,+an+IHG+Hotel,+Darlington+DL10+6NR/@54.4420213,-1.6742035,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x487e9feb31194bb5:0xe786f3f6cc930e5b!2m2!1d-1.6720148!2d54.4420213!3e0",
        id: "holiday-inn",
        lat: -1.6727498481617193,
        lng: 54.44318116310167,
        venueTravelDistance: "1.8mi",
        venueTravelTime: "5min",
      },
      geometry: {
        type: "Point",
        coordinates: [-1.6727498481617193, 54.44318116310167],
      },
    },
    {
      type: "Feature",
      properties: {
        type: "hotel",
        place: "The White Swan",
        address: "51 High St, Gilling West, Richmond, DL10 5JG",
        phone: "01748 825 122",
        website: "http://www.thewhiteswan.co/",
        directions:
          "https://www.google.com/maps/dir//The+White+Swan,+51+High+St,+Gilling+West,+Richmond+DL10+5JG/@54.4405986,-1.7547563,13z/data=!4m9!4m8!1m0!1m5!1m1!1s0x487c2015ad3c4e8f:0x3928066b77ae5245!2m2!1d-1.7197374!2d54.4405986!3e0",
        id: "the-white-swan",
        lat: -1.7192224182406095,
        lng: 54.44249530901062,
        venueTravelDistance: "4.4mi",
        venueTravelTime: "8min",
      },
      geometry: {
        type: "Point",
        coordinates: [-1.7192224182406095, 54.44249530901062],
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
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>Accommodation</h2>

          <p>
            Middleton Lodge Estate is a working hotel and offers limited
            accommodation on-site.
          </p>

          <p>
            There are plenty of hotels, bed &amp; breakfasts and self-catering
            options situated a short distance from the venue.
          </p>

          <p>
            The map below shows a selection of accommodation options, their
            distance to the venue as well as contact details.
          </p>
        </div>

        <div className={styles.structure}>
          <div className={styles.map}>
            <div className={styles.placeholderMap}>MAP GOES HERE</div>
            {/* <Mapbox
              style="mapbox://styles/mapbox/streets-v8" // eslint-disable-line react/style-prop-object
              zoom={zoom}
              pitch={[50]}
              center={latLng}
              containerStyle={{
                height: "500px",
                width: "100%",
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
                    "#83D6DE",
                    "venue",
                    "#F3D89F",
                    "#ccc",
                  ],
                  "circle-radius": [
                    "match",
                    ["get", "type"],
                    "hotel",
                    8,
                    "venue",
                    12,
                    8,
                  ],
                  "circle-stroke-color": "rgba(255, 255, 255, 0.25)",
                  "circle-stroke-width": 5,
                  "circle-opacity": 1,
                }}
                circleOnClick={handleCircleClick}
              />

              {currentHotel && (
                <Popup coordinates={[currentHotel.lat, currentHotel.lng]}>
                  {currentHotel.place}
                </Popup>
              )}
            </Mapbox> */}
          </div>

          <div className={styles.main}>
            <ul className={styles.accommodationList}>
              {geojson.features.map((feature) => {
                if (!feature.properties) return false
                return (
                  <li
                    className={classNames(styles.accommodationItem, {
                      [styles.accommodationItemSelected]:
                        currentHotel?.id === feature.properties.id,
                    })}
                    onClick={() => handleLinkClick(feature.properties)}
                    key={feature.properties.id}
                  >
                    <div className={styles.accommodationItemHeader}>
                      <h3 className={styles.accommodationItemName}>
                        <span>{feature.properties.place}</span>

                        <span className={styles.accommodationItemNameMore}>
                          More info
                        </span>
                      </h3>

                      {currentHotel?.id === feature.properties.id &&
                        feature.properties.venueTravelDistance &&
                        feature.properties.venueTravelTime && (
                          <ul>
                            {feature.properties.venueTravelDistance && (
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 16v-8h-24v8h24zm-22-6h2v2h1v-2h2v3h1v-3h2v2h1v-2h2v2h1v-2h2v3h1v-3h2v2h1v-2h2v4h-20v-4z" />
                                </svg>
                                {feature.properties.venueTravelDistance}
                              </li>
                            )}

                            {feature.properties.venueTravelTime && (
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M13 12l-.688-4h-.609l-.703 4c-.596.347-1 .984-1 1.723 0 1.104.896 2 2 2s2-.896 2-2c0-.739-.404-1.376-1-1.723zm-1-8c-5.522 0-10 4.477-10 10s4.478 10 10 10 10-4.477 10-10-4.478-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-2-19.819v-2.181h4v2.181c-1.438-.243-2.592-.238-4 0zm9.179 2.226l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.926-1.5-1.328zm-12.679 9.593c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zm12 0c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zm-6 6c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zm-4-2c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zm8 0c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zm-8-9c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5zm8 0c0 .276-.224.5-.5.5s-.5-.224-.5-.5.224-.5.5-.5.5.224.5.5z" />
                                </svg>
                                {feature.properties.venueTravelTime}
                              </li>
                            )}
                          </ul>
                        )}
                    </div>

                    {currentHotel?.id === feature.properties.id && (
                      <>
                        <div className={styles.accommodationItemMeta}>
                          <ul>
                            <li>{feature.properties.address}</li>

                            <li>
                              <a href={`tel:${feature.properties.phone}`}>
                                {feature.properties.phone}
                              </a>
                            </li>

                            <li>
                              <a
                                href={feature.properties.website}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Visit website
                              </a>
                            </li>

                            <li>
                              <a
                                href={feature.properties.directions}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.accommodationItemDirections}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path d="M502.61 233.32L278.68 9.39c-12.52-12.52-32.83-12.52-45.36 0L9.39 233.32c-12.52 12.53-12.52 32.83 0 45.36l223.93 223.93c12.52 12.53 32.83 12.53 45.36 0l223.93-223.93c12.52-12.53 12.52-32.83 0-45.36zm-100.98 12.56l-84.21 77.73c-5.12 4.73-13.43 1.1-13.43-5.88V264h-96v64c0 4.42-3.58 8-8 8h-32c-4.42 0-8-3.58-8-8v-80c0-17.67 14.33-32 32-32h112v-53.73c0-6.97 8.3-10.61 13.43-5.88l84.21 77.73c3.43 3.17 3.43 8.59 0 11.76z" />
                                </svg>
                                Directions
                              </a>
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.wrapper}>
            <p>There are also a number of Airbnbs available close by</p>

            <a
              href="https://www.airbnb.co.uk/s/Richmond--North-Yorkshire/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_dates%5B%5D=april&flexible_trip_dates%5B%5D=march&flexible_trip_lengths%5B%5D=weekend_trip&date_picker_type=calendar&query=Richmond%2C%20North%20Yorkshire&place_id=ChIJWTRFEDEUfEgRsBs5LsG7QNU&source=structured_search_input_header&search_type=user_map_move&ne_lat=54.539113466061345&ne_lng=-1.4345783341724143&sw_lat=54.309816318742584&sw_lng=-1.9042438615161643&zoom=11&search_by_map=true"
              target="_blank"
              rel="noreferrer"
              className={styles.airbnbButton}
            >
              <svg viewBox="0 0 56.7 56.7" xmlns="http://www.w3.org/2000/svg">
                <path d="M50.307 38.208c-.245-.588-.49-1.227-.736-1.766-.392-.883-.785-1.718-1.128-2.502l-.05-.05A512.167 512.167 0 0 0 37.55 11.714l-.147-.294a99.101 99.101 0 0 1-1.178-2.307c-.49-.883-.98-1.815-1.766-2.698-1.57-1.963-3.827-3.042-6.231-3.042-2.454 0-4.662 1.08-6.28 2.944-.737.883-1.277 1.815-1.767 2.698-.393.785-.785 1.57-1.178 2.306l-.147.295c-3.778 7.36-7.458 14.818-10.844 22.177l-.049.099c-.343.785-.736 1.619-1.128 2.502-.245.54-.49 1.128-.736 1.766-.638 1.816-.834 3.533-.59 5.3a10.428 10.428 0 0 0 6.38 8.144c1.275.54 2.6.785 3.974.785.393 0 .883-.049 1.276-.098 1.619-.196 3.287-.736 4.906-1.668 2.012-1.129 3.926-2.748 6.085-5.103 2.159 2.355 4.121 3.974 6.084 5.103 1.619.932 3.287 1.472 4.906 1.668.393.05.884.098 1.276.098 1.374 0 2.748-.245 3.975-.785 3.434-1.373 5.839-4.514 6.378-8.145.393-1.717.196-3.434-.442-5.25zM28.18 40.76c-2.65-3.337-4.367-6.477-4.956-9.126-.245-1.129-.295-2.11-.147-2.993a4.758 4.758 0 0 1 .785-2.061c.932-1.325 2.502-2.159 4.318-2.159 1.815 0 3.434.785 4.317 2.159.393.589.688 1.276.786 2.06.147.884.098 1.914-.147 2.994-.59 2.6-2.307 5.74-4.956 9.126zm19.577 2.306c-.344 2.551-2.06 4.76-4.465 5.74-1.178.491-2.453.639-3.729.491-1.227-.147-2.453-.54-3.73-1.275-1.765-.982-3.532-2.503-5.593-4.76 3.24-3.974 5.202-7.605 5.937-10.843.344-1.521.393-2.895.246-4.171-.196-1.227-.638-2.355-1.325-3.336-1.521-2.208-4.072-3.484-6.918-3.484s-5.397 1.325-6.919 3.484c-.686.98-1.128 2.11-1.324 3.336a10.19 10.19 0 0 0 .245 4.17c.736 3.24 2.748 6.919 5.937 10.893-2.012 2.257-3.827 3.779-5.593 4.76-1.276.736-2.503 1.128-3.73 1.276a7.85 7.85 0 0 1-3.729-.491c-2.404-.982-4.12-3.19-4.465-5.741-.147-1.227-.049-2.454.442-3.827.148-.49.393-.982.638-1.57.343-.785.736-1.62 1.128-2.454l.05-.098c3.385-7.31 7.016-14.769 10.794-22.03l.148-.295c.392-.736.784-1.52 1.177-2.257.392-.785.834-1.52 1.374-2.159 1.03-1.177 2.404-1.815 3.925-1.815s2.895.638 3.925 1.816c.54.637.982 1.373 1.374 2.158.393.736.785 1.521 1.178 2.258l.147.294a650.794 650.794 0 0 1 10.745 22.08v.048c.393.785.736 1.669 1.129 2.454.245.588.49 1.08.638 1.57.392 1.276.54 2.502.343 3.778z" />
              </svg>
              View map on Airbnb
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map
