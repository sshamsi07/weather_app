import React from "react";
import axios from "axios";
import {render} from "react-dom";
import '../styling.css';
import {places_with_coordinates} from "../places_with_coordinates";
import ForecastDay from "./ForecastDay";
import {icon_file} from "../static/icon_file";

let city_names=['OTTAWA','MOSCOW','TOKYO']

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
class CurrentWeather extends React.Component{


    constructor(props) {
        super(props);

        this.state = { current_temp:null, selected_city:"OTTAWA", current_weather_type:"",
            current_day:new Date().getDay(), forecast_temps:[], forecast_weather_types:[],color:'black', fontWeight:''
        };

        this.handleClickCity = this.handleClickCity.bind(this)
        this.handle_current_temp = this.handle_current_temp.bind(this)
        this.forecast_temp_calculator = this.forecast_temp_calculator.bind(this)
        this.handle_weather_icon = this.handle_weather_icon.bind(this)
        this.calculate_avg_temp = this.calculate_avg_temp.bind(this)
        this.calculate_avg_weather_type = this.calculate_avg_weather_type.bind(this)
        this.mountCity = this.mountCity.bind(this)

    };

    handle_current_temp(current_weather_data){
        const temp = current_weather_data["data"]["main"]["temp"]
        this.setState({current_temp: temp})
        const weather = current_weather_data["data"]["weather"][0]["main"]
        this.setState({current_weather_type: weather})

    };

    componentDidMount() {
        this.handleClickCity(this.state.selected_city)
    }


    calculate_avg_temp(temp_list){
        let sum = 0
        for(let i=0; i<temp_list.length; i++){
            sum += temp_list[i]["main"]["temp"]
        }
        return Math.floor(sum/temp_list.length)
    }

    calculate_avg_weather_type(single_day_data){
        let weather = {};
        let max_weather = single_day_data[0]["weather"][0]["main"]
        let max_count = 1

        for(let i = 0; i < single_day_data.length; i++){
            let name = single_day_data[i]["weather"][0]["main"]
            if (name in weather){
                let count = weather[name] + 1;
                weather[name] = count
            }
            else{
                weather[name] = 1
            }
            if (max_count <= weather[name]){
                max_count = weather[name]
                max_weather = name
            }
        }
        return max_weather;
    }

    forecast_temp_calculator(forecast_data_list){
        // create weather list
        let forecast_days_temp_list = [];
        let forecast_days_weather_type_list = [];

        const chunkSize = 8;
        for(let i = 0; i < forecast_data_list["data"]["list"].length; i += chunkSize) {
            const single_day = forecast_data_list["data"]["list"].slice(i, i + chunkSize);

            // call calculate_avg_temp
            forecast_days_temp_list.push(this.calculate_avg_temp(single_day))
            forecast_days_weather_type_list.push(this.calculate_avg_weather_type(single_day))
        }

        // Only need average forecast data for four days
        this.setState({forecast_temps: forecast_days_temp_list.slice(0,4)});
        this.setState({forecast_weather_types: forecast_days_weather_type_list.slice(0,4)});

    }

    mountCity = async (e, city_name) => {
        this.handleClickCity(city_name)
    }

    handleClickCity = async (city_name) => {
        this.setState({selected_city:city_name})
        let latitude = places_with_coordinates[city_name]["lat"]
        let longitude = places_with_coordinates[city_name]["lon"]

        const current_weather_request = axios.get( `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=dba8fde0096dcdc61ab12bcb7b9c98db&units=metric`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        )
        // forecast request
        const forecast_weather_request  = axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=dba8fde0096dcdc61ab12bcb7b9c98db&units=metric`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        )
        axios
            .all([current_weather_request, forecast_weather_request])
            .then(
                axios.spread((...responses)=>{

                    const current_weather_data = responses[0];
                    const forecast_weather_data = responses[1];

                    this.handle_current_temp(current_weather_data)
                    this.forecast_temp_calculator(forecast_weather_data)

                })
            ).catch(errors =>{
            console.log(errors)
        })

    }

    handle_weather_icon(weather_type){
        return require(`../static/${weather_type}.png`)
    }

    render_city_names = (city_names) =>{
        return city_names.map((city, index)=>{
            return(
                <button  onClick={(event)=>
                {this.mountCity(event, city)}}>{city}</button>
                )
            })
    }

    today_weather_card = () =>{
        return(

                <il className={"today_card"}>
                    <il className={"current-weather"}>Today</il>
                    <ul className={"today_items"}>
                        <il className={"item"}><i id="current-icon" className={icon_file[`${this.state.current_weather_type}`]} ></i></il>
                        <il className={"currents-details"}>
                               <il><h1 style={{fontFamily: 'Kelly Slab', fontSize:'70px'}}>{this.state.current_temp}°</h1></il>
                                <il style={{fontFamily: 'Montserrat', fontSize:'40px'}}>{this.state.current_weather_type}</il>
                        </il>

                       </ul>
                </il>


        )
    }


    render(){
        const {current_day,
            forecast_temps,
            forecast_weather_types}
            = this.state


        return(<div className={'ui two column centered grid'}>
            <div className={'column'}>
                <ul>{this.render_city_names(city_names)}</ul>
                     <il className={"weather_card"}>{this.today_weather_card()}
                      <ForecastDay current_day_index={current_day-1}
                                          days_names={days}
                                          forecast_temp={forecast_temps}
                                          forecast_weather={forecast_weather_types}/>

                     </il>

            </div>
        </div>)
    }
};
export default CurrentWeather;