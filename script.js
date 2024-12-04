window.addEventListener('DOMContentLoaded', (event) => { 
    const apiKey = 'd77e8a80bfcc7551c3135a39d716ce92';
    const weatherElement = document.getElementById('weather'); 
    const iconw = document.getElementById('img'); 
    const cit = document.getElementById('city'); 
    const confirmButton = document.getElementById('confirmCity');  
    const sunsetElement = document.getElementById('sunset'); 
    const sunriseElement = document.getElementById('sunrise'); 

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const getWeather = (city) => { 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`; 

        fetch(url) 
            .then((response) => response.json()) 
            .then((data) => { 
                if (data.cod !== 200) { 
                    weatherElement.innerHTML = `<span>нету города братишка</span>`; 
                    return; 
                } 

                const temperature = data.main.temp; 
                const description = data.weather[0].description; 
                const icon = data.weather[0].icon; 
                const sunrise = new Date(data.sys.sunrise * 1000);
                const sunset = new Date(data.sys.sunset * 1000); 

                weatherElement.innerHTML = `Текущая температура: ${temperature}°C<br>Описание: ${description}`; 
                iconw.src = `https://openweathermap.org/img/wn/${icon}.png`; 
                sunsetElement.innerHTML = `Закат: ${formatTime(sunset)}`; 
                sunriseElement.innerHTML = `Восход: ${formatTime(sunrise)}`; 
            }) 
            .catch((error) => { 
                console.error('Произошла ошибка:', error); 
                weatherElement.innerHTML = `<span>шо ты написал совсем не ништяк братишка</span>`; 
            }); 
    }; 

    confirmButton.addEventListener('click', () => { 
        const city = cit.value.trim(); 
        if (!city) { 
            weatherElement.innerHTML = `<span>введи название города братишка</span>`; 
            return;
        }
        getWeather(city); 
    }); 
});
