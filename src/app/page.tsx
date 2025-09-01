import AboutSection from "@/Components/AboutSection";
import Booking from "@/Components/Booking/Booking";
import HeroSection from "@/Components/HeroSection";


export default function HomePage() {
  return (
    <div>
      <section id="#">
        <HeroSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>
      <section id="bookings">
        <Booking />
      </section>
    </div>
  ); 
}
