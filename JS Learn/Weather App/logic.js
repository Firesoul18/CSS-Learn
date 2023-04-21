let func = async(text) =>{
    let url ='http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=NOOAXk5GMFCbtqXr1PKB79SwhVswyQHG&q='+text;
    console.log(url);
    let p = await fetch(url,
        {
            mode: "cors",
            method: 'GET',
            headers:{
                'Accept-Encoding':'gzip'
            }
        });

        return(p.json());
}

// func();

let searchbar = document.querySelector(".city-search-bar");
searchbar.addEventListener('keyup',async ()=>{
    let search = searchbar.value;
    let t = await func(search);
    // console.log(t);
    let form = document.querySelector(".city-search");
    let autosearch = document.querySelector(".auto-search");
    autosearch.innerHTML="";
    t.forEach(element => {
        // console.log(element.LocalizedName);
        let x = document.createElement("li");
        x.setAttribute("id",element.Key);
        x.innerHTML=element.LocalizedName;
        autosearch.appendChild(x);
        x.addEventListener('click',async (e)=>{
            let b = document.querySelector(".searched-city-weather")
            b.innerHTML=""
            let id = e.target.id;
            let url ='http://dataservice.accuweather.com/currentconditions/v1/'+id+'?apikey=NOOAXk5GMFCbtqXr1PKB79SwhVswyQHG';
            let p2 = await fetch(url);
            let t2 = await p2.json();

            console.log(t2);

            // b.innerHTML=t2[0].LocalObservationDateTime
            // +" "+
            // t2[0].Temperature.Metric.Value+" "+
            // t2[0].WeatherText;

            let dateTime = document.createElement("p");
            let date = t2[0].LocalObservationDateTime
            console.log(t2[0].LocalObservationDateTime)
            dateTime.innerHTML=`${date.substr(0,10)} ${date.substr(11,8)}`;
            dateTime.setAttribute("class","date-time");
            b.appendChild(dateTime);

            let temp = document.createElement("p");
            temp.innerHTML=t2[0].Temperature.Metric.Value+"&#8451";
            temp.setAttribute("class","temperature");
            b.appendChild(temp);

            let WeatherText = document.createElement("p");
            WeatherText.innerHTML=t2[0].WeatherText;
            WeatherText.setAttribute("class","weather-text");
            b.appendChild(WeatherText);

            autosearch.innerHTML="";
            searchbar.value="";
        })
    });
})