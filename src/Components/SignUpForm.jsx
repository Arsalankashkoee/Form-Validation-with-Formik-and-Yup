// import { useState } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Input from "./Input";
import RadioInput from "./RadioInput";
import SelectComponent from "./SelectComponent";
import CheckBoxInput from "./CheckBoxInput";
import axios from "axios";

// const savedData = {
//   name: "arsalan",
//   email: "arsalan@ex.com",
//   phoneNumber: "09125775473",
//   password: "arsalan@135",
//   passwordConfirm: "arsalan@135",
//   gender: "male",
// };

const checkBoxOptions = [
  { label: "React.js", value: "React.js" },
  { label: "Solidity", value: "Solidity" },
];

const radioOptions = [
  { label: "male", value: "male" },
  { label: "female", value: "female" },
];

const selectOptions = [
  { label: "select nationality ...", value: "" },
  { label: "Iran", value: "Ir" },
  { label: "Germany", value: "Ger" },
  { label: "Canada", value: "Canada" },
  { label: "Dubai", value: "Dubai" },
];

const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  passwordConfirm: "",
  gender: "",
  nationality: "",
  intrests: [], //checkBox => ["React.js","Solidity" , ...]
  terms: false,
};

const onSubmit = (values) => {
  // console.log(values);
  // console.log({ ...values, newData: "15 september 1998" });
  axios
    .post("http://localohost:3000/users", values)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is Required")
    .min(6, "Name length is not valid "),

  email: yup
    .string()
    .email("Invalid Email Format")
    .required("Email is Required"),

  phoneNumber: yup
    // .number()
    .string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{10}$/, "Invalid Phone Number")
    .nullable(),
  // .test("validPhoneNumber", "Invalid Phone Number", (value) =>
  //   /^[0-9]{10}$/.test(value)
  // ),

  password: yup
    .string()
    .required("Password is Required")
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),

  passwordConfirm: yup
    .string()
    .required("Password Confirmation is Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),

  gender: yup.string().required("Gender is Required"),

  nationality: yup.string().required("Select nationality ! "),

  intrests: yup.array().min(1).required("at least select one expertise "),

  terms: yup
    .boolean()
    .required("The terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted."),
});

const SignUpForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [formValues, setFormValues] = useState(null);
  const formik = useFormik({
    // 1
    initialValues: formValues || initialValues,
    // 2
    onSubmit,
    // 3

    // validate: (values) => {
    //   // console.log(values);
    //   let errors = {};
    //   if (!values.name) errors.name = "Name is Required";
    //   if (!values.email) errors.email = "Email is Required";
    //   if (!values.password) errors.password = "Password is Required";
    //   return errors;
    // },

    // 3(yup)
    validationSchema,
    validateOnMount: true, //disable form-button
    enableReinitialize: true, //set savedData
  });
  //   console.log(formik.values);
  // console.log(formik.errors);
  // console.log(formik.touched);

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center bg-white w-1/3 px-3 py-2 mt-5 rounded-lg shadow-lg border border-gray-300 "
        onSubmit={formik.handleSubmit}
      >
        <Input
          formik={formik}
          label="Name"
          name="name"
          placeholder="enter your name ..."
        />
        <Input
          formik={formik}
          label="Email"
          name="email"
          type="email"
          placeholder="enter your email ..."
        />
        <Input
          formik={formik}
          label="Phone Number"
          name="phoneNumber"
          type="number"
          placeholder="enter your phone number ..."
        />
        <Input
          formik={formik}
          label="Password"
          name="password"
          type="password"
          placeholder="enter your password ..."
        />
        <Input
          formik={formik}
          label="Password Confirmation"
          name="passwordConfirm"
          type="password"
          placeholder="enter your password confirmation ..."
        />
        <div className="flex flex-col gap-1 w-full mt-3">
          <label className="cursor-pointer font-medium mt-3" htmlFor="">
            Gender
          </label>

          <RadioInput
            formik={formik}
            radioOptions={radioOptions}
            name="gender"
          />
        </div>
        <div className="w-full mt-5  ">
          <SelectComponent
            formik={formik}
            selectOptions={selectOptions}
            name="nationality"
          />
        </div>
        <div className="w-full mt-5">
          <CheckBoxInput
            formik={formik}
            checkBoxOptions={checkBoxOptions}
            name="intrests"
          />
        </div>

        {/* terms and conditions site */}
        <div className="flex items-center justify-start w-full gap-2 mt-5">
          <input
            type="checkbox"
            className="bg-blue-50 border-blue-100 text-blue-500 focus:ring-blue-200 rounded"
            name="terms"
            id="terms"
            value={true}
            onChange={formik.handleChange}
            checked={formik.values.terms}
          />
          <label className="cursor-pointer mr-5" htmlFor="terms">
            Accept Terms and Conditions
          </label>
        </div>
        {formik.errors.terms && formik.touched.terms && (
          <div className=" text-red-500 text-sm">{formik.errors.terms}</div>
        )}

        {/* <button
          className="bg-violet-600 text-white w-full rounded-lg shadow-lg py-1 mt-9"
          type="submit"
          onClick={() => setFormValues(savedData)}
        >
          Load data
        </button> */}
        <button
          type="submit"
          className={
            formik.isValid
              ? "bg-blue-600 text-white w-full rounded-lg shadow-lg py-1 mt-9"
              : "bg-blue-600 text-white w-full rounded-lg shadow-lg py-1 mt-9 opacity-40"
          }
          disabled={!formik.isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;

// 1.managing state
// 2.handling form submission
// 3.validation - error massage
