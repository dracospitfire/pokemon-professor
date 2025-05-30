import { useControls, button } from "leva";
import { useNavigate } from "react-router-dom";

export const SignOutControls = () => {
  const navigate = useNavigate();

  useControls("Exit", {
    "Sign Out": button(() => {
      navigate("/");
    }),
    AutoSave: {
      options: ["On", "Off"],
      value: "On",
    },
  });

  return null;
};

export default SignOutControls;