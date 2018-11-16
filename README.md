follow these instructions:

  1. NPM install
  2. create a .env file
  3. add the following to the env file according to your AWS RDS database settings:
    RDS_HOSTNAME=your rds endpoint here
    RDS_USERNAME=your username here
    RDS_PASSWORD= your password here
    RDS_PORT=5432(default) or your port here
    ENVIRONMENT=staging (or whatever you want to use at that time)
  4. run npm create-db to create a postgres db on your own computer, should use the     development environment form knexfile by default
  5. run npm run rds-db if you have a AWS RDS database setup
