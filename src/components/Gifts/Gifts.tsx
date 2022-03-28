import styles from "./Gifts.module.css"

export const Gifts: React.FC = () => {
  return (
    <div id="gifts" className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>Gifts</h2>
        </div>

        <div className={styles.info}>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
            cumque quod quaerat atque maiores sapiente voluptatem assumenda?
            Earum modi, exercitationem id odit rerum dolorum! Modi beatae harum
            ut et consectetur!
          </p>

          <p>
            Lorem ipsum, <strong>dolor sit amet</strong> consectetur adipisicing
            elit. Quasi cumque quod quaerat atque maiores sapiente voluptatem
            assumenda? Earum modi, exercitationem id odit rerum dolorum! Modi
            beatae harum ut et consectetur!
          </p>
        </div>

        <div className={styles.footer}>
          <a
            href="https://www.google.com/maps/dir//Middleton+Lodge+Estate,+Kneeton+Ln,+Middleton+Tyas,+Richmond+DL10+6NJ/@54.4565315,-1.6610952,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x487e9fb0027c20cb:0xa31baf2d13a285e9!2m2!1d-1.6589012!2d54.4565315!3e0"
            target="_blank"
            rel="noreferrer"
            className={styles.cta}
          >
            Gift CTA
          </a>
        </div>
      </div>
    </div>
  )
}

export default Gifts
