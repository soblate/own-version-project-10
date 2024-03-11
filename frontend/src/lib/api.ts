import type { User, PostWithUserData, SchoolUser, Postings, TeacherUser } from "@/lib/types";
// import { nanoid } from "nanoid";
import { getAuthenticatedSchoolUser, getAuthenticatedSchoolUserToken, removeAuthenticatedSchoolUserToken, storeAuthenticatedSchoolUserToken } from "./schoolauth";

import { getAuthenticatedUser, getAuthenticatedUserToken, storeAuthenticatedUserToken } from "./auth";
// import { nanoid } from "nanoid";

import {
  getAuthenticatedTeacherUser,
  removeAuthenticatedTeacherUserToken,
  storeAuthenticatedTeacherUserToken,
} from "./teacherauth";

const API_URL = import.meta.env.VITE_API_URL;

const handleError = (response: Response, message?: string) => {
  if (response.status === 401) {
    throw new Error("Your session has expired. Please login again.");
  }

  throw new Error(
    `Error: ${response.status} - ${message || response.statusText}`
  );
};


// Fetch all posts with user data
export const fetchPostsByUser = async (userId: number): Promise<PostWithUserData[]> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();
  if(user) {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}/posts/user/?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    const responseJson = await response.json();
  
    if (!response.ok) {
      handleError(response, responseJson.message);
    }
  
    return responseJson.data;
  }
  else {
    return [];
  }
};

export const fetchPostingsById = async (postId: number | string): Promise<Postings> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();
  console.log(postId)
  if(user) {
    const API_URL = import.meta.env.VITE_API_URL;
    console.log("occuring")
    const response = await fetch(`${API_URL}/postings/posting/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    const responseJson = await response.json();
  
    if (!response.ok) {
      handleError(response, responseJson.message);
    }
    console.log(responseJson)
    console.log(responseJson.data)

    return responseJson;

  }
  else {
    return null;
  }
};


export const deletePost = async (id: string): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

// Create a post
export const createPost = async (
  content: string,
  image?: string,
): Promise<PostWithUserData> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();

  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, image }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return {
    ...responseJson.data,
    user: user,
  };
};

// Create a post
export const createPostings = async (
  school_id: number,
  experience: string,
  title: string,
  salary_est: string,
  start_date: string,
  city: string,
  state: string
): Promise<Postings> => {

  const user = getAuthenticatedSchoolUser();
  const token = getAuthenticatedSchoolUserToken();

  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/postings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ school_id, experience, title, salary_est, start_date, city, state }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return {
    ...responseJson.data,
    user: user,
  };
};

export const updatedPostings = async (
  id: number| string,
  experience: string,
  title: string,
  school_id: number,
  salary_est: string,
  start_date: string,
  city: string,
  state: string
): Promise<Postings> => {

  const user = getAuthenticatedSchoolUser();
  const token = getAuthenticatedSchoolUserToken();

  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/postings/postings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id,experience, title, school_id, salary_est, start_date, city, state}),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return {
    ...responseJson,
    user: user,
  };
};


export const deletePostings = async (id: number): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const API_URL = import.meta.env.VITE_API_URL;
  console.log("deleeting");
  const response = await fetch(`${API_URL}/postings/postings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};




// Login, store the token, and return the user
export const login = async (
  username: string,
  password: string,
): Promise<User> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  const { access_token } = responseJson.data;

  
  if (!access_token) {
    throw new Error("Authentication token is missing from the response!");
  }

  storeAuthenticatedUserToken(access_token);
  const user = getAuthenticatedUser();
  return user;
};





export const school_login = async (
  username: string,
  password: string
): Promise<SchoolUser> => {
  const response = await fetch(`${API_URL}/schools/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`
    );
  }

  // console.log(responseJson)
  const access_token = responseJson["tokens"]["access"];

  if (!access_token) {
    throw new Error("Authentication token is missing from the response!");
  }

  storeAuthenticatedSchoolUserToken(access_token);
  const user = getAuthenticatedSchoolUser();
  // console.log(user)
  return user;  
};

export const fetchPostingsBySchool = async (
  id: number,
): Promise<Postings[]> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/postings/schools/${id.toString()}?`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    // body: JSON.stringify({}),  
  });

  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }
  return responseJson['postings']
  // // console.log(responseJson)
  // const access_token = responseJson["tokens"]["access"]
  // const userId = responseJson["id"]
  // if (!access_token) {
  //   throw new Error("Authentication token is missing from the response!");
  // }

  // storeAuthenticatedSchoolUserToken(access_token);
  // const user = getAuthenticatedSchoolUser();
  // // console.log(user)
  // return user;  
};

export const fetchAllPostings = async (
): Promise<Postings[]> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/postings/allpostings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    // body: JSON.stringify({}),  
  });

  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }
  return responseJson['postings']
};


export const get_school = async (
  username: string,
): Promise<SchoolUser> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/schools/profile/${username}?`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }
  return responseJson["school"]
  // // console.log(responseJson)
  // const access_token = responseJson["tokens"]["access"]
  // const userId = responseJson["id"]
  // if (!access_token) {
  //   throw new Error("Authentication token is missing from the response!");
  // }

  // storeAuthenticatedSchoolUserToken(access_token);
  // const user = getAuthenticatedSchoolUser();
  // // console.log(user)
  // return user;  
};

export const school_logout = async (): Promise<void> => {
  removeAuthenticatedSchoolUserToken();

};

export const teacher_logout = async (): Promise<void> => {
  removeAuthenticatedTeacherUserToken();
};

export const teacher_register = async (
  username: string,
  password: string,
  first_name: string,
  last_name: string,
  current_school: string,
  subjects_taught: string,
  current_state: string,
  grades_taught: string,
  years_of_experience: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/teachers/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      first_name,
      last_name,
      current_school,
      subjects_taught,
      current_state,
      grades_taught,
      years_of_experience,
    }),
  });
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`
    );
  }
};

export const teacher_login = async (
  username: string,
  password: string
): Promise<TeacherUser> => {
  const response = await fetch(`${API_URL}/teachers/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`
    );
  }

  const access_token = responseJson["tokens"]["access"];

  if (!access_token) {
    throw new Error("Authentication token is missing from the response!");
  }

  storeAuthenticatedTeacherUserToken(access_token);
  const user = getAuthenticatedTeacherUser();
  // console.log(user)
  return user;
};

export const school_register = async (
  username: string,
  password: string,
  email: string,
  state: string,
  city: string,
  name: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/schools/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email, state, city, name }),
  });
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`
    );
  }
};

// const handleError = (response: Response, message?: string) => {
//   if (response.status === 401) {
//     removeAuthenticatedUserToken();
//     throw new Error("Your session has expired. Please login again.");
//   }

//   throw new Error(
//     `Error: ${response.status} - ${message || response.statusText}`
//   );
// };

// // Fetch a post given its id
// export const fetchPostById = async (id: string): Promise<PostWithUserData> => {
//   const response = await fetch(`${API_URL}/posts/post/${id}?withUserData=true`);
//   const responseJson = await response.json();

//   if (!response.ok) {
//     handleError(response, responseJson.message);
//   }

//   return responseJson.data;
// };
