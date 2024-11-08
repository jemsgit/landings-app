import styles from "./Benefits.module.css";

interface Benefit {
  title: string;
  benefit: string;
}

interface BenefitsProps {
  benefits: Benefit[];
  title: string;
  className?: string;
}

function Benefits({ benefits, title, className = "" }: BenefitsProps) {
  return (
    <section className={`${styles.container} ${className}`}>
      <h2 className={styles.header}>{title}</h2>
      <div className={styles.benefits}>
        {benefits.map((item, index) => (
          <div key={index} className={styles.benefitItem} data-aos="zoom-in">
            <h2>{item.title}</h2>
            <p className="benefit">{item.benefit}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Benefits;
