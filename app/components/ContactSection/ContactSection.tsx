import styles from "./ContactSection.module.css";

function ContactSection() {
  return (
    <footer className={styles.contactSection} data-aos="fade-right">
      <p>Есть вопросы или предложения?</p>

      <p>
        Напиши мне в Telegram - <a href="https://t.me/jem_jem">Jem Jem</a>
      </p>
    </footer>
  );
}

export default ContactSection;
