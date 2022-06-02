//try animating slide changes
import React, { useEffect, useState, useRef } from "react";
import styles from "./about.module.css";
import AboutFashion from "./aboutFashion/AboutFashion";
import TeamMembers from "./teamMembers/TeamMembers";
const About = () => {
  return (
    <main className={styles.contentContainer}>
      <AboutFashion />
      <TeamMembers />
    </main>
  );
};

export default About;
