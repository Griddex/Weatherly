### Key Considerations for Extensibility

### WEATHERLY-FE

## Folder Structure

1. Adopted a feature-based pattern. Components and routes are aggregates
   with tests, styles in same directory. Future features can be placed
   in folders using this pattern and each feature can grow within it's folders
   ecosystem

## UI Design

1. Adopted mobile-first design but responsive for all screen sizes.
2. Centralized UI elements with symmetric distribution around screen vertical axis (important for mobile)
3. Adopted Flexbox design approach to re-arrange elements on screen resize

## Code Splitting

1. Implemented to enable fast initial load - critical for when application grows.
2. Manage application memory footprint on Client side

## Side Effects

Redux Saga selected because:

1. Event-based compositions of api calls/responses can be achieved if future features required it
2. Api call resiliency with out-of-the-box retries functionality
3. Debouncing added

## Client vs Server Data Processing

There needs to balance between server-side and Client data processing - delegating computation to better server resources vs data flexibility for UI design changes.

1. Decision was made to normalize forecast data on the server to a "forecast data by day" format because data is larger with a future potential to grow. So normalized data format would need no future processing, UI will render

2. Weather data (smaller dataset) was sent to client without any changes to accomodate for future UI updates. Hence some processing was applied to transform to a suitable viewmodel.

### WEATHERLY-BE

## Folder Structure

1. Adopted a service-based pattern. Tests, untilities etc can live in same directory. Excellent structure for evolution into microservices architecture.

## RUNNING THE APPLICATION - WEATHERLY.IO

1. Define environment variable - APPID
2. APPBASEURL=http://api.openweathermap.org/data/2.5
3. Open terminal in root folder (Weatherly) and npm start
