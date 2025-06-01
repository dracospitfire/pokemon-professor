-- recommended to disable commits and foreign key checks and then turn them back on at the end to minimize import errors.
BEGIN;

CREATE SCHEMA auth_data;

CREATE TABLE auth_data.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,  -- Store hashed passwords, NEVER plaintext!
    created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE auth_data.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow own data access"
ON auth_data.users
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Allow user creation"
ON auth_data.users
FOR INSERT
WITH CHECK (auth.uid() = id);


-- Recommended to disable commits and foreign key checks and then turn them back on at the end to minimize import errors.
COMMIT;