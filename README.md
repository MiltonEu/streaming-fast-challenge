# Streaming Fast Challenge

This project processes a file containing city information and appends location data using the Google Geocoding API. The processing is done sequentially for /basic project and in parallel in /parallel project.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/streaming-fast-challenge.git
   cd streaming-fast-challenge

2. **Setting up a project**:
- Run following commands, this will install everything needed to setup the project:
    ```sh
    chmod +x init.sh
    ```
  
    ```sh
    ./init.sh
    ```
- Go to .env files and paste your google maps API key like this
 ```
GOOGLE_API_KEY=your-api-key
```
