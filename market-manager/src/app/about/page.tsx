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
            Whether youre shopping for your family or stocking up for a culinary adventure, 
            our curated selections and easy-to-use platform are here to make grocery shopping more enjoyable.
          </p>
          <p className={styles.message}>
            Thank you for supporting local farms and sustainable food practices.
          </p>
        </section>

        {/* 👨‍👩‍👧 Meet the Family Section */}
        <section className={styles.section}>
          <h2 className={styles.heading}>Meet the <span className={styles.headingHighlight}>Family</span></h2>

          <div className={styles.familyWrapper}>
            <div className={styles.familyGrid}>
              <div className={styles.familyMember}>
                <img src="/images/mom.jpg" alt="Mom" className={styles.familyPhoto} />
                <h3 className={styles.memberName}>Mercedes Matthews</h3>
                <p className={styles.memberDescription}>
                  The heart of ThymeCrate. Maria handles sourcing and packaging with care. Her knowledge of local produce keeps our selection fresh and vibrant.
                </p>
              </div>

              <div className={styles.familyMember}>
                <img src="/images/dad.jpg" alt="Dad" className={styles.familyPhoto} />
                <h3 className={styles.memberName}>Rasheed Miller</h3>
                <p className={styles.memberDescription}>
                  Logistics wizard. George ensures every crate arrives on time and intact. He’s the wheels and willpower of the team.
                </p>
              </div>

              <div className={styles.familyMember}>
                <img src="/images/daughter.jpg" alt="Daughter" className={styles.familyPhoto} />
                <h3 className={styles.memberName}>John Bey</h3>
                <ul className={styles.professionalList}>
                  <li>Professional gamer.</li>
                  <li>Professional loner.</li>
                  <li>Professionally fatigued.</li>
                  <li>Professionally lazy.</li>
                  <li>Professional soon-to-be-Software Engineer 😉</li>
                </ul>
              </div>

              <div className={styles.familyMember}>
                <img src="/images/dad.jpg" alt="Dad" className={styles.familyPhoto} />
                <h3 className={styles.memberName}>Jason Watson</h3>
                <p className={styles.memberDescription}>
                  Logistics wizard. George ensures every crate arrives on time and intact. He’s the wheels and willpower of the team.
                </p>
              </div>

              <div className={styles.familyMember}>
                <img src="/images/apple.jpg" alt="Dad" className={styles.familyPhoto} />
                <h3 className={styles.memberName}>Nana</h3>
                <p className={styles.memberDescription}>
                  Logistics wizard. George ensures every crate arrives on time and intact. He’s the wheels and willpower of the team.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
