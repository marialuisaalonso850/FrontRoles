import DefaultLayout from "../layout/DefaultLayout";
import emailjs from '@emailjs/browser';
import React, { useRef } from "react";
import '../assets/Contac.css'


const ContactUs = () => {
  const refForm = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const serviceId = "service_ghhs3xh";
    const templateId = "template_qjyqutf";
    const apiKey = "y8ZnVdPiGF3qDQgh5";

    emailjs.sendForm(serviceId, templateId,refForm.current, apiKey)
      .then(result => console.log(result.text))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <DefaultLayout>
        <form ref={refForm} onSubmit={handleSubmit} className="formulario">
          <div>
            <h2>Envio peticiones o reclamos a parkingLocation</h2>
            <p>Llenar formulario completo</p>
          </div>
          <fieldset className="field-name">
            <label htmlFor="username" className="symbol-required name">Name</label>
            <input name="username" type="text" placeholder="ej: Maria Luisa" required />
          </fieldset>
          <fieldset className="field-email">
            <label htmlFor="email" className="symbol-required">Email</label>
            <input type="email" placeholder="ej marialuisaalonso850@gmail.com" name="email" required />
          </fieldset>
          <fieldset className="field-message">
            <label className="symbol-required">Mensaje</label>
            <textarea maxLength={500} placeholder="Escribe tu mensaje" name="message" id="" cols={30} rows={10}></textarea>
          </fieldset>
          <button className="btn-send" type="submit">Enviar</button>
        </form>
      </DefaultLayout>
    </div>
  );
};

export default ContactUs;
