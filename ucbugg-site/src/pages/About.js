import React, { forwardRef } from "react";
import styles from "../styles/About.module.css";
import data from "./TatoeImgImports.js";
import historyImg from "../assets/aboutPage/melchananime.png";
import BottomBanner from "../assets/homePageIcon/stupidbottombannerhillsblahugh.svg";
import headTatoeTag from "../assets/aboutPage/UCBUGG_Head_Tatoe_Tag.png";
import seniorTatoeTag from "../assets/aboutPage/UCBUGG_Senior_Tag.png";

const About = forwardRef((props, ref) => {
  return (
    <div style={{ position: "relative" }}>
      <section id={styles.projectSection}>
        <div>
          <h1>UCBUGG Promo Video</h1>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/csZw414K3RE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </section>
      <section id={styles.historySection}>
        <div id={styles.historyBlurb}>
          <h1>A Brief History of UCBUGG</h1>
          <div>
            <div
              style={{ display: "flex", flexDirection: "column" }}
              id={styles.historyContent}
            >
              <p>
                The University of California, Berkeley Undergraduate Graphics
                Group was first started in Fall of 2001 through a growing
                interest of teaching students about 3D graphics as well as 3D
                short film animations. Along with the rise of Pixar's animated
                films students were not only able to learn about animating, they
                could also learn how to create shorts of their own through the
                use of Pixar's principles of animation. Starting from 2001,
                Professor Dan Garcia taught many different students up until
                2005 when the class transitioned to being run by students,
                ultimately becoming a DeCal that is run every semester here at
                Berkeley!
              </p>
              <p>
                With the success of UCBUGG, we were able to create another class
                meant for more advanced techniques in 3D Modeling and Animation
                called CNM 190, however to budget cuts we were unable to
                maintain the class.
              </p>
              <p>
                Our DeCal has been running for over 20+ years now, being one of
                the oldest DeCals here at Berkeley. Through our class many
                students have been able to compete with other aspiring students
                in industry, receiving jobs in studios such as Pixar, Blizzard,
                Disney, and many more!
              </p>
              <p>
                Today at UCBUGG, student facilitators continue to carry on
                teaching students at Berkeley about 3D Modeling and Animation
                welcoming everyone regardless of their current experience, by
                the end of the semester we not only ensure that you have learned
                the skills to make a short, but that you have created a short of
                your own.
              </p>
            </div>

            <img src={historyImg} alt="Mel-chan doing a cool pose" />
          </div>
        </div>
      </section>
      <section id={styles.staffSection}>
        <h1>Current Facilitators</h1>
        <div className={styles.staffGrid}>
          {data.head_tatoes.map((e, i) => {
            return (
              <div key={i}>
                <div style={{ position: "relative" }}>
                  <img src={e.img} alt={"Staff:" + e.name} />
                  {e.name.match(/Senior/g) ? (
                    <>
                      <h3>{e.name.match(/\S+/g).slice(0, -1).join(" ")}</h3>
                      <img
                        src={seniorTatoeTag}
                        style={{
                          position: "absolute",
                          transform: "scale(1.3)",
                        }}
                        alt="Sakura petals to signify Senior or higher facilitator"
                      />
                      <div
                        className={styles.seniorInfoBox}
                        style={{
                          height: "100%",
                          width: "100%",
                          position: "absolute",
                        }}
                      ></div>
                    </>
                  ) : (
                    <h3>{e.name}</h3>
                  )}
                  <img
                    src={headTatoeTag}
                    style={{
                      position: "absolute",
                      transform: "scale(1.3)",
                    }}
                    alt="Fox sticker to signify head facilitator"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.staffGrid}>
          {data.normal_tatoes.map((e, i) => {
            return (
              <div key={i}>
                <div style={{ position: "relative" }}>
                  <img src={e.img} alt={"Staff:" + e.name} />
                  {e.name.match(/Senior/g) ? (
                    <>
                      <h3>{e.name.match(/\S+/g).slice(0, -1).join(" ")}</h3>
                      <img
                        src={seniorTatoeTag}
                        style={{
                          position: "absolute",
                          transform: "scale(1.3)",
                        }}
                        alt="Sakura petals to signify Senior or higher facilitator"
                      />
                      <div
                        className={styles.seniorInfoBox}
                        style={{
                          height: "100%",
                          width: "100%",
                          position: "absolute",
                        }}
                      ></div>
                    </>
                  ) : (
                    <h3>{e.name}</h3>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section id={styles.pastFacilitatorsSection}>
        <h1 style={{ zIndex: 1, height: "fit-content" }}>Past Facilitators</h1>
        {/* <div ref={pastFacilitatorsView} className={appStyles.view} /> */}
        <div className={`${styles.staffGrid} ${styles.pastStaffGrid}`}>
          {data.past_tatoes.map((e, i) => {
            return (
              <div key={i}>
                <div>
                  <img src={e.img} alt={"Past Staff:" + e.name} />
                  {e.name.match(/Senior/g) ? (
                    <h3>{e.name.match(/\S+/g).slice(0, -1).join(" ")}</h3>
                  ) : (
                    <h3>{e.name}</h3>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <img
        src={BottomBanner}
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
        }}
        alt="Cool graphic"
      />
    </div>
  );
});

export default About;
