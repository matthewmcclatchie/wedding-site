import styles from "./ContactForm.module.css"

export const ContactForm: React.FC = () => {
  return (
    <div id="contact" className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.emoji}>👍</div>
        <p>Thanks for visiting - We can't wait to see you!</p>
        <p>
          Have a question?{" "}
          <a href="mailto:mattandstephgetwed@gmail.com">Email us</a> or message
          on Whatsapp
        </p>
        <p>Steph + Matt xx</p>
      </div>
    </div>
  )
}

export default ContactForm
