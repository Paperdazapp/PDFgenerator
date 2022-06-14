alerts:
- rule: DEPLOYMENT_LIVE
- rule: DEPLOYMENT_FAILED
name: paperdaz-admin
region: fra
services:
- build_command: npm run build --force
  environment_slug: node-js
  github:
    branch: new-dev-1
    deploy_on_push: true
    repo: Paperdazapp/SuperAdminReact
  http_port: 8080
  instance_count: 1
  instance_size_slug: basic-xxs
  name: superadminreact
  routes:
  - path: /
  run_command: npm start
  source_dir: /