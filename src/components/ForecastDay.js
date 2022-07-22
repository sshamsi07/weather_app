import React from "react";
import '../forecast_stylesheet.css';
import {icon_file} from "../static/icon_file";


class ForecastDay extends React.Component {
    constructor() {
        super();
        this.handle_weather_icon = this.handle_weather_icon.bind(this)
    }
    handle_weather_icon(weather_type){
        console.log("line 13")
        console.log(weather_type)
        return require(`../static/${weather_type}.png`)

    }


    render() {
        let day = this.props.current_day_index
        let temp = this.props.forecast_temp
        //let weathers = this.props.forecast_weather
        console.log("line 21")
        console.log(this.props.forecast_weather)
        //console.log(weathers[0])
        let weather_type = ['', '', '', '']
        weather_type = this.props.forecast_weather
            return (<div>
                <div className="ui horizontal segments" style={{borderTop: '4px solid white'}}>
                    <div className="leftsegment">
                        <h2 className={"names"}>{this.props.days_names[(day + 1) % 7]}</h2>
                        {/*<img className={'forecast-image'} src={this.handle_weather_icon(weather_type[0])}*/}
                        {/*     alt={"weather image"} align={'center'}/>*/}
                        <i id="icon" className={icon_file[`${weather_type[0]}`]}></i>

                        <h3 className={'temp-font'}>{temp[0]}°</h3>

                    </div>
                    <div className="secondsegment">
                        <h2 className={"names"}>{this.props.days_names[(day + 2) % 7]}</h2>
                        {/*<img className={'forecast-image'} src={this.handle_weather_icon(weather_type[1])}*/}
                        {/*     alt={"weather image"} align={'center'}/>*/}
                        <i id="icon" className={icon_file[`${weather_type[1]}`]}></i>
                        <h3 className={'temp-font'}>{temp[1]}°</h3>
                    </div>
                    <div className="secondsegment">
                        <h2 className={"names"}>{this.props.days_names[(day + 3) % 7]}</h2>
                        {/*<img className={'forecast-image'} src={this.handle_weather_icon(weather_type[2])}*/}
                        {/*     alt={"weather image"} align={'center'}/>*/}
                        {console.log("line 48")}
                        {console.log(icon_file["rain"])}
                        <i id="icon" className={icon_file[`${weather_type[2]}`]}></i>
                        <h3 className={'temp-font'} >{temp[2]}°</h3>
                    </div>
                    <div className="lastsegment">
                        <h2 className={"names"}>{this.props.days_names[(day + 4) % 7]}</h2>
                        {/*<img className={'forecast-image'} src={this.handle_weather_icon(weather_type[3])}*/}
                        {/*     alt={"weather image"} align={'center'}/>*/}
                        <i id="icon" className={icon_file[`${weather_type[3]}`]}></i>
                        <h3 className={'temp-font'} >{temp[3]}°</h3>
                    </div>
                </div>
            </div>);



        }

}
export default ForecastDay;