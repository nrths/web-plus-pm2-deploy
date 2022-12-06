const dotenv = require('dotenv');

dotenv.config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
  DEPLOY_REPO,
} = process.env;

module.exports = {
  apps : [{
    name   : "app-frontend",
    script : "./build/index.html"
  }],

  deploy : {
    production : {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'post-deploy' : `cd ~/web-plus-pm2-deploy/frontend/current/frontend/ && npm i && npm run build`,
    }
  }
};
