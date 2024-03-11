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
// import { useToast } from "@/components/ui/use-toast";
import useSchoolPostingQueryPosts from "@/hooks/use-mutations-school-postings";

export const SchoolJobEditDialog = ({ params }: { params: { id: number, experience: string, title:string, school_id: number,   salary_est: string,
  start_date: string,
  city: string,
  state: string } }) => {
  const [title, setTitle] = useState(params.title);
  const [experience, setExperience] = useState(params?.experience);
  const [salary_est, setSalary_est] = useState(params?.salary_est);
  const [start_date, setStart_date] = useState(params?.start_date);
  const [city, setCity] = useState(params?.city);
  const [state, setState] = useState(params?.state);

  // const { toast } = useToast();
  
  const { updatePostings } = useSchoolPostingQueryPosts();

  const clearFields = () => {
    setTitle(params?.title);
    setExperience(params?.experience);
  };

  const handleLogin = async () => {
    //login
    updatePostings(params.id, experience, title, params.school_id, salary_est, start_date, city, state);
    clearFields();

  };

  const handleCancel = () => {
    clearFields();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Click to login"} variant="default">
          Edit this posting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit this posting</DialogTitle>
          <DialogDescription>Update the information here:</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="password" className="text-right">
              Description
            </Label>
            <Input
              id="experience"
              value={experience}
              className="col-span-3"
              type="experience"
              onChange={(e) => {
                setExperience(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="password" className="text-right">
              Start Date
            </Label>
            <Input
              id="experience"
              value={experience}
              className="col-span-3"
              type="experience"
              onChange={(e) => {
                setStart_date(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="password" className="text-right">
              Salary Estimate
            </Label>
            <Input
              id="salary_est"
              value={salary_est}
              className="col-span-3"
              type="salary_est"
              onChange={(e) => {
                setSalary_est(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="password" className="text-right">
              City
            </Label>
            <Input
              id="city"
              value={city}
              className="col-span-3"
              type="city"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>

          <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="password" className="text-right">
              State
            </Label>
            <Input
              id="state"
              value={state}
              className="col-span-3"
              type="state"
              onChange={(e) => {
                setState(e.target.value);
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
            <Button type="submit" onClick={handleLogin}>
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
