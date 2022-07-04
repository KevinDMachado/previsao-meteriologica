const situacao = document.querySelector('#desc');
const img = document.querySelector('#icone');
const temperatura = document.querySelector('#temperatura');
const sensacao = document.querySelector('#sensacao');
const umidade = document.querySelector('#umidade');
const velvento = document.querySelector('#velvento');
const local = document.querySelector('#local');

window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posi => {
            long = posi.coords.longitude;
            lat = posi.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9e438fad6ff2388466114324a5cc9307&units=metric`

            fetch(api)
                .then(resposta => {
                    return resposta.json();
                })
                .then(dados => {
                    console.log(dados);
                    const temp = dados.main.temp
                    const sens = dados.main.feels_like
                    const umid = dados.main.humidity
                    const velven = dados.wind.speed
                    const localidade = `${dados.name}, ${dados.sys.country}`
                    const desc = dados.weather[0].main
                    const icone = dados.weather[0].icon

                    temperatura.textContent = Math.round(temp) + '°C';
                    sensacao.textContent = `Sensação termica: ${Math.round(sens)}°C`;
                    umidade.textContent = `Umidade: ${umid}%`
                    velvento.textContent = `Velocidade do vento: ${Math.round(velven * 3.6).toFixed(0)} Km/h`
                    local.textContent = localidade;
                    situacao.textContent = desc;
                    img.innerHTML = `<img src="icons/${icone}.png"/>`

                    switch (situacao.textContent) {
                        case 'Clouds':
                            situacao.textContent = "Nublado"
                            break;
                        case 'Drizzle':
                            situacao.textContent = "Garoando"
                            break;
                        case 'Clear':
                            situacao.textContent = "Céu Limpo"
                            break;
                        case 'Rain':
                            situacao.textContent = "Chuvoso"
                            break;
                        case 'Squail':
                            situacao.textContent = "Ventania"
                            break;
                        case 'Snow':
                            situacao.textContent = "Nevando"
                            break;
                        default :
                            situacao.textContent ='Névoa'
                            break
                    }
                })
        })
    }
})