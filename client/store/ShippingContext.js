import {React, createContext, useState} from 'react'

const ShippingContext = createContext({
    address: "",
    country: "",
    city: "",
    zip: "",
    allIn: false,
    setAll: function(bool) {},
    getShippingAddress: function(){},
    setShippingAddress: function(address){},
    getShippingCity: function(){},
    setShippingCity: function(city){},
    getShippingCountry: function(){},
    setShippingCountry: function(country){},
    getShippingZip: function(){},
    setShippingZip: function(zip){},
    checkAllIn: function() {}

})

export function ShippingContextProvider(props) {
    const [address, setAddress] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [zip, setZip] = useState("")
    const [allIn, setAllIn] = useState(false)

    function checkAllInHandler() {
        if (address==="" || country === "" || city === "" || zip === "") {
            setAllIn(false)
        } else {
            setAllIn(true)
        }
    }

    function setAllHandler(bool) {
        setAllIn(bool)
    }

    function getShippingAddressHandler() {
        return address
    }

    function setShippingAddressHandler(address) {
        setAddress(address)
    }

    function getShippingCountryHandler() {
        return country
    }

    function setShippingCountryHandler(country) {
        setCountry(country)
    }

    function getShippingCityHandler() {
        return city
    }

    function setShippingCityHandler(city) {
        setCity(city)
    }

    function getShippingZipHandler() {
        return zip
    }

    function setShippingZipHandler(zip) {
        setZip(zip)
    }

    const context = {
        address: address,
        country: country,
        city: city,
        zip: zip,
        allIn: allIn,
        setAll: setAllHandler,
        getShippingAddress: getShippingAddressHandler,
        setShippingAddress: setShippingAddressHandler,
        getShippingCountry: getShippingCountryHandler,
        setShippingCountry: setShippingCountryHandler,
        getShippingCity: getShippingCityHandler,
        setShippingCity: setShippingCityHandler,
        getShippingZip: getShippingZipHandler,
        setShippingZip: setShippingZipHandler,
        checkAllIn: checkAllInHandler
    }

    return <ShippingContext.Provider value={context}>
        {props.children}
    </ShippingContext.Provider>

}

export default ShippingContext
