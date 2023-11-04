import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'

const ShellyHTPlus = ({mqtt, useMqtt, useMqttSub, tile }) => {

    const mqtt_client = useMqtt()
    const device_state = useSelector(state => state.DeviceController.data[tile.id], shallowEqual) || {}
    const temperature = device_state[mqtt['temp']]?.tF || 0
    const humidity = device_state[mqtt['humidity']]?.rh || 0

    let backgroundColor = 'cyan'

    useMqttSub(mqtt_client, mqtt['temp'], tile.id)
    useMqttSub(mqtt_client, mqtt['humidity'], tile.id)
    
    if(temperature <= 0) {
        backgroundColor = '#7293c9'
    }

    if(temperature >= 1 && temperature < 33) {
        backgroundColor = '#89bade'
    }

    if(temperature >= 33 && temperature < 50) {
        backgroundColor = '#89bade'
    }

    if(temperature >= 50 && temperature < 60) {
        backgroundColor = '#a6c7ea'
    }

    if(temperature >= 60 && temperature < 70) {
        backgroundColor = '#a9dad1'
    }

    if(temperature >= 70 && temperature < 80) {
        backgroundColor = '#90cfb5'
    }
    if(temperature >= 80 && temperature < 90) {
        backgroundColor = '#febd7d'
    }

    if(temperature >= 90 && temperature < 100) {
        backgroundColor = '#f8b2bc'
    }

    if(temperature >= 100 && temperature < 110) {
        backgroundColor = '#f59598'
    }

    if(temperature >= 110) {
        backgroundColor = '#f59598'
    }

    const circle_style = { 
        position: 'relative', 
        fontWeight: 'bold', 
        fontSize: 43, 
        padding: 0, 
        margin: 10, 
        backgroundColor, 
        width: 110, 
        height: 110
    }

    const temp_style = {
        textShadow: '1px 1px #2b2b2b',
        position: 'absolute', 
        top: 50, 
        left: '%50',
        transform: 'translate(-50%, -50%)'
    }

    if(!device_state[mqtt['temp']]) {
        return (
            <div className="txt_center"><br />
                <div className="button_loader button_loader_l"></div>
                <p>Getting Data...</p>
            </div>
        )
    }

    return (
        <div className="txt_center">
            <div className="circ" style={circle_style} title="Current Temperature">
                <span style={temp_style}>{temperature}</span>
            </div>
            <div>
                <span title="Current Temperature" style={{color: backgroundColor}}>{temperature}&deg;F</span> / <span title="Current Humidity">{humidity}%</span>
            </div>
        </div>
    )
}

export default ShellyHTPlus