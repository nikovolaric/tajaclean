import ContactForm from "./ContactForm";
import { H2 } from "./Text";

function Contact() {
  return (
    <div
      className="grid gap-10 md:mx-auto md:w-3/4 lg:w-2/3 xl:w-1/2"
      id="contact"
    >
      <H2 className="md:text-center">Kontaktirajte nas za dodatne odgovore.</H2>
      <ContactForm />
    </div>
  );
}

export default Contact;
