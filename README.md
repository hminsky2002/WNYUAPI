# WNYUAPI

Typescript/Express API for proxying requests to Spinitron for WNYU

Much inspiration taken from the [pdc-service repository](https://github.com/PhilanthropyDataCommons/service)

## Deployment

This API is currently deployed at https://lobster-app-zabc8.ondigitalocean.app/,
using the digital ocean app platform.
NOTE: The environment variable for HOST must be set to '0.0.0.0' in the application
settings in order for digital ocean to pass the HTTP health check
