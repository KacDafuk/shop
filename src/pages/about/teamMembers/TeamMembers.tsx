import React from "react";
import styles from "./teamMembers.module.css";
import { teamData } from "../../../assets/teamData/teamData";

const TeamMembers = () => {
  return (
    <article className={styles.membersContainer}>
      <h2 className={styles.articleHeader}>Meet our team</h2>
      <article className={styles.teamMembers}>
        {teamData.map(({ fullName, occupation, description, image }) => (
          <article className={styles.teamMemberInfo}>
            <section
              className={styles.teamMemberCard}
              style={{ backgroundImage: `url(${image})` }}
            >
              <footer className={styles.teamMemberLinks}>
                <i className="fa-brands fa-facebook fa-2x"></i>
                <i className="fa-brands fa-linkedin fa-2x"></i>
                <i className="fa-brands fa-twitter-square fa-2x"></i>
              </footer>
            </section>
            <section className={styles.teamMemberCardDescription}>
              <h3 className={styles.teamMemberName}>{fullName}</h3>
              <h4 className={styles.teamMemberOccupation}>{occupation}</h4>
              <p>{description}</p>
            </section>
          </article>
        ))}
      </article>
    </article>
  );
};

export default TeamMembers;
