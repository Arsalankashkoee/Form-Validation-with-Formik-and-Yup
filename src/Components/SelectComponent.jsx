const SelectComponent = ({ selectOptions, name, formik }) => {
  return (
    <div>
      <select
        className="w-full border border-gray-200 rounded-md p-1 focus:border-violet-600 focus:outline-none text-slate-600 shadow-lg"
        name={name}
        {...formik.getFieldProps(name)}
      >
        {selectOptions.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <div className=" text-red-500 text-sm">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default SelectComponent;
