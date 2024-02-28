import React from 'react';

const MenuItem = () => {
  return (
    <div className="bg-gray-300 p-4 space-y-4 rounded-lg text-center hover:bg-white transition-all duration-500 hover:shadow-black/50 hover:shadow-md cursor-pointer">
      <img
        // className=""
        src="https://img.freepik.com/premium-photo/pizza-isolate-white-background-generative-ai_74760-2619.jpg"
        alt="pizza"
      />
      <div className="space-y-3 px-3">
        <h4 className="font-semibold my-2 text-xl my-2">Pepporoni Pizza</h4>
        <p className="text-gray-500 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum earum
          enim accusamus impedit.
        </p>
        <button className="bg-primary text-white px-6 py-2 rounded-full">
          Add to cart $12
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
