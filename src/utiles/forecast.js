const request=require('request')
const forecast=(latitude,langitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=c8a102ce9bf7d56f16b9cfd6d6bfb41e&query='+latitude +','+langitude+'&units=f'
    request({url,json:true},(error,{body}={})=>{
        console.log(body)
        if(error){
            callback('unable to connect to weather service.',undefined)
        }else if(body.error){
            callback('bad enteries.try another coordinates.',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+'. its currently '+body.current.temperature+' degrees but it feel like '+body.current.feelslike+' degrees. the humidity is '+body.current.humidity+' percent.')
        }
    })
}
module.exports=forecast