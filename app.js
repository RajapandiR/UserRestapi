import express from 'express';
import badyParser from 'body-parser';
import routes from './src/routers';
import mongoose from 'mongoose';
import path from 'path';

const app = express();
const port = 3000;

app.use(badyParser.json());
app.use(badyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send("Hello word");
}) 

app.use('/', routes);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname +'/src/views');

mongoose.connect("mongodb://localhost:27017/profile", 
	{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
  })
app.listen(port, () => console.log(`Server start at ${port}`));