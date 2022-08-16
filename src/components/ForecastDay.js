import React from "react";
import '../forecast_stylesheet.css';
import {icon_file} from "../static/icon_file";


class ForecastDay extends React.Component {
    constructor() {
        super();
        this.handle_weather_icon = this.handle_weather_icon.bind(this)
    }
    handle_weather_icon(weather_type){
        return require(`../static/${weather_type}.png`)

    }


    render() {
        let day = this.props.current_day_index
        let temp = this.props.forecast_temp
        let weather_type = ['', '', '', '']
        weather_type = this.props.forecast_weather
            return (
                     <il className={"forecast_cards"}>
                                <il className={"each_card"}>   <h2 className={"names"}>{this.props.days_names[(day + 1) % 7]}</h2>
                        <i id="icon" className={icon_file[`${weather_type[0]}`]}></i>

                        <h3 className={'temp-font'}>{temp[0]}°</h3></il>
                                <il className={"each_card"}> <h2 className={"names"}>{this.props.days_names[(day + 2) % 7]}</h2>

                        <i id="icon" className={icon_file[`${weather_type[1]}`]}></i>
                        <h3 className={'temp-font'}>{temp[1]}°</h3></il>
                                <il className={"each_card"}> <h2 className={"names"}>{this.props.days_names[(day + 3) % 7]}</h2>
                        <i id="icon" className={icon_file[`${weather_type[2]}`]}></i>
                        <h3 className={'temp-font'} >{temp[2]}°</h3></il>

                    <il className={"each_card"}>
                            <h2 className={"names"}>{this.props.days_names[(day + 4) % 7]}</h2>
                        <i id="icon" className={icon_file[`${weather_type[3]}`]}></i>
                        <h3 className={'temp-font'} >{temp[3]}°</h3>
                    </il> </il>
            );
        }

}
export default ForecastDay;
