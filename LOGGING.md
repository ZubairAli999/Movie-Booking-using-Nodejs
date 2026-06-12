# Winston Logger Implementation

## Overview
This project uses **Winston** as the logging library to centralize and manage all application logs.

## Installation
Winston has been installed via npm:
```bash
npm install winston
```

## Logger Configuration
The logger is configured in `src/config/logger.js` with the following features:

### Log Levels
- **error**: Application errors (written to both console and error.log)
- **warn**: Warning messages for potentially problematic situations
- **info**: Informational messages (default level)
- **debug**: Debugging information

### Output Locations
1. **Console**: Colorized output to terminal (development friendly)
2. **error.log**: Contains only error-level logs
3. **combined.log**: Contains all logs (info, warn, error)

### Log Format
```
YYYY-MM-DD HH:mm:ss [LEVEL]: message
```

## Usage

### Importing the Logger
```javascript
const logger = require('../config/logger');
```

### Logging Examples
```javascript
// Info level - general operations
logger.info(`Creating movie with data: ${JSON.stringify(req.body)}`);

// Warn level - potential issues
logger.warn(`No movie found for deletion with ID: ${id}`);

// Error level - exceptions and failures
logger.error(`Error creating movie: ${error.message}`);
```

## Files Updated with Logging

### Controllers
- `src/controller/movie-controller.js` - CRUD operations for movies
- `src/controller/user-controller.js` - User management
- `src/controller/auth-controller.js` - Authentication (signup, login, password reset)
- `src/controller/booking-controller.js` - Booking operations
- `src/controller/payment-controller.js` - Payment processing

### Services
- `src/service/movie-service.js` - Movie business logic

### Configuration
- `src/config/db.js` - Database connection logs
- `src/index.js` - Application startup logs

## Log Examples

### Successful Operation
```
2026-06-12 10:15:30 [INFO]: Creating movie with data: {...}
2026-06-12 10:15:31 [INFO]: Movie created successfully with ID: 507f1f77bcf86cd799439011
```

### Error Handling
```
2026-06-12 10:15:32 [ERROR]: Error creating movie: Validation failed
```

### Warning
```
2026-06-12 10:15:33 [WARN]: Movie validation error: {"name": "Movie name is required"}
```

## Best Practices Applied

1. **Consistent Log Levels**:
   - `info` for successful operations and start/end of processes
   - `warn` for validation errors and missing data
   - `error` for exceptions and failures

2. **Contextual Information**:
   - IDs (user, movie, booking, etc.) for traceability
   - Operation type (creating, updating, deleting, fetching)
   - Relevant data for debugging

3. **No Sensitive Data**:
   - Passwords are never logged
   - Only non-sensitive IDs and metadata are included

4. **Log File Management**:
   - Logs directory (`logs/`) is added to `.gitignore`
   - Logs are persisted for troubleshooting

## Viewing Logs

### In Development
Watch logs in real-time while running the app:
```bash
npm run dev
```

### Production Logs
Check log files in the `logs/` directory:
```bash
cat logs/combined.log
cat logs/error.log
```

## Environment Variables
Set `LOG_LEVEL` in your `.env` file to control verbosity (default: 'info'):
```
LOG_LEVEL=debug
```

## Future Enhancements
- Add request/response logging middleware
- Implement log rotation for large files
- Add structured logging for better analytics
- Integration with external logging services (ELK, Cloudwatch, etc.)
