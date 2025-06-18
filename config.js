// Google Calendar Configuration
const CALENDAR_CONFIG = {
    CALENDAR_ID: 'c_d50ea02d93d3f4550a3851ca08882e347c006117d02f302c4f2010cb86aa9f89@group.calendar.google.com',
    //restricted to http for CAIR public google calendar
    API_KEY: 'AIzaSyBYBTzUSpumIfrOK4QGMl2DRX4wrGL_5w4',
    
    MAX_RESULTS: 6,
    
    SHOW_PAST_EVENTS: false
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CALENDAR_CONFIG;
} 