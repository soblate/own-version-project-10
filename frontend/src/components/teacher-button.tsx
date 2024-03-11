
  import { Button } from "@/components/ui/button";
  import { useNavigate } from "react-router-dom";

  const TeacherButton = () => {

    const navigate = useNavigate()
    const onHomeClick = () => {
        navigate('/teacheraccountview')
    }



    return (
          <Button variant="default" size="sm" onClick ={onHomeClick}>
             Teacher Dashboard
          </Button>
    );
  };
  
  export default TeacherButton;
  