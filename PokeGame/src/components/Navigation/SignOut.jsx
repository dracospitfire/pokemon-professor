import { useControls, button } from "leva";
import { useNavigate } from "react-router-dom";

export const SignOutControls = () => {
  const navigate = useNavigate();

  useControls("Exit", {
    "Main Menu": button(() => {
      navigate("/welcome");
    }),
    "Sign Out": button(() => {
      navigate("/login");
    }),
    AutoSave: {
      options: ["On", "Off"],
      value: "On",
    },
  });

  return null;
};

export default SignOutControls;