# Bike Lane Picker Frontend

https://bike-lane-picker-frontend.vercel.app/

An app to pick spots on a map (primarily around Philadelphia).

It is written in React, Vite, Typescript, and Tailwind
and with a Supabase backend.

## Getting Started

### Requirements
- [Node v22.3.0](https://nodejs.org/en)
- [Docker + Docker Desktop](https://www.docker.com/get-started/)

### How to run locally - Frontend
To get started with the frontend - should be as simple
as running these commands:

```shell
npm i
npm run dev
```

### How to run locally - Backend (Local Supabase)
For local development, a local instance of Supabase
is needed. This is how to start it up.
```shell
npx supabase start
```

You also need to set up some environment variables
to get it to work properly. So do the following:

1) Make a `.env` file in the root of the project
2) Run `npx supabase status` and note down the
`API_URL` and `anon key` values
3) Make the .env file look like this:
```
SUPABASE_URL=<What you got in `API_URL`>
SUPABASE_ANON_KEY=<What you got in `anon key`>
```


### Webstorm Setup
For Development, I'm primarily using Webstorm to code.
There are a few steps that can be done to make development
easier on it.

#### Tailwind 4 Support
Tailwind 4 is not naturally supported by Webstorm out of the
box. [Here's](https://youtrack.jetbrains.com/issue/WEB-70442/Support-Tailwind-CSS-4#focus=Comments-27-11192433.0-0) a thread with instructions on how to set it up.

#### Local Database Setup
For local development, it is handy to have a local instance
of Supabase's Database. Below is an image of my Webstorm's
database configuration.

The User, Password, and Database are all just `postgres`

<img src="media/webstorm_database_connection_setup.png" alt="Image of how I setup the Webstorm database connection">

## Contributing
Contributions of any kind are always welcome! Whether it's
code contributions, issues found, or even just a suggestions
all is welcome!

## License
This code is free to use under the terms of the MIT license. See [LICENSE](https://github.com/NicholasQNguyen/bike_lane_picker_frontend/blob/main/LICENSE).

## Contact
Hana Nguyen - shobico8@gmail.com

Project Link: https://github.com/NicholasQNguyen/bike_lane_picker_frontend

## Acknowledgement
This project is primarily designed to aid [Philly Bike Action!](https://bikeaction.org/),
a non-profit in Philadelphia, PA that advocates for safer streets
for all! Please support their mission!