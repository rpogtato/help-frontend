import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUser } from "../store/thunks/addUser";

function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

export default function RegisterForm() {
  const dispatch = useDispatch();

  async function handleRegister(values, onSubmitProps) {
    dispatch(addUser(values));
    onSubmitProps.resetForm();
  }

  return (
    <Formik
      onSubmit={handleRegister}
      initialValues={{ firstName: "", lastName: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
      })}
    >
      <Form>
        <MyTextInput
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Mr"
        />

        <MyTextInput
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Smith"
        />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
