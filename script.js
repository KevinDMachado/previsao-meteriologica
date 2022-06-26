const situacao = document.querySelector('#desc');
const img = document.querySelector('#icone');
const temperatura = document.querySelector('#temperatura');
const sensacao = document.querySelector('#sensacao');
const umidade = document.querySelector('#umidade');
const velvento = document.querySelector('#velvento');
const local = document.querySelector('#local');

window.addEventListener('load', ()=>{
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posi => {
            long = posi.coords.longitude;
            lat = posi.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9e438fad6ff2388466114324a5cc9307&units=metric`

            fetch(api)
            .then(resposta =>{
                return resposta.json();
            })
            .then(dados =>{
                console.log(dados);
                const temp = dados.main.temp
                const sens = dados.main.feels_like              
                const umid = dados.main.humidity
                const velven = dados.wind.speed
                const localidade = `${dados.name}, ${dados.sys.country}`
                const desc = dados.weather[0].main
                const icone = dados.weather[0].icon

                temperatura.textContent = Math.round(temp) + '°C';
                sensacao.textContent =`Sensação termica: ${Math.round(sens)}°C`;
                umidade.textContent = `Umidade: ${umid}%`
                velvento.textContent = `Velocidade do vento: ${Math.round(velven*3.6).toFixed(0)} Km/h`
                local.textContent = localidade;
                situacao.textContent = desc;
                img.innerHTML = `<img src="icons/${icone}.png"/>`

                if (situacao.textContent = "Clouds") {
                    situacao.textContent ="Nublado"
                } else if (situacao.textContent = "Drizzle") {
                    situacao.textContent ="Garoando"
                }  else if (situacao.textContent = "Rain") {
                    situacao.textContent ="Chuvoso"
                }  else if (situacao.textContent = "Snow") {
                    situacao.textContent ="Nevando"
                }  else if (situacao.textContent = "Clear") {
                    situacao.textContent ="Céu Limpo"
                }  else if ((situacao.textContent = "Mist") || (situacao.textContent = "Haze") || (situacao.textContent = "Fog")) {
                    situacao.textContent ="Névoa"
                }  else if (situacao.textContent = "Squail") {
                    situacao.textContent ="Ventania"
                }  else if (situacao.textContent = "Clouds") {
                    situacao.textContent ="Nublado"
                } 
            })
        })
    } 
})