import React from "react";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="relative">
      <h1 className="md:text-3xl text-xl font-semibold underline-offset-2 underline">
        {title}
      </h1>
    </div>
  );
};

export default SectionTitle;
