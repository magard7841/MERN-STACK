
# STEP1: Node Image Use
FROM node:20 AS build

# STEP2: Working Directory Set
WORKDIR /app     

# STEP3: Copy Package.json for Required Dependacy installation
COPY package.json package-lock.json ./

# SETP4: Install Dependancy 
RUN npm install

# STEP5: Copy the Source Code 
COPY . .

# STEP6: Build the react app
RUN npm run build

# STEP7: USE WEB SERVER TO SERVE THE APP
FROM nginx:1.25

# STEP8: COPY THE BUILD OUTPUT
COPY --from=build /app/build /usr/share/nginx/html
# STEP9: Expose the PORT to Nginx listen
EXPOSE 80
# STEP10: Start nginx when container start
CMD ["nginx", "-g", "daemon off;"]

