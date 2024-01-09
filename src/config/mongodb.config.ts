import { urlencoded } from "express";
import { Config } from "../../types/configTypes/index";

const config: Config = {
  development: {
    mongoURI: 'mongodb+srv://ashnasaju2499:<password>@cluster0.rwtcacs.mongodb.net/?retryWrites=true&w=majority', // Replace <password> with your actual password
    port: 3000,
    secretKey: 'Your_secret_key',
  },
  production: {
    mongoURI: '',
    port: 8000,
    secretKey: 'Your_secret_key',
  }
};
export default config;