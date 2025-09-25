import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting Python service for recipe generation...');

// Path to the Python service file
const pythonServicePath = path.join(__dirname, 'python_service.py');

// Start the Python service
const pythonProcess = spawn('python', [pythonServicePath]);

pythonProcess.stdout.on('data', (data) => {
  console.log(`Python service: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`Python service error: ${data}`);
});

pythonProcess.on('close', (code) => {
  console.log(`Python service exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Stopping Python service...');
  pythonProcess.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Stopping Python service...');
  pythonProcess.kill();
  process.exit();
});