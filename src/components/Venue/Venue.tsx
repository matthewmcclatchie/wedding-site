import { useEffect } from "react"
import styles from "./Venue.module.css"

export const Venue: React.FC = () => {
  useEffect(() => {}, [])

  return (
    <div id="venue" className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>Middleton Lodge Estate</h2>
          <p>
            Kneeton Lane, Middleton Tyas, Richmond, North Yorkshite, DL10 6NJ
          </p>
        </div>

        <div className={styles.imageBlock}>
          <div className={styles.imageLarge}>
            <img
              src="fig-house.jpg"
              alt="The Fig House"
              className={styles.venueImage}
            />
          </div>
          <div className={styles.imageSmall}>
            <img
              src="coach-house.jpg"
              alt="The Coach House"
              className={styles.venueImage}
            />
          </div>
        </div>

        <div className={styles.about}>
          <p>
            Middleton Lodge Estate sits in 200 acres of its very own 17th
            century parkland. Over the past seven years, the Georgian country
            retreat has been given a new lease of life, preserving its history
            and carefully restoring the original buildings into characterful,
            yet contemporary, spaces.
          </p>
          <p>
            It was the mix of old and new that we fell in love with when we came
            to visit last December, knowing straight away that it was the place
            we wanted to hold our wedding (not least because we'd have an excuse
            to return every year!)
          </p>
          <p>
            The Estate offers beautifully designed bedrooms, all-day dining at
            the Coach House, treatment rooms, a brand new spa (opening summer
            this year) as well as the opportunity to enjoy the surrounding
            landscape and beautiful Yorkshite countryside.
          </p>
          <p>We hope you love it as much as we do!</p>
        </div>

        <div className={styles.footer}>
          <a
            href="https://www.google.com/maps/dir//Middleton+Lodge+Estate,+Kneeton+Ln,+Middleton+Tyas,+Richmond+DL10+6NJ/@54.4565315,-1.6610952,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x487e9fb0027c20cb:0xa31baf2d13a285e9!2m2!1d-1.6589012!2d54.4565315!3e0"
            target="_blank"
            rel="noreferrer"
            className={styles.venueDirections}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M502.61 233.32L278.68 9.39c-12.52-12.52-32.83-12.52-45.36 0L9.39 233.32c-12.52 12.53-12.52 32.83 0 45.36l223.93 223.93c12.52 12.53 32.83 12.53 45.36 0l223.93-223.93c12.52-12.53 12.52-32.83 0-45.36zm-100.98 12.56l-84.21 77.73c-5.12 4.73-13.43 1.1-13.43-5.88V264h-96v64c0 4.42-3.58 8-8 8h-32c-4.42 0-8-3.58-8-8v-80c0-17.67 14.33-32 32-32h112v-53.73c0-6.97 8.3-10.61 13.43-5.88l84.21 77.73c3.43 3.17 3.43 8.59 0 11.76z" />
            </svg>
            Get directions
          </a>
        </div>
      </div>
    </div>
  )
}

export default Map
