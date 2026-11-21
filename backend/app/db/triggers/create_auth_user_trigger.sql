CREATE OR REPLACE FUNCTION make_public_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    -- Insert a new record into the public_users table
    INSERT INTO public.users (
        id, 
        first_name, 
        last_name, 
        username, 
        email, 
        age,
        university,
        occupation,
        occupation_other,
        created_at,
        updated_at)
    VALUES (NEW.id, 
            NEW.raw_user_meta_data ->> 'first_name', 
            NEW.raw_user_meta_data ->> 'last_name', 
            NEW.raw_user_meta_data ->> 'username', 
            NEW.email, 
            NULLIF(NEW.raw_user_meta_data ->> 'age', '')::integer,            
            NEW.raw_user_meta_data ->> 'university', 
            NEW.raw_user_meta_data ->> , 
            NEW.raw_user_meta_data ->> 'occupation_other', 
            NEW.created_at, 
            NEW.updated_at);

    RETURN NEW;
END;
$$;

-- Basically, we are creating here a postgres function that inserts into the public_users table when a new record is inserted into the auth.users table. 
-- The function takes the new record as input and extracts the relevant fields to insert into the public_users table.
-- The NEW object represents the new row being inserted into the auth.users table, and we use the ->> operator to extract the values of the JSON fields.


DROP TRIGGER IF EXISTS make_public_user_trigger ON auth.users;


CREATE TRIGGER make_public_user_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION make_public_user();

-- This actually creates the trigger that will call the make_public_user function before a new row is inserted into the auth.users table.
-- I chose AFTER INSERT because we want to ensure that the new user record is successfully inserted into the auth.users table before we attempt to insert it into the public.users table.