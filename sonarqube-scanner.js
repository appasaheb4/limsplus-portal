const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://localhost:9000/',
    token: 'd7803e500e25a6bf1a427f4f29f0d1622d92f210',
    options: {
      'sonar.sources': './src',
      'sonar.test.inclusions':
        '**/*.test.tsx, **/*.test.ts, **/*.__snapshots__',
      'sonar.exclusions': '**/*.js, **/*.jsx, **/*.ts, **/*.tsx',
      'sonar.inclusions': 'src/**,',
    },
  },

  () => {},
);
