const { exec } = require('child_process');
exec('sh ./setup.sh', (error, stdout, stderr) => {
  console.log({ error });
  if (error !== null) {
    console.log('exec error', { error });
  }
});
