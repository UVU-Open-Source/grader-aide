# node-zybooks-auto-grader

This is a small project for converting zybooks csv's to canvas csv equivelant for a class. More on this later.

## Getting started
- run `npm i`

**Using csv cli utility**
- run `node ./utils/zybooks-to-canvas-csv -h` to see required flags to get script to work.
Provide an input csv for zybooks and canvas, the name of the assignment in chnvas **expected** `ch<number of chapter>` and a location you would like to save the file. The save file should end in csv and will be in correct format to auto import to canvas.

**Running web project**
- currently you need to run two servers. One for the vue spa and one for the node server.
- server
  - expects a file call `server/students.json` that is an array of students that includes their name, uvu id, zybooks id and canvas id.
  example. **IMPORTANT** this file contains sensitive information so needs to be added locally and will be ignored in the project.
  ```json
    { "name": "student name here", "schoolId": 123123, "zybooksId": 123123, "canvasId": 123123 },
  ```
  - to start server `cd server`
  - `npm i`
  - `npm run dev`
- client
  - to start client `cd client`
  - `npm i`
  - `npm run dev`