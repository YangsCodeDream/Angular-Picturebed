module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options:{
                //separator: ';'
            },
            allInOne: {
                src: ['app/js/**/*.js'],
                dest: 'dest/src-concated/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            buildrelease:{
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min"
                },
                files: [{
                    expand: true,
                    cwd: 'dest/src-concated/js',
                    src: '**/*.js',
                    dest: 'dest/release/js',
                    ext: '.min.js'
                }]
            },
            buildsrc: {
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min"
                },
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: '**/*.js',
                    dest: 'dest/src-main',
                    ext: '.min.js'
                }]
            },
            buildall: {
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min"
                },
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: '**/*.js',
                    dest: 'dest',
                    ext: '.min.js'
                }]
            }
        },
        watch:{
            javascript:{
                files:['src/js/**/*.js'],
                tasks:['concat:allinone','uglify:buildsrc','uglify:buildrelease'],
                options:{
                    spawn:true,
                    interrupt:true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['concat', 'uglify']);
};