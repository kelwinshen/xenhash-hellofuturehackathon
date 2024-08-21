import {
  Navbar,
  Hero,
  Volume,
  XenHash,
  CoinOption,
  HowtoUse,
  Partners,
  EarlyBirds,
  JourneyPlan,
  Copyright,
  
} from "../components";
import ShowVideo from "../components/ShowVideo";

const App = () => (
  <div>
    <section className="">
      <Navbar />
    </section>

    <section id="Hero" className="mx-4 sm:container sm:mx-auto ">
      <Hero />
    </section>

    <section id="Volume" className="mx-4 sm:container sm:mx-auto">
      <div>
        <Volume />
      </div>
    </section>

    <section
      id="XenHash"
      className="mx-4 pt-[250px] pb-[60px] sm:container sm:mx-auto lg:py-[200px]"
    >
      <XenHash />
    </section>

    <section id="CoinOption" className="mx-4 py-[52px] sm:container sm:mx-auto">
      <CoinOption />
    </section>

    <section
      id="SimplyfiedXenhash"
      className="mx-4 py-[52px] sm:container sm:mx-auto "
    >
      <HowtoUse />
    </section>

    <section id="Partner" className="mx-4 py-[100px] sm:container sm:mx-auto">
      <EarlyBirds />
    </section>

    <section id="Partner" className="mx-4 py-[200px] sm:container sm:mx-auto">
      <Partners />
    </section>
    <section
      id="JourneyPlan"
      className="mx-4 py-[200px] lg:container sm:mx-auto "
    >
      <JourneyPlan />
    </section>

    <section
      id="Video"
      className="mx-4 py-[200px] lg:container sm:mx-auto "
    >
      <ShowVideo />
    </section>

    <section className="mx-4 py-[60px] lg:container sm:mx-auto ">
      <Copyright />
    </section>
  </div>
);

export default App;
