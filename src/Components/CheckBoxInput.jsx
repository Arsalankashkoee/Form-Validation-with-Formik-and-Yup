import React from "react";

const CheckBoxInput = ({ formik, name, checkBoxOptions }) => {
  return (
    <div className="flex items-center ">
      <div className=" flex items-center gap-2">
        {checkBoxOptions.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <input
                type="checkbox"
                className="rounded bg-blue-50 border-blue-100 text-blue-500 focus:ring-blue-200"
                name={name}
                id={item.value}
                value={item.value}
                onChange={formik.handleChange}
                checked={formik.values[name].includes(item.value)}
              />
              <label className="cursor-pointer mr-5" htmlFor={item.value}>
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

export default CheckBoxInput;
