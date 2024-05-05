# Approach

The current csv file is very small, and parsing such files wont have any problem on the UI. But if we assume that this file is in gigabytes then doing it on the frontend is a little problematic, because it can lead to UI being stuck, infinite loading time, dysfunctional website, etc. So I think if we want to handle such big data then we should do it on the backend (a server) rather than doing it on the frontend. The backend will fetch the data from wherever we want, parse it, process it, filter it, etc. And then it can response with the appropriate data that we need. By doing so, we ensure that all the heavy-lifting is done by the server and the frontend is tasked with only showing the data. This will be done asynchronously using `aysnc` `await` i.e, while the data is being processed we can show a loading spinner, so that the user knows the website is fetching data and is functional.

# Tech Stack and Libraries used

Both the backend and frontend is written in TypeScript

## Frontend

-   [React JS (Vite)](https://vitejs.dev/guide/)
-   [Tailwind CSS](https://tailwindcss.com/docs/installation)
-   [ShadCN UI](https://ui.shadcn.com/) for UI Components like button and table
-   [Axios](https://www.npmjs.com/package/axios)

## Backend

-   Node JS
-   Express JS
-   Cors
-   [Papa Parse](https://www.papaparse.com/) for csv parsing

## References Used

-   https://stackoverflow.com/questions/63093207/third-party-api-endpoint-blocked-by-cors-policy-for-localhost-in-react-fetch
-   https://www.tutorialspoint.com/express-js-express-json-function
-   https://stackoverflow.com/a/70175792
