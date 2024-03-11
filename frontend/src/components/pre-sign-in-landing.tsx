// import { useStore } from "@/lib/store";
// import { LogoutDialog } from "./logout-dialog";
// import { RegisterDialog } from "./register-dialog";
// import { LoginDialog } from "./login-dialog";
// import HomeButton from "./home-button";
// import SchoolButton from "./school-button";
// import CodeButton from "./code-button";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const onSchoolClick = () => {
    navigate("/schoolaccountview");
  };

  const onTeacherClick = () => {
    //navigate('/teacheraccountview')
    navigate("/signed-up-teacher");
  };

  return (
    <div className="flex flex-col gap-5 p-4">
      Are you a<Button onClick={onTeacherClick}>teacher</Button>
      or
      <Button onClick={onSchoolClick}>school</Button>
    </div>
  );
};

export default Landing;
