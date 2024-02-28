import MenuItem from '../menu/MenuItem';
import SectionHeaders from './SectionHeaders';

const HomeMenu = () => {
  return (
    <section className="text-center mt-5">
      <SectionHeaders subHeader="Check out" mainHeader="Menu" />

      <div className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
};

export default HomeMenu;
