const request=require('request')
const geoCode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiamloYW5oYXNzYW4iLCJhIjoiY2tjejNmeW90MGNyeTJ5dnBzeDhxaHoxZCJ9.m_czWw5LX9LB9Sk-2QELew&limit=1"
    request({url,json:true},(error,{body}={})=>{
        if(error){
           callback('unable to connect to location',undefined)
        }else if(body.features.length ===0){
           callback('unable to find location. try another search',undefined)
        }else{
            callback(undefined,{
                 latitude:body.features[0].center[0],
                 longitude:body.features[0].center[1],
                 place_name:body.features[0].place_name
            })
        }
    })
}
module.exports=geoCode