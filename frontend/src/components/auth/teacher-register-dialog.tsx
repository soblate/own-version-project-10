import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import useMutationTeacherUser from "@/hooks/use-mutations-teachers";
import { useNavigate } from "react-router-dom";

export const TeacherRegisterDialog = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [current_school, setCurrentSchool] = useState("");
  const [subjects_taught, setSubjectsTaught] = useState("");
  const [current_state, setCurrentState] = useState("");
  const [grades_taught, setGradesTaught] = useState("");
  const [years_of_experience, setYearsOfExperience] = useState("");

  const { toast } = useToast();
  const { registerTeacherUser } = useMutationTeacherUser();

  const clearFields = () => {
    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setCurrentSchool("");
    setSubjectsTaught("");
    setCurrentState("");
    setGradesTaught("");
    setYearsOfExperience("");
  };

  const navigate = useNavigate();
  const handleSave = async () => {
    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Sorry! Username or password cannot be empty! 🙁",
        description: `Please enter the required information to register.`,
      });
      return;
    }

    registerTeacherUser(
      username,
      password,
      first_name,
      last_name,
      current_school,
      subjects_taught,
      current_state,
      grades_taught,
      years_of_experience
    );

    clearFields();

    try {
      navigate("/signed-up-teacher");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleCancel = () => {
    clearFields();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Click to login"} variant="outline">
          Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Please complete this form to register.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-6">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              className="col-span-3"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              className="col-span-3"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="first_name" className="text-right">
              First Name
            </Label>
            <Input
              id="first_name"
              type="first_name"
              value={first_name}
              className="col-span-3"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="last_name" className="text-right">
              Last Name
            </Label>
            <Input
              id="last_name"
              type="last_name"
              value={last_name}
              className="col-span-3"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="current_school" className="text-right">
              Current School
            </Label>
            <Input
              id="current_school"
              type="current_school"
              value={current_school}
              className="col-span-3"
              onChange={(e) => {
                setCurrentSchool(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="subjects_taught" className="text-right">
              Subjects Taught
            </Label>
            <Input
              id="subjects_taught"
              type="subjects_taught"
              value={subjects_taught}
              className="col-span-3"
              onChange={(e) => {
                setSubjectsTaught(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="current_state" className="text-right">
              Current State
            </Label>
            <Input
              id="current_state"
              type="current_state"
              value={current_state}
              className="col-span-3"
              onChange={(e) => {
                setCurrentState(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="grades_taught" className="text-right">
              Grades Taught
            </Label>
            <Input
              id="grades_taught"
              type="grades_taught"
              value={grades_taught}
              className="col-span-3"
              onChange={(e) => {
                setGradesTaught(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="years_of_experience" className="text-right">
              Years of Experience
            </Label>
            <Input
              id="years_of_experience"
              type="years_of_experience"
              value={years_of_experience}
              className="col-span-3"
              onChange={(e) => {
                setYearsOfExperience(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSave}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
