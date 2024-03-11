
  import { Button } from "@/components/ui/button";
  import {useState } from "react";
  import { useNavigate } from "react-router-dom";

  const CodeButton = () => {


const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault(); // Prevents the default form submission behavior
  //   setInputValue(''); // Resets the input value
  // };

    const navigate = useNavigate()
    const onHomeClick = (code) => {
        if(code !== "") {
            navigate("/posts/" + inputValue)
        }
    }


    return (
        <div>
            <div>
                Have a Code to join an event, enter it here!
            </div>

        <form onSubmit={onHomeClick}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter Access Code"
          className = "w2 border-solid border-4"
        />
        <br></br>
        <Button type="submit" variant="default">Submit</Button>
      </form>
      </div>
    );
  };
  
  export default CodeButton;
  