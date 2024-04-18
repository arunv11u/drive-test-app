// Importing required modules
const http = require("http");
const express = require("express");

// Creating an Express app
const app = express();

// Creating an HTTP server with the Express app
const server = http.createServer(app);

// Event handler for server errors
const errorEventHandler = (error) => {
    // Handling the case where the address is already in use
    if (error.code === "EADDRINUSE") {
        console.error("Address in use, exiting...");

        // Exiting the process
        process.exit(1);
    }
};

// Listening for errors on the server
server.on("error", errorEventHandler);

// Exporting the Express app and the HTTP server
module.exports = { app, server };