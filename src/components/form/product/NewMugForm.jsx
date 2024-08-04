import React, { useEffect, useState } from "react";
import FormItem from "../FormItem";

const NewMugForm = ({ formData }) => {
  const [color, setColor] = useState("");
  const [height, setHeight] = useState("");
  const [material, setMaterial] = useState("");

  useEffect(() => {
    formData.append("color", color);
    formData.append("height", height);
    formData.append("material", material);
  }, [formData]);

  const formDataStructure = [
    {
      title: "Wpisz kolor:",
      function: setColor,
    },
    {
      title: "Wpisz wysokość:",
      function: setHeight,
    },
    {
      title: "Wpisz materiał:",
      function: setMaterial,
    },
  ];

  console.log(color);

  return (
    <>
      {formDataStructure.map((data, index) => (
        <FormItem
          key={index}
          labelData={data.title}
          type={"text"}
          onChangeAction={(e) => data.function(e.target.value)}
          inputStyling={
            "w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-lg h-[50px] font-medium border-4 rounded-2xl border-black resize-none"
          }
          containerStyling={"font-bold text-xl"}
        />
      ))}
    </>
  );
};

export default NewMugForm;
