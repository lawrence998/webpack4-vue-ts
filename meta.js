const path = require('path')
const fs = require('fs')
const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vue.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "build": {
      "type": "list",
      "message": "Vue build",
      "choices": [
        {
          "name": "Runtime + Compiler: recommended for most users",
          "value": "standalone",
          "short": "standalone"
        },
        {
          "name": "Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere",
          "value": "runtime",
          "short": "runtime"
        }
      ]
    },
    "router": {
      "type": "confirm",
      "message": "Install vue-router?"
    },
    "vuex":{
      "type": "confirm",
      "message": "Install vuex?"
    },
    vuePropertyDecorator: {
      type: 'list',
      message: 'Install vue-property-decorator or vue-class-component?',
      choices: [
        {
          name: 'Vue-property-decorator (https://github.com/kaorun343/vue-property-decorator)',
          value: 'vue-property-decorator',
          short: 'Vue-property-decorator',
        },
        {
          name: 'Vue-class-component (https://github.com/vuejs/vue-class-component)',
          value: 'vue-class-component',
          short: 'Vue-class-component',
        }
      ],
      required: true,
    },
    mockjs: {
      type: 'confirm',
      message: 'Install mockjs?'
    },
    elementUI: {
      type: 'confirm',
      message: 'Install element-ui?'
    },
    stylus: {
      type: 'confirm',
      message: 'Install stylus?'
    },
    less: {
      type: 'confirm',
      message: 'Install less?'
    },
    "isMobile":{
        "type": "confirm",
        "message": "is Mobile project?"
    },
    "lint": {
      "type": "confirm",
      "message": "Use TSLint to lint your code?"
    },
    "unit": {
      "type": "confirm",
      "message": "Setup unit tests with Karma + Mocha?"
    },
    "e2e": {
      "type": "confirm",
      "message": "Setup e2e tests with Nightwatch?"
    }
  },
  "filters": {
    ".eslintrc.js": "lint",
    ".eslintignore": "lint",
    "tslint.json": "lint",
    "config/test.env.js": "unit || e2e",
    "test/unit/**/*": "unit",
    "build/webpack.test.conf.js": "unit",
    "test/e2e/**/*": "e2e",
    "src/store/**/*": "vuex",
    "src/router/**/*": "router",
    "src/css/min.scss": "isMobile",
    "static/js/lib-flexible.js": "isMobile",
    'src/store/**/*': 'vuex',
    'src/assets/mock/**/*': 'mockjs'
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
  // "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
};