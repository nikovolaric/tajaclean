import { H2 } from "../Text";
import VariantsSlides from "./VariantsSlides";

function Variants() {
  return (
    <div className="grid gap-10 md:hidden">
      <H2>Izbirajte med paketi in prihranite.</H2>
      <VariantsSlides />
    </div>
  );
}

export default Variants;
