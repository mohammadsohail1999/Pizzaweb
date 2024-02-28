import React from 'react';

const SectionHeaders = ({
  subHeader,
  mainHeader,
}: {
  subHeader: string;
  mainHeader: string;
}) => {
  return (
    <div className="text-center mb-4">
      <h3 className="uppercase text-gray-500 font-semibold leading-4">
        {subHeader}
      </h3>
      <h2 className="text-primary font-bold text-4xl italic mb-4">
        {mainHeader}
      </h2>
    </div>
  );
};

export default SectionHeaders;
