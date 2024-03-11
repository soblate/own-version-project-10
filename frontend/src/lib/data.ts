export type User = {
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

export const users: User[] = [
  {
    id: "1",
    username: "user1",
    first_name: "John",
    last_name: "Doe",
    current_school: "Ali's OOSE Academy",
    education:
      "PhD in Effective Teaching, Masters in Education, Bachelor's in Being Cool",
    subjects_taught: "Math, Science",
    current_state: "California",
    grades_taught: "K-12",
    years_of_experience: "10",
    past_jobs:
      "Ali's Full-Stack Javascript Academy, Ali's Data Structures School",
    accolades: "Teacher of the year, MVP of Ali's OOSE Academy",
    accommodations: "Neurodivergent students, ESL students",
    avatar:
      "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
  },
];
