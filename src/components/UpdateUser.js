import { Form, Formik, useField } from "formik";
import { useUpdateUserMutation } from "../store";

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

export default function UpdateForm({ userId }) {
  const [updateUser] = useUpdateUserMutation();

  async function handleUpdate(values, onSubmitProps) {
    updateUser({ userId, values });
    onSubmitProps.resetForm();
  }

  return (
    <Formik
      onSubmit={handleUpdate}
      initialValues={{ firstName: "", lastName: "" }}
    >
      <Form>
        <MyTextInput name="firstName" type="text" placeholder="First Name" />

        <MyTextInput name="lastName" type="text" placeholder="Last Name" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
