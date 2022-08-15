const Input = ({ formik, label, name, type = "text" ,placeholder}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="cursor-pointer font-medium mt-4" htmlFor={name}>
        {label}
      </label>
      <input
        className=" py-1 px-3 rounded-lg shadow-lg border border-gray-200 focus:outline-none focus:border-none"
        type={type}
        id={name}
        placeholder={placeholder}
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        // value={formik.values.name}
        {...formik.getFieldProps(name)}
        name={name}
      />
      {formik.errors[name] && formik.touched[name] && (
        <div className=" text-red-500 text-sm">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default Input;
