import { jwtDecode } from "jwt-decode";
import { SchoolUser } from "./types";

// Get the user by decoding the token from local storage
export const getAuthenticatedSchoolUser = (): SchoolUser => {
  const token = localStorage.getItem("token") as string;
  const decodedToken = jwtDecode<SchoolUser>(token);
  return decodedToken;
};

// Get the token from local storage
export const getAuthenticatedSchoolUserToken = (): string | null => {
  return localStorage.getItem("token");
};

export const storeAuthenticatedSchoolUserToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const removeAuthenticatedSchoolUserToken = (): void => {
  localStorage.removeItem("token");
};

export const isSchoolTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTimestamp = Date.now() / 1000; // current time in seconds
    return decodedToken.exp < currentTimestamp;
  } catch (error) {
    // If there's an error in decoding, assume the token is invalid/expired
    return true;
  }
};