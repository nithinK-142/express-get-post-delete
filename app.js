const http = require('http');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const options = {
  hostname: 'localhost',
  port: 8000,
};

function performRequest(method, key, value = null) {
  if (method === 'POST' && value === null) {
    rl.close();
    return;
  }

  const req = http.request(
    {
      ...options,
      method,
      path: `/api/data/${key}`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          console.log(`${method} Response:`);
          console.log(JSON.stringify(parsedData, null, 2));
        } catch (error) {
          console.error(`${method} Error: Invalid JSON response`);
        }
        rl.close();
      });
    }
  );

  req.on('error', (error) => {
    console.error(`${method} Error: ${error.message}`);
    rl.close();
  });

  if (method === 'POST') {
    req.write(JSON.stringify({ value }));
  }

  req.end();
}

rl.question(
  'Enter action (GET/POST/DELETE or 1 -> GET, 2 -> POST, 3 -> DELETE): ',
  (action) => {
    action = action.toLowerCase();
    const methodMap = { get: 'GET', post: 'POST', delete: 'DELETE', '1': 'GET', '2': 'POST', '3': 'DELETE' };

    if (methodMap.hasOwnProperty(action)) {
      const method = methodMap[action];
          console.log(`Test Data -> Home, Billy, Harry, Darth, Sherlock`);
      rl.question(`Enter key for ${method}: `, (key) => {
        if (method === 'POST') {
          rl.question('Enter value for POST: ', (value) => {
            performRequest(method, key, value);
          });
        } else {
          performRequest(method, key);
        }
      });
    } else {
      console.log('Invalid action. Please enter GET, POST, DELETE, 1, 2, or 3.');
      rl.close();
    }
  }
);

// es6
// import http from 'http';
// import readline from 'readline';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const options = {
//   hostname: 'localhost',
//   port: 8000,
// };

// const makeRequest = (method, key, value = null) => {
//   const headers = {
//     'Content-Type': 'application/json',
//   };

//   const requestOptions = {
//     ...options,
//     method,
//     path: `/api/data/${key}`,
//     headers,
//   };

//   const req = http.request(requestOptions, (res) => {
//     let data = '';

//     res.on('data', (chunk) => {
//       data += chunk;
//     });

//     res.on('end', () => {
//       handleResponse(method, data);
//     });
//   });

//   req.on('error', (error) => {
//     handleError(method, error);
//   });

//   if (method === 'POST') {
//     req.write(JSON.stringify({ value }));
//   }

//   req.end();
// };

// const handleResponse = (method, data) => {
//   try {
//     const parsedData = JSON.parse(data);
//     console.log(`${method} Response:`);
//     console.log(JSON.stringify(parsedData, null, 2));
//   } catch (error) {
//     console.error(`${method} Error: Invalid JSON response`);
//   }
//   rl.close();
// };

// const handleError = (method, error) => {
//   console.error(`${method} Error: ${error.message}`);
//   rl.close();
// };

// rl.question('Enter action (GET/POST/DELETE or 1 -> GET, 2 -> POST, 3 -> DELETE): ', (action) => {
//   action = action.toLowerCase();
//   const methodMap = { get: 'GET', post: 'POST', delete: 'DELETE', '1': 'GET', '2': 'POST', '3': 'DELETE' };

//   if (methodMap.hasOwnProperty(action)) {
//     const method = methodMap[action];
//     console.log(`Test Data -> Home, Billy, Harry, Darth, Sherlock`);
//     rl.question(`Enter key for ${method}: `, (key) => {
//       if (method === 'POST') {
//         rl.question('Enter value for POST: ', (value) => {
//           makeRequest(method, key, value);
//         });
//       } else {
//         makeRequest(method, key);
//       }
//     });
//   } else {
//     console.log('Invalid action. Please enter GET, POST, DELETE, 1, 2, or 3.');
//     rl.close();
//   }
// });

