import { Form, Formik, useField } from "formik";
import * as Yup from "yup";

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
  return (
    <>
      <Formik
        initialValues={{ firstName: "", lastName: "" }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
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
    </>
  );
}
