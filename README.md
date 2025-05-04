# Webpack Template

This is a customizable Webpack 5 template designed for efficient project setup and development. It includes configurations for both development and production environments, supporting modern JavaScript, CSS, and HTML workflows.

## Features

- **Development and Production Builds**: Separate configurations for development (`webpack.dev.js`) and production (`webpack.prod.js`) environments.
- **Asset Management**: Handles JavaScript, CSS, and HTML files with appropriate loaders and plugins.
- **Development Server**: Includes a development server with live reloading for a streamlined development experience.

## Getting Started

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/heavy-goose/webpack-template.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd webpack-template
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

## Usage

### Development Server

To start the development server with live reloading:

```bash
npm run dev
```

This will serve the project at `http://localhost:8080/`.

### Building for Production

To create a production build:


```bash
npm run build
```

The output will be in the `dist` directory, ready for deployment.

## Project Structure


```
webpack-template/
├── src/
│   ├── index.js       # Main JavaScript entry point
│   ├── style.css      # Main CSS file
│   └── index.html     # HTML template
├── webpack.config.js  # Common Webpack configuration
├── webpack.dev.js     # Development-specific configuration
├── webpack.prod.js    # Production-specific configuration
├── package.json       # Project metadata and scripts
└── README.md          # This file
```


## Customization

- **Entry Points**: Modify the `entry` field in `webpack.config.js` to change the main entry point.
- **Loaders and Plugins**: Adjust loaders and plugins in the Webpack configuration files to suit your project's needs.
- **Development Server Settings**: Configure the development server settings in `webpack.dev.js`.