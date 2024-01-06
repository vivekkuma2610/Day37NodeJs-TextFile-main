const express = require('express');
const fs = require('fs');
const moment = require('moment');

const app = express();
const port = 3000;
const folderPath = './textfiles'; // Change this to your desired folder path

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to text file creation projet via file system')
})
// Endpoint to create a text file with the current timestamp
app.get("/createfile", (req, res) => {
    const currentDate = new Date();
    const formatedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
    const formatedTime = `(${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()})`
    console.log(formatedDate, formatedTime);
    //file name as date-time.text
    const fileName = `${formatedDate}_${formatedTime}.txt`;
    const timestamp = currentDate;
    const content = `TimeStamp: ${timestamp}`;
    fs.writeFile(`./textfiles/${fileName}`, content, (err) => {
      if (err) console.log(err);
      console.log(`File: ${fileName} is created successfully`);
    });
    res.send({ TimeStamp: fileName });
  });
   
// Endpoint to retrieve a list of all text files in the folder
app.get('/getTextFiles', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Unable to retrieve the text files.' });
        } else {
            const textFiles = files.filter((file) => file.endsWith('.txt'));
            res.json({ textFiles });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
