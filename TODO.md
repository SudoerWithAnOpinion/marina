# Marina Todo List

- Initial Setup

  - Handling of initial setup, after user creation, after login session expires and the user is no longer logged in.
    - This presents an issue for interrupted setup or resuming setup from another browser or device.
    - A good fallback is to potientally skip setup since the other steps are optional.

- Automated job queue

  - Determine Printer Availibility
  - Determine Printer Compatability (of sliced file)

- Job Logging

  - Provide method of indicating a job failure (print failure)
  - Warning system to determine causes of recent failures and potiential remedies

- STL Archive

  - Upload and organization of STLs (and linking to sliced GCode)

- Sanity Checks
  - Connected printers should be checked for required and recommended macros.
