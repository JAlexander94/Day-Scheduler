var textareas = document.getElementsByTagName("textarea")

//working clock that sends the text to #date-time h2 in the header
setInterval(function(){
    var today = moment()
    $("#currentDay").text(today.format("DD MMM YYYY")+" at "+today.format("hh:mm:ss a"));
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
    if(moment().hour()==0 && moment().minute()==0 && moment().second()==0){window.localStorage.removeItem("events")}
},1000)

var container = document.getElementsByClassName("container")
var storedevents =[]

$("button").click(function(event){
    var button = event.target.getAttribute("data-hour")
    for (i=0;i<textareas.length;i++){
        var timehour = textareas[i].getAttribute("data-hour")
        if(timehour==button){
            var text = textareas[i].value
            var eventarr = {[timehour]:text}
            storedevents.push(eventarr)
            localStorage.setItem("events",JSON.stringify(storedevents))
        }
    }
})

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