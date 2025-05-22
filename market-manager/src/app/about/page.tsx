'use client';

import Header from '../header/Header';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className={styles.container}>
        {/* 🔰 About Section */}
        <section className={styles.section}>
          <h1 className={styles.heading}>
            About <span className={styles.headingHighlight}>ThymeCrate</span>
          </h1>
          <p className={styles.message}>
            At ThymeCrate, we believe that fresh, local produce should be easily accessible and affordable. 
            Our mission is to connect communities with seasonal fruits and vegetables through a seamless online experience.
          </p>
          <p className={styles.message}>
            Whether you are shopping for your family or stocking up for a culinary adventure, 
            our curated selections and easy-to-use platform are here to make grocery shopping more enjoyable.
          </p>
          <p className={styles.message}>
            Thank you for supporting local farms and sustainable food practices.
          </p>
        </section>

        {/* 👨‍👩‍👧 Meet the Family Section */}
        <section className={styles.section}>
          <h2 className={styles.heading}>Meet the <span className={styles.headingHighlight}>Magic Makers</span></h2>

          <div className={styles.familyWrapper}>
            <div className={styles.familyGrid}>

              <div className={`${styles.familyMember} ${styles.highlightRasheed}`}>
                <img src="/images/Rasheed.jpeg" alt="Dad" className={styles.familyPhoto} />
                <h3 className={styles.memberName}>Rasheed Miller</h3>
                <p className={styles.memberRoleRasheed}>Scrum Master</p>
                
                <p className={styles.memberRoleFrontend}>Frontend Developer</p>
                <p className={styles.memberDescription}>
                  I’m Rasheed — Scrum Master and Frontend Developer at ThymeCrate, passionate about clean UI and leading agile teams to deliver user-friendly experiences.
                </p>
              </div>

              <div className={`${styles.familyMember} ${styles.highlightFrontend}`}>
                <img src="/images/Nana.jpg" alt="Dad" className={styles.familyPhoto} />
                <h3 className={styles.memberName}>Nana</h3>
                <p className={styles.memberRoleFrontend}>Frontend Developer</p>
                <p className={styles.memberDescription}>
                  Greetings, I’m A’nanatawa — a Frontend developer at ThymeCrate. I specialize in crafting intuitive user interfaces, visual branding, and responsive layouts.
                </p>
              </div>

              <div className={`${styles.familyMember} ${styles.highlightBackend}`}>
                <img src="/images/Mercedes.jpg" alt="Mom" className={styles.familyPhoto} />
                <h3 className={styles.memberName}>Mercedes Mathews</h3>
                <p className={styles.memberRoleBackend}>Backend Developer</p>
                <p className={styles.memberDescription}>
                Mercedes is a backend developer at ThymeCrate, where she built the server-side logic and integrated Firebase to manage customer data, reservations, and product inventory.
                </p>
              </div>

              <div className={`${styles.familyMember} ${styles.highlightBackend}`}>
                <img src="/images/Jason.jpg" alt="Dad" className={styles.familyPhoto} />
                <h3 className={styles.memberName}>Jason Watson</h3>
                <p className={styles.memberRoleBackend}>Backend Developer</p>
                <p className={styles.memberDescription}>
                  Hi, I’m JSON — a backend developer at ThymeCrate. I specialize in building robust APIs and scalable server-side systems that keep our platform fast, secure, and reliable.
                </p>
              </div>

              <div className={`${styles.familyMember} ${styles.highlightBackend}`}>
                <img src="/images/JBEY.jpg" alt="Daughter" className={styles.familyPhoto} />
                <h3 className={styles.memberName}>John Bey</h3>
                <p className={styles.memberRoleBackend}>Backend Developer</p>
                <ul className={styles.memberDescription}>
                  <li>Professional gamer.</li>
                  <li>Professional loner.</li>
                  <li>Professionally fatigued.</li>
                  <li>Professionally lazy.</li>
                  <li>Professional soon-to-be-Software Engineer</li>
                </ul>
              </div>


            </div>
          </div>
        </section>
      </main>
    </>
  );
}
