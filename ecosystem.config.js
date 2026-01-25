/**
 * PM2 Ecosystem Configuration
 * Help Digi School - Frontend Next.js
 *
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 start ecosystem.config.js --env production
 *   pm2 start ecosystem.config.js --env preprod
 */

export default {
  apps: [
    {
      // Application name
      name: 'helpdigischool',

      // Start script
      script: 'node_modules/next/dist/bin/next',
      args: 'start',

      // Working directory
      cwd: './',

      // Number of instances (cluster mode)
      instances: 'max', // Use all available CPUs
      exec_mode: 'cluster',

      // Auto restart on crash
      autorestart: true,

      // Watch for file changes (disable in production)
      watch: false,

      // Max memory before restart
      max_memory_restart: '1G',

      // Environment variables - Development
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },

      // Environment variables - Production
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },

      // Environment variables - Pre-production
      env_preprod: {
        NODE_ENV: 'production',
        PORT: 3000,
      },

      // Logging
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/pm2/error.log',
      out_file: './logs/pm2/out.log',
      merge_logs: true,
      log_type: 'json',

      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,

      // Restart delay
      restart_delay: 4000,

      // Exponential backoff restart delay
      exp_backoff_restart_delay: 100,

      // Max restarts in time window
      max_restarts: 10,
      min_uptime: '10s',

      // Source map support
      source_map_support: true,

      // Node arguments
      node_args: '--max-old-space-size=4096',

      // Interpreter (use node)
      interpreter: 'node',

      // Post deploy hook
      post_update: ['npm install', 'npm run build'],
    },
  ],

  // Deployment configuration
  deploy: {
    // Production deployment
    production: {
      user: 'deploy',
      host: ['production-server.com'],
      ref: 'origin/main',
      repo: 'git@github.com:your-org/helpdigischool.git',
      path: '/var/www/helpdigischool',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      env: {
        NODE_ENV: 'production',
      },
    },

    // Pre-production deployment
    preprod: {
      user: 'deploy',
      host: ['preprod-server.com'],
      ref: 'origin/develop',
      repo: 'git@github.com:your-org/helpdigischool.git',
      path: '/var/www/helpdigischool-preprod',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env preprod',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};