import { useEffect } from "react";
import gsap from "gsap";

const About = () => {
  useEffect(() => {
    // Define animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".about-title", { opacity: 0, y: 50, duration: 0.6 })
      .from(".about-description", { opacity: 0, y: 50, duration: 0.6, stagger: 0.2 });

    // Clean up on unmount
    return () => tl.kill();
  }, []);

  return (
    <div className="min-h-[100vh]">
      <div className="py-20 px-4 max-w-6xl mx-auto">
        <h1 className="about-title text-3xl font-bold mb-4 text-slate-800">
          About Estate Ease
        </h1>
        <p className="about-description mb-4 text-slate-700 text-base sm:text-lg">
          Estate Ease is a leading real estate agency that specializes in
          helping clients buy, sell, and rent properties in the most desirable
          neighborhoods. Our team of experienced agents is dedicated to
          providing exceptional service and making the buying and selling
          process as smooth as possible.
        </p>
        <p className="about-description mb-4 text-slate-700 text-base sm:text-lg">
          Our mission is to help our clients achieve their real estate goals by
          providing expert advice, personalized service, and a deep
          understanding of the local market. Whether you are looking to buy,
          sell, or rent a property, we are here to help you every step of the
          way.
        </p>
        <p className="about-description mb-4 text-slate-700 text-base sm:text-lg">
          Our team of agents has a wealth of experience and knowledge in the
          real estate industry, and we are committed to providing the highest
          level of service to our clients. We believe that buying or selling a
          property should be an exciting and rewarding experience, and we are
          dedicated to making that a reality for each and every one of our
          clients.
        </p>
      </div>
    </div>
  );
}

export default About;
