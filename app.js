// Command Line Application
const request = require('request')
const argv  = require('yargs')
const yargs = require('yargs')
const chalk = require('chalk')

const url = 'http://api.weatherstack.com/current?access_key=a125d43aef2fb00cac6ffb80b418fed8&query='

const WeatherInfo = (fullurl) => {
    request({url: fullurl,json: true},(Error,response) => 
    {
        if(Error)
        {
            console.log(chalk.redBright.bold('Unable to connect with weather service :('));
        }
        else if(response.body.error)
        {
            console.log(chalk.redBright.bold(response.body.error.code+', '+response.body.error.type));
        }
        else {
            console.log(chalk.white.bold.inverse('**WEATHER REPORT**'))
            console.log(chalk.magenta(response.body.location.name+','+response.body.location.country+'  '+response.body.location.localtime));
            console.log(chalk.cyan('Latitude    : '+response.body.location.lat));
            console.log(chalk.cyan('Longitude   : '+response.body.location.lon));
            console.log(chalk.yellow('Temperature : '+response.body.current.temperature+' C'));
            console.log(chalk.green('Wind Speed  : '+response.body.current.wind_speed+' km/hr'));
            console.log(chalk.blue('Humidity    : '+response.body.current.humidity));
            console.log(chalk.red('Description : '+response.body.current.weather_descriptions));
        }
    })
} 

yargs.command({
    command : 'weather',
    describe : 'To get weather of entered city',
    builder : {
        city:{
            describe : 'City',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        WeatherInfo(url+argv.city);
    }
})

yargs.parse()
