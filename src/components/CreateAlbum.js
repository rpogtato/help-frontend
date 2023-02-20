import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import { useAddAlbumMutation } from "../store";
// import { useDispatch } from "react-redux";
// import { addUser } from "../store/thunks/addUser";

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

export default function AlbumForm({ userId }) {
  const [addAlbum] = useAddAlbumMutation();

  async function handleAddAlbum(values, onSubmitProps) {
    addAlbum({ values, userId });
    onSubmitProps.resetForm();
  }

  return (
    <Formik
      onSubmit={handleAddAlbum}
      initialValues={{ title: "" }}
      validationSchema={Yup.object({
        title: Yup.string().required("Required"),
      })}
    >
      <Form>
        <MyTextInput
          label="Title"
          name="title"
          type="text"
          placeholder="title"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
