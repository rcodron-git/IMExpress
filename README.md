# IMExpress

IMExpress is a proof of concept on how to use the INGRAM MICRO API.  
This project is **NON-OFFICIAL** and **no** support will be provided.  

**At this time, I won't add any new features to this project.** it's provide as it.  

**WARNING** this project is not for production, only for test  

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Connect to the API to understand how
- Using EXPRESS JS as backend to communicate with the API
- VueJS as front to see the results

## Project Structure

The project is organized into two main directories:

- **backend**: Contains the server-side code responsible for handling API requests, managing database interactions, and implementing the core logic of the application.

- **frontend**: Houses the client-side code, including the user interface components, styles, and scripts that run in the user's browser.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/rcodron-git/IMExpress.git
   ```

2. **Navigate to the backend directory and install dependencies:**

   ```bash
   cd IMExpress/backend
   npm install
   ```
   Modify the file env-example and fill with your information, you'll get in the account

3. ***Start the backend server:***

   ```bash
   npm start
   ```
   Check if the backend is running on http://localhost:5000, you'll normally saw 
   ## Express
   welcome to express


4. ***Navigate to the frontend directory and install dependencies:***

```bash
cd ../frontend
npm install
```
## Usage
1. ***Start the frontend development server:***

   ```bash
   npm run dev
   ```
   
2. ***Access the application:***
   Open your browser and navigate to http://localhost:5173 (could be an other port check on the console where you start the frontend) to use IMExpress.


3. ***How to start:***
Go on the right site, and click on Login, It will connect you to get a token. This token is store on your session.
You'll see the new pages where you'll be able to test and saw how it's handle and what kind of information.
All the datas are from the sandbox and the account of test. Always use the url 'sandox' for your requests, except for the Auth
You can test with your Client ID and Client Secret to generate the token and after use the default IM_CUSTOMER_NUMBER for the test. 
This is an example of .env

````
CLIENT_ID='xxxaaabbbpppp'
CLIENT_SECRET='wwwwnnnnnwwwwww'
AUTH_URL="https://api.ingrammicro.com/oauth/oauth20/token"
IM_CUSTOMER_NUMBER=20-222222
IM_COUNTRY_CODE=US
IM_SENDERID="MY_SANDBOX_APP"
````

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

For more information, visit the IMExpress GitHub repository.


