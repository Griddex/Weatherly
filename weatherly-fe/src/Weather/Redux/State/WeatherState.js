var weatherState = {
    data: {
        weather: [],
        main: {
            temp: 0,
            feels_like: 0,
            temp_min: 0,
            temp_max: 0,
            pressure: 0,
            humidity: 0,
        },
        visibility: 0,
        wind: { speed: 0, deg: 0, gust: 0 },
    },
    error: {},
    success: false,
};
export default weatherState;
