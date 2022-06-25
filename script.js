const situacao = document.querySelector('#desc');
const img = document.querySelector('#img');
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
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly&lang=pt-br&units=metric&appid=9ee4564d27f38319648476c09b566e86`

            fetch(api)
            .then(resposta =>{
                return resposta.json();
            })
            .then(dados =>{
                console.log(dados);
                const temp = dados.current.temp
                const sens = dados.current.feels_like              
                const umid = dados.current.humidity
                const velven = dados.current.wind_speed
                const icone= dados.current.weather.icon
                const localidade = dados.timezone
                const desc = dados.current.weather[0].description

                temperatura.textContent = Math.round(temp) + '°C';
                sensacao.textContent =`Sensação termica: ${Math.round(sens)}°C`;
                umidade.textContent = `Umidade: ${umid}%`
                velvento.textContent = `Velocidade do vento: ${Math.round(velven*3.6).toFixed(0)} Km/h`
                local.textContent = localidade
                situacao.textContent = desc
                
                icones(icone,document.querySelector('#icone'))

            })
        })
    } 

    function icones(icone,iconeId) {
        const skycons = new Skycons({color:"blue"});
        const iconeAtual = icone.replace(/-/gi, "_").toUppercCase()
        skycons.play();
        return skycons.set(iconeID, Skycons[iconeAtual])
    }
})


