import React, { Component } from "react";
import {Alert} from "react-bootstrap";
import "./Flight.css";
import axios from 'axios';

const airlines = [
	"American Airlines AA",
	"United Airlines UA",
	"Delta Airlines DL",
	"Southwest Airlines WN", 
	"Air Canada AC", 
	"ANA NH",
	"Air France AF",
	"Alaska Airlines AS", 
	"British Airways BA",
	"Spirit Airlines NK",
	"Frontier Airlines F9"
]
let _airline, _airlinepicked

class Autocomplete extends Component {
	
	get value() {
        return this.refs.inputAirline.value
	}

	set value(inputValue) {
		this.refs.inputAirline.value = inputValue
	}

	render() {
		return (
			<div>
				<input ref="inputAirline"
					   type="text" 
					   list="airlines" />
				<datalist id="airlines">
					{this.props.options.map(
						(opt, i) => 
						<option key={i}>{opt}</option>)}
				</datalist>
			</div>
        )
        
	}
}

class Flight extends Component {
    // Setting the component's initial state
    state = {
        airline: "",
        flightnumber: "",
        terminal: "",
        gate: "",
    };

    
    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;
        console.log(value);
        console.log(_airline.value);console.log(_airline.value.slice(_airline.value.length-2,_airline.value.length))
        // Updating the input's state
        this.setState({
            airline: _airline.value.slice(_airline.value.length - 2, _airline.value.length),
            [name]: value
        });
        console.log(this.state.airline); console.log(this.state.flightnumber);
    };

    handleFormSubmit = event => {
        // Preventing  the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        console.log(event.target)
        console.log(this.state.airline); console.log(this.state.flightnumber);
    

        var today = new Date()
        console.log(today.getDate())
        const airline = this.state.airline
        const flightNumber = this.state.flightnumber
        const url = 'https://cors-anywhere.herokuapp.com/' +
                    'https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/' + 
                    airline + '/' + flightNumber + 
                    '/dep/' + '/'+(today.getFullYear()) +'/' + (today.getMonth() + 1)+'/'+(today.getDate())+
                    '?appId=c20436de&appKey=3902cfe4a98c5174174edc498a8aad35';
        
        return axios.get(url)
            .then(response => {
                this.setState({ gate:response.data.flightStatuses[0].airportResources.departureGate})
                this.setState({terminal:response.data.flightStatuses[0].airportResources.departureTerminal})
                console.log(this.state.terminal);console.log(this.state.gate)
            })
            .catch(error => {alert("Invalid Flight Info")});
            //  {<Alert bsStyle="warning">
            //     <strong>Holy guacamole!</strong> Invalid Flight Info!
            //     </Alert>});
    };

    render() {
        // Notice how each input has a `value`, `name`, and `onChange` prop
        return (
            <div>
                 <img className="background" src="https://lifetomyfullest.files.wordpress.com/2014/04/running-through-airport.jpg" alt="running through airport" height="100%" width="100%" />
                
                <form className="form">
                    <p>
                        Hello! Gathering Terminal and Gate Info for {this.state.airline} {this.state.flightnumber}
                    </p>
                    <label htmlFor = "airline" >   Airline Name </label>
                     <Autocomplete options = {airlines}
                    ref = {input => _airline = input}/>
                    <label>   Flight Number </label>
                    <input
                        value={this.state.flightnumber}
                        name="flightnumber"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Flight Number"
                    />
                    <button className="btn btn-info" type="submit"onClick={this.handleFormSubmit}>Submit</button>
                    <p>
                        Your oder will be delivered at Terminal {this.state.terminal} Gate {this.state.gate}
                    </p>
                </form>                   
           </div>
        );
    }
}

export default Flight;
