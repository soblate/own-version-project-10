
  import { Button } from "@/components/ui/button";
  import { useNavigate } from "react-router-dom";

  const HomeButton = () => {

    const navigate = useNavigate()
    const onHomeClick = () => {
        navigate('/schoolaccountview')
    }



    return (
          <Button variant="default" size="sm" onClick ={onHomeClick}>
             School Dashboard
          </Button>
    );
  };
  
  export default HomeButton;
  