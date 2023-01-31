var textareas = document.getElementsByTagName("textarea")
var buttonlock = document.getElementsByTagName("button")


setInterval(function(){
    var today = moment()
    //working date that sends the text to #currentDay
    $("#currentDay").text(today.format("dddd, MMMM Do"));
    //loop which changes the styling dpending on what stage of the day it is
    var hour = moment().hour()
    for (i=0;i<textareas.length;i++){
    var timehour = textareas[i].getAttribute("data-hour")
    if(timehour<hour){
        textareas[i].setAttribute("class","form-control past time-block col-10")
    }else if(timehour==hour){
        textareas[i].setAttribute("class","form-control present time-block col-10")
    }else{
        textareas[i].setAttribute("class","form-control future time-block col-10")
        }
    }
    //reloads the page and wipes the memory when each new day starts
    var hourofday = moment().hour()
    var minute = moment().minute()
    var second = moment().second()
    if(hourofday==00 && minute==00 && second==00){
        window.localStorage.removeItem("events")
        init()
        location.reload()
    }
},1000)

var container = document.getElementsByClassName("container")
var storedevents =[]

//function that stores any text that has been written in the textareas when the save button is clicked (it also chnages the lock symbol from unlocked to lock)
$("button").click(function(event){
    var button = event.target.getAttribute("data-hour")
    for (i=0;i<textareas.length;i++){
        var timehour = textareas[i].getAttribute("data-hour")
        if(timehour==button){
            var text = textareas[i].value
            var eventarr = {[timehour]:text}
            storedevents.push(eventarr)
            localStorage.setItem("events",JSON.stringify(storedevents))
            buttonlock[i].setAttribute("class","btn col-1 fa fa-lock saveBtn")
        }
    }
})

//function to load the page with any stored events from the local storage unless its the next day in whcih case they will have been wiped in the setInterval
function init(){
    storedevents = JSON.parse(localStorage.getItem("events"))
    if(storedevents===null){storedevents=[]}
    for (j=0;j<storedevents.length;j++){
        for(i=0;i<textareas.length;i++){
            var timehour = textareas[i].getAttribute("data-hour")
            if(Object.keys(storedevents[j])[0]==timehour){
                textareas[i].value = storedevents[j][timehour]
            }
        }
    }
}

init()