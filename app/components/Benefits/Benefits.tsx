import styles from "./Benefits.module.css";

interface Benefit {
  title: string;
  benefit: string;
  description: string;
}

interface BenefitsProps {
  benefits: Benefit[];
}

function Benefits({ benefits }: BenefitsProps) {
  return (
    <section className={styles.benefits}>
      {benefits.map((item, index) => (
        <div key={index} className={styles.benefitItem}>
          <h2>{item.title}</h2>
          <p className="benefit">{item.benefit}</p>
          <p className="description">{item.description}</p>
        </div>
      ))}
    </section>
  );
}

export default Benefits;
