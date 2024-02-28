import Header from './Header';
import Hero from './Hero';
import HomeMenu from './HomeMenu';
import SectionHeaders from './SectionHeaders';

const Layout = () => {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-14">
        <SectionHeaders subHeader="Our story" mainHeader="About us" />
        <div className="text-gray-500 max-w-2xl mx-auto space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
            necessitatibus natus consequatur sequi in adipisci minus sit tempore
            blanditiis nisi deserunt praesentium dolores hic nulla eos id,
            numquam et. Eos!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
            necessitatibus natus consequatur sequi in adipisci minus sit tempore
            blanditiis nisi deserunt praesentium dolores hic nulla eos id,
            numquam et. Eos!
          </p>
        </div>
      </section>
      <section>
        <SectionHeaders subHeader={"Don't hesitate"} mainHeader="Contact us" />
        <div className="mt-8 text-center">
          <a href="tel:+12345667" className="text-4xl underline text-gray-500">
            +12312321312
          </a>
        </div>
      </section>

     
    </>
  );
};

export default Layout;
