const dotenv = require('dotenv');

dotenv.config({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master', DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      // eslint-disable-next-line max-len
      'pre-deploy-local': `eval $(ssh-agent -s) && ssh-add ~/.ssh/id_rsa && scp e:/Ya.Practicum/dev/web-plus-pm2-deploy/backend/.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd ~/web-plus-pm2-deploy/backend/ && npm install && npm run build && pm2 restart ecosystem.config.js',
    },
  },
};
