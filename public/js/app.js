console.log('hello aoo.js')
// const address='!'
// fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiamloYW5oYXNzYW4iLCJhIjoiY2tjejNmeW90MGNyeTJ5dnBzeDhxaHoxZCJ9.m_czWw5LX9LB9Sk-2QELew&limit=1")
// .then((response)=>{
   
//     response.json().then((data)=>{
//         if(data.features.length===0){
//             return console.log("error")
//         }
//         console.log(data)
//         const lang=data.features[0].center[0]
//         const lat=data.features[0].center[1]
//         const location=data.features[0].place_name
//         fetch('http://api.weatherstack.com/current?access_key=c8a102ce9bf7d56f16b9cfd6d6bfb41e&query='+lang +','+lat+'&units=f')
//             .then((response)=>{
               
//                 response.json().then((data)=>{
//                     if(data.error){
//                         return console.log("no response")
//                     }
//                     console.log(data)
//                     console.log(location)
//                     console.log(data.current.weather_descriptions[0]+'. its '+data.current.temperature+' degrees. but it feels like '+data.current.feelslike+' degrees')
//                 })
//             })
//     })
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const address=search.value

    messageOne.textContent='loading..'
    messageTwo.textContent=''
    fetch("http://localhost:3000/weather?address="+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
          messageOne.textContent=data.location
          messageTwo.textContent=data.forecast
        }
    })
})

})
