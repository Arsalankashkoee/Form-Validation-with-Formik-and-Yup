import React from "react";

const RadioInput = ({ formik, name, radioOptions }) => {
  return (
    <div className="flex items-center gap-x-7">
      <div className=" flex items-center gap-2">
        {radioOptions.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <input
                type="radio"
                className="bg-blue-50 border-blue-100 text-blue-500 focus:ring-blue-200"
                name={name}
                id={item.value}
                value={item.value}
                onChange={formik.handleChange}
                checked={formik.values[name] === item.value}
              />
              <label className="cursor-pointer" htmlFor={item.value}>
                {item.label}
              </label>
            </React.Fragment>
          );
        })}
        {formik.errors[name] && formik.touched[name] && (
          <div className=" text-red-500 text-sm">{formik.errors[name]}</div>
        )}
      </div>
    </div>
  );
};

export default RadioInput;
