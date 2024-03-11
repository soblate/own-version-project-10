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
import useMutationSchoolUser from "@/hooks/use-mutations-schools";

export const SchoolRegisterDialog = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");

  const { toast } = useToast();
  const { registerSchoolUser } = useMutationSchoolUser();


  const clearFields = () => {
    setUsername("");
    setPassword("");
    setName("");
    setEmail("");
    setCity("");
    setState("");
  };

  const handleSave = async () => {
    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Sorry! Username or password cannot be empty! 🙁",
        description: `Please enter the required information to register.`,
      });
      return;
    }

    registerSchoolUser(username, password, email, name, city, state);

    clearFields();
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
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              className="col-span-3"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              School Name
            </Label>
            <Input
              id="name"
              type="name"
              value={name}
              className="col-span-3"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="state" className="text-right">
              State
            </Label>
            <Input
              id="state"
              type="state"
              value={state}
              className="col-span-3"
              onChange={(e) => {
                setState(e.target.value);
              }}
            />
            <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input
              id="city"
              type="city"
              value={city}
              className="col-span-3"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          </div>
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