import { Form, Formik, useField } from "formik";
import { useAddAlbumMutation } from "../store";

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
    <Formik onSubmit={handleAddAlbum} initialValues={{ title: "" }}>
      <Form>
        <MyTextInput
          label="add album"
          name="title"
          type="text"
          placeholder="Title"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
