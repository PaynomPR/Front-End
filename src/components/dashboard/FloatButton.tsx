import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

type Props = {
  to: string;
};

const FloatButton = (props: Props) => {
  return (
    <Link
      to={props.to}
      className="fixed rounded-full p-4 px-5 bottom-20 right-12 z-10 bg-[#EED102]"
    >
      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
    </Link>
  );
};

export default FloatButton;
