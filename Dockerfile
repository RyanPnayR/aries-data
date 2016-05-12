# Start with official node image.
FROM node:6.1.0

# Install task-runner globally.
RUN ["npm", "install", "-g", "aries-data/aries-data#airflow"]

# Execute task-runner with arguments provided from CMD.
ENTRYPOINT ["aries-data"]
