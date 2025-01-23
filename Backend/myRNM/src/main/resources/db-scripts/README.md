# Database Dump Instructions

## How to View the Dump File

1. Navigate to the `src/main/resources/db-scripts` directory in your project.
2. Open `myrnm_dump.sql` using any text editor (e.g., Notepad, VSCode).

## How to Restore the Database

### Prerequisites

- Ensure you have PostgreSQL installed on your machine.
- Make sure PostgreSQL is running.

### Step 1: Create a New Database

1. Open Command Prompt or Terminal.
2. Connect to PostgreSQL:
   psql -U postgres
   text
3. Create a new database:
   CREATE DATABASE myrnm;
   text
4. Exit psql:
   \q
   text

### Step 2: Restore from Dump File

Run the following command to restore the database:

psql -U postgres -d myrnm -f "C:\path\to\your\project\src\main\resources\db-scripts\myrnm_dump.sql"
text

### Example Command

If your project is located at `C:\Users\Public\Spring Boot Projects\myRNM`, use:

psql -U postgres -d myrnm -f "C:\Users\Public\Spring Boot Projects\myRNM\src\main\resources\db-scripts\myrnm_dump.sql"
text

### Important Notes

- You will be prompted to enter the password for the `postgres` user.