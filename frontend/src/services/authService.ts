import { supabase } from "../lib/supabase";

interface SignUpData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirm: string;
    age: string;
    school: string;
    occupation: string;
    other: string;
}

export async function signUpUser(userData: SignUpData) {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        username: userData.username,
        age: userData.age,
        university: userData.school,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
}