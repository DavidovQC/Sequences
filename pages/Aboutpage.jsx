import MyNav from "../assets/MyNav";
import "./page_styles/aboutpage.css";

function Aboutpage() {
    return (
        <>
            <MyNav></MyNav>
            <div className="about-page-contents-container">
                <div className="about-description-container">
                    <p>
                        This website is a tool for mathematicians and math
                        enthusiasts where you can apply algorithms (implemented
                        using the{" "}
                        <a href="https://www.r-project.org/">
                            R programming language
                        </a>
                        ) to find best fits of various kinds. Users can browse
                        the <a href="https://oeis.org/">OEIS</a> (Online
                        Encyclopedia of Integer Sequences) and can see best fit
                        lines, best fit quadratics, best exponential fits, and
                        so on. Upon launch, we have analyzed 50 out of the
                        385770(!) sequences available on the OEIS. We will
                        continue adding more fits and more sequences as time
                        progresses. Users will soon be able to upload their own
                        sequences and run an analysis on those. Our hope is that
                        easy analytics on various sequences will help drive
                        mathematical research (and recreation) forward. We also
                        plan on answering some interesting questions by
                        analyzing these sequences, these include, "what is the
                        average best fit line on sequences of general interest
                        to mathematicians?" where a sequence is of "general
                        interest" if it appears on the OEIS. Other questions,
                        such as "what is the average best fit quadratic?"
                        readily follow.
                    </p>

                    <p className="reach-out-text">
                        If you have any questions, please reach out via{" "}
                        <a href="https://www.linkedin.com/in/nathan-davidov-1b5b4b192/">
                            LinkedIn
                        </a>{" "}
                        or <a href="https://github.com/DavidovQC">Github</a>.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Aboutpage;
