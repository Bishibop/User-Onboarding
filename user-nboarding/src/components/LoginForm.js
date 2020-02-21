import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function LoginForm({ values, errors, touched }) {
  return (
    <Form>
      <div>
        {touched.name && errors.name && <p>{errors.name}</p>}
      </div>
      <Field type="text" name="name" placeholder="Name" />
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
      </div>
      <Field type="text" name="email" placeholder="johndoe@email.com" />
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
      </div>
      <Field type="password" name="password" placeholder="Password" />
      <div>
        {touched.role && errors.role && <p>{errors.role}</p>}
      </div>
      <Field component="select" name="role">
        <option value="">What is your role?</option>
        <option value="frontend">Frontend Developer</option>
        <option value="backend">Backend Developer</option>
        <option value="CTO">Chief Technology Officer</option>
        <option value="monkey">Code Monkey</option>
      </Field>
      <div>
        {touched.tos && errors.tos && <p>{errors.tos}</p>}
      </div>
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept TOS
      </label>
      <br />
      <button>Submit</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues: ({ name, email, password, role, tos }) => {
    return {
      name: name || "",
      email: email || "",
      role: role || "",
      password: password || "",
      tos: tos || false 
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Your name is required")
      .min(4, "Name must be at least 4 characters"),
    email: Yup.string()
      .required("Your email address is required")
      .email("Email must have a valid format")
      .notOneOf(["waffle@syrup.com"], "That email is already taken"),
    password: Yup.string()
      .required("A password is required")
      .min(10, "Password must be at least 10 characters long"),
    role: Yup.string()
      .required("A role is required"),
    tos: Yup.boolean()
      .equals([true], "YOU MUST ACCEPT")
  }),

  handleSubmit: (values, bag) => {
    axios.post('https://reqres.in/api/users', values).then(response => {
      bag.props.appendToUsers(response.data);
      bag.resetForm();
      console.log(response);
    });
  }

})(LoginForm);

export default FormikLoginForm
