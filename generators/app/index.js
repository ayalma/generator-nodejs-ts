
/**
 * Created by ali on 7/22/17.
 */
var Generator = require('yeoman-generator');
module.exports = class extends Generator {
    // note: arguments and options should be defined in the constructor.
    constructor(args, opts) {
        //noinspection JSAnnotator
        super(args, opts);

     /*   // This method adds support for a `--coffee` flag
        this.option('coffee');*/


    }
};

module.exports = Generator.extend({

    initializing() {
        this.scriptSuffix = (this.options.coffee ? ".coffee": ".js");
        console.log(this.options.coffee);

    },

    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'pls enter your lib name',
                default: this.appname
            },
            {
                type: 'input',
                name: 'desc',
                message: 'pls enter description about your app',
                default: ""
            },
            {
                type: 'input',
                name: 'version',
                message: 'pls enter your app version',
                default: '1.0.0'
            },
            {
                type: 'input',
                name: 'main',
                message: 'pls enter your app main entry point',
                default: "index.js"
            }
        ]).then(answers=>{
            this.appname =  answers.name;
            this.version = answers.version;
            this.description = answers.description;
            this.main = answers.main;
        });
    },

    writing(){

        this.fs.copyTpl(this.templatePath('_package.json'),this.destinationPath('package.json'),{name:this.appname,description:this.description,version:this.version,main:this.main,author:'your name'});
        this.fs.copyTpl(this.templatePath('_tsconfig.json'),this.destinationPath('tsconfig.json'));

        this.fs.copyTpl(this.templatePath('.npmignore'),this.destinationPath('.npmignore'));
        this.fs.copyTpl(this.templatePath('.gitignore'),this.destinationPath('.gitignore'));

        this.fs.copyTpl(this.templatePath('_gulpfile.js'),this.destinationPath('gulpfile.js'));

        this.fs.copyTpl(this.templatePath('_app.ts'),this.destinationPath('./src/app.ts'));
        this.fs.copyTpl(this.templatePath('_server.ts'),this.destinationPath('./src/server.ts'));
    }

});
