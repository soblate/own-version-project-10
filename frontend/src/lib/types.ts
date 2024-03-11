export type User = {
  id: number;
  username: string;
};

export type SchoolUser = {
  id: number;
  username: string;
  city: string;
  state: string;
  email: string;
};


export type Postings = {
  id: number;
  title: string;
  experience: string;
  school_id: number;
  salary_est: string;
  start_date:string;
  city:string;
  state:string;
}
export type TeacherUser = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  current_school: string;
  education: string;
  subjects_taught: string;
  current_state: string;
  grades_taught: string;
  years_of_experience: string;
  past_jobs: string;
  accolades: string;
  accommodations: string;
  avatar?: string;
};

export type Post = {
  id: string;
  title: string;
  experience: string;
  timestamp: string;
};




export type PostWithUserData = Post & { user?: User };
