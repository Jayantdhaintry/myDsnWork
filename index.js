// required the following modules
const express=require('express');
const bodyParser=require('body-parser')
const ejs=require('ejs')
const mongoose=require('mongoose')


// created the application
const app=express()

// used application to make a static folder public, require ejs and use body parser to take input
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


// connecting the mondodb server on 270717
mongoose.connect("mongodb://localhost:27017/Blog")

// created the shema for the blog
const blogSchema=new mongoose.Schema({
    date:Number,
    month:String,
    content:String
});

// created the model of the database
const Blog=new mongoose.model('Blog',blogSchema)



let blog_arr=[]
Blog.find(function(err,blogs){
    if (err){
        console.log(err);
    }else{
        blogs.forEach(function(blog){
            blog_arr.push([blog.date,blog.month,blog.content])
        })
    }
});


// getting the home router
app.get('/',function(req,res){
    res.render('jayant',{blogs:blog_arr})
});

// listening the application on local host 3000 server
app.listen(3000,function(){
    console.log('server created');
});