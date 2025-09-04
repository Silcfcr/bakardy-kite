import { useState } from "react";
import { notification } from "antd";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, EmailTemplateParams } from '../../config/emailjs';

interface IValues {
  name: string;
  email: string;
  title: string;
  message: string;
}

const initialValues: IValues = {
  name: "",
  email: "",
  title: "",
  message: "",
};

export const useForm = (validate: { (values: IValues): IValues }) => {
  const [formState, setFormState] = useState<{
    values: IValues;
    errors: IValues;
  }>({
    values: { ...initialValues },
    errors: { ...initialValues },
  });

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = formState.values;
    const errors = validate(values);
    setFormState((prevState) => ({ ...prevState, errors }));

    try {
      if (Object.values(errors).every((error) => error === "")) {

        // Prepare email template parameters for your custom template
        const templateParams: EmailTemplateParams = {
          name: values.name,
          email: values.email,
          title: values.title,
          time: new Date().toLocaleString(),
          message: values.message
        };

        // Send email using EmailJS
        const response = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams,
          EMAILJS_CONFIG.publicKey
        );

        if (response.status === 200) {
          // Reset form on success
          event.target.reset();
          setFormState(() => ({
            values: { ...initialValues },
            errors: { ...initialValues },
          }));

          notification["success"]({
            message: "Success",
            description: "Your message has been sent to Bakar!",
          });
        } else {
          notification["error"]({
            message: "Error",
            description: "There was an error sending your message, please try again later.",
          });
        }
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      notification["error"]({
        message: "Error",
        description: "Failed to submit form. Please try again later.",
      });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values: formState.values,
    errors: formState.errors,
  };
};
