// create options for citites
function populateCitiesDropdown() {
    let citiesDropdown = document.getElementById("cities-options");
    for (let city of cities){
        let option = document.createElement("option");
        option.text = city.arabicName;
        option.value = city.arabicName; 
        citiesDropdown.add(option);
    }
}
populateCitiesDropdown();
// Event listener if we change an options
document.getElementById("cities-options").addEventListener("change" , () =>{
    let countryValue = document.getElementById("cities-options").value;
    let cityName = "";
    for(let city of cities){
        if(city.arabicName == countryValue){
            cityName = city.englishName;
        }
    }
    getPrayersTimingsOfCity(cityName);
    document.getElementById("title-of-city").innerHTML = countryValue
});
// get the prayer time from the api and display it in the page
function getPrayersTimingsOfCity(city="CASABLANCA"){
    let params = {
        country: "MA",
        city: city
    }
    
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
    .then(function (response) {
        let time = response.data.data.timings;
        document.getElementById("date").innerHTML = response.data.data.date.gregorian.date;
        fillTimeForPrayer("fajr-time" , time.Fajr);
        fillTimeForPrayer("sunrise-time" , time.Sunrise);
        fillTimeForPrayer("sunrise-time" , time.Sunrise);
        fillTimeForPrayer("dhuhr-time" , time.Dhuhr);
        fillTimeForPrayer("asr-time" , time.Asr);
        fillTimeForPrayer("sunset-time" , time.Sunset);
        fillTimeForPrayer("isha-time" , time.Isha);
    })
    .catch(function (error) {
        console.log(error);
    })
}
getPrayersTimingsOfCity()



function fillTimeForPrayer(id , time){
    document.getElementById(id).innerHTML = time
}




