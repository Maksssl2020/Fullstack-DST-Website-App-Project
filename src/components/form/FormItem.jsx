import React from "react";

const FormItem = ({
  labelData,
  placeholderData,
  type = "text",
  containerStyling = "",
  inputStyling = "",
  onChangeAction = undefined,
}) => {
  return (
    <div
      className={"mt-3 w-[75%] gap-2 flex flex-col".concat(
        " " + containerStyling,
      )}
    >
      <p className="ml-3">{labelData}</p>
      <input
        type={type}
        placeholder={placeholderData}
        className={"w-full px-2 focus:outline-none placeholder:text-black h-[40px] rounded-xl border-2 border-black".concat(
          " " + inputStyling,
        )}
        onChange={onChangeAction}
      />
    </div>
  );
};

export default FormItem;
