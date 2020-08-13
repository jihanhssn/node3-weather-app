const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utiles/geoCode.js')
const forecast=require('./utiles/forecast.js')

const app=express()
const port=process.env.PORT ||3000
console.log(port)

// definw paths for express config
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const parialsPath=path.join(__dirname,'../templates/partials')

// setup handlebars engin and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(parialsPath)

//setup static directory to serve html files
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        name:'jihan hassan',
        title:'weather app'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'jihan hassan',
        title:'weather'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        forecast:'raining outside',
        title:'help',
        name:'jihan hassan'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'you must brovide an address'})
    }
    geocode(req.query.address,(error,{longitude,latitude,place_name}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
              location:place_name,
              forecast:forecastData,
              address:req.query.address
            })
        })
        })
    })
 

app.get('/help/*',(req,res)=>{
    res.render('errors',{
        title:'404 error',
        name:'jihan hassan',
        errorMSG:'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('errors',{
        title:'404 error',
        name:'jihan hassan',
        errorMSG:'404 error'
    })
})


app.listen(port,()=>{
    console.log('connected!')
})