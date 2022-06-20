import { useEffect } from "react"
import styles from "./Day.module.css"

export const Day: React.FC = () => {
  useEffect(() => {}, [])

  return (
    <div id="order" className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>Order of the day</h2>
          <div className={styles.subtitle}>
            <p>
              <strong>Please arrive by 12.30pm</strong>
            </p>
            <p>
              <strong>Dress code: Lounge suits</strong>
            </p>
          </div>
        </div>

        <ul className={styles.list}>
          <li>
            <h3>
              <span>
                We <em>do</em>
              </span>
              <span>1.30pm</span>
            </h3>
            <p>Please head to the Gin Terrace on arrival. </p>
            <p>
              Everyone will be shown to the ceremony space and seated at around
              1pm.
            </p>
          </li>

          <li>
            <h3>
              <span>
                We <em>drink</em>
              </span>
              <span>2.00pm</span>
            </h3>
            <p>
              We'll all have some fizz and nibbles and there'll be live music.
            </p>
            <p>
              Weather-permitting we'll enjoy the walled gardens. There are fire
              pits to keep everyone warm and plenty of space indoors if the
              weather isn't on our side!
            </p>
          </li>

          <li>
            <h3>
              <span>
                We <em>eat</em>
              </span>
              <span>3.30pm</span>
            </h3>
            <p>We'll take our seats to dine side-by-side in the Fig House.</p>
            <p>Speeches will take place between courses.</p>
          </li>

          <li>
            <h3>
              <span>
                We <em>dance</em>
              </span>
              <span>7.30pm</span>
            </h3>
            <p>After dinner, we'll hit the dancefloor!</p>
            <p>
              We've got an awesome band lined up, followed by tunes until
              midnight. <br />
              <em>
                <small>(Thank you Jonathan!)</small>
              </em>
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Map
