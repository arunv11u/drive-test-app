// Importing required modules
const { app, server } = require("./server");
const loader = require("./loader");

// Setting the port for the server
const port = 3000;

// Asynchronous function to initialize the application
async function main() {
    try {
        // Load modules using the loader
        await loader.load(app);

        // Log success message if all modules are loaded successfully
        console.log("All modules loaded successfully!");
    } catch (error) {
        // Log error and exit process if there's an error loading modules
        console.error("Error in loading modules", error);
        process.exit(1);
    }
}

// Call the main function to initialize the application
main();

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server is listening on port : ${port}`);
});