• For run this project:
1. clone the repo
2. install "nodejs" (last LTS version would be great)
3. run "npm i --legacy-peer-deps" at the project root

• Running on production:
run "npm run build" at the project root
- after running this command, all build files would be on /build folder, these files should serve with a webserver (if user request a file that not exist, the index.html file would send to user)
- on any push update, the "npm run build" would call to update /build

• Running on development:
run "npm start" and project would start on http://localhost:3000