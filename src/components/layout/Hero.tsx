import Image from 'next/image';
import Arrow from '../icons/Arrow';

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold">
            Everything <br /> is better <br /> with a
            <span className="text-primary"> Pizza</span>
          </h1>
          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            voluptatibus voluptas illo inventore provident?
          </p>
          <div className="flex gap-2">
            <button className="bg-primary uppercase flex gap-2 text-white px-8 py-2 rounded-full">
              Order now
              <Arrow />
            </button>
            <button className="font-bold uppercase">Learn more</button>
          </div>
        </div>
        <div className="relative">
          <Image
            src={
              'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D'
            }
            alt="pizza"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
