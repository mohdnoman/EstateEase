import express from 'express';

const app = express();



app.listen(3000, (req, res) => {
    console.log(`listning on port 3000`)
});