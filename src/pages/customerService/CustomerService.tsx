import { questions } from "../../assets/questions/customerServiceQuestions";
import styles from "./customerService.module.css";
import { useCustomerService } from "./useCustomerService";
const CustomerService = () => {
  const {
    buttonsContainer,
    currentQuestions,
    setActiveQuestionIdx,
    changeQuestions,
    getCorrectAccordionIcon,
    getTextDisplayClass,
  } = useCustomerService();

  return (
    <main className={styles.questionsContainer}>
      <section ref={buttonsContainer} className={styles.questionButtons}>
        <button data-question={"delivery"} onClick={changeQuestions}>
          Shipping and delivery
        </button>
        <button data-question={"payment"} onClick={changeQuestions}>
          Payments
        </button>
        <button data-question={"refund"} onClick={changeQuestions}>
          Refund
        </button>
      </section>
      <dl className={styles.questionsAccordion}>
        {questions[currentQuestions].map((question, idx) => (
          <>
            <dt
              className={styles.questionTitle}
              onClick={() => setActiveQuestionIdx(idx)}
            >
              {question.title}
              <i className={getCorrectAccordionIcon(idx)}></i>
            </dt>
            <dd className={styles.accordionTextOuter}>
              <p
                className={`${styles.accordionText} ${getTextDisplayClass(
                  idx
                )}`}
              >
                {question.text}
              </p>
            </dd>
          </>
        ))}
      </dl>
      <article className={styles.contactInfoContainer}>
        <ul className={styles.contactInfo}>
          <li>
            <h3 className={styles.contactInfoHeader}>
              Call us
              <i className="fa-solid fa-phone"></i>
            </h3>
            999-888-777
          </li>
          <li>
            <h3 className={styles.contactInfoHeader}>
              Email us <i className="fa-solid fa-envelope"></i>
            </h3>
            fashionWorld@op.com
          </li>
        </ul>
      </article>
    </main>
  );
};

export default CustomerService;
