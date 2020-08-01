import { WebAuth } from "auth0-js";

const authService = new WebAuth({
  domain: "cclontz.us.auth0.com",
  clientID: "SAxS30MW3J84JTZEu0JYYDIcxHwZZrS2",
  redirectUri: window.location.origin + "/profile",
});

export default authService;
