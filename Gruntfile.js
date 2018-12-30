module.exports = function (grunt) {

    var poLocales = function() {
        var locales = grunt.file.readJSON("src/locale/locales.json");
        var poEditorLocales = {};
        for (var key in locales ) {
            var locale = locales[key];
            var poLocaleName = locale["poEditor"];
            poEditorLocales[poLocaleName] = locale["locale"];
        }
        return poEditorLocales;
    };

    var dataTablesLang = function() {
        var locales = grunt.file.readJSON("src/locale/locales.json");
        var DTLangs = [];
        for (var key in locales ) {
            var locale = locales[key];
            DTLangs.push(locale["dataTables"]);

        }
        return DTLangs.toString();
    };
    
    const sass = require('node-sass');

// Project configuration.
    grunt.initConfig({
        package: grunt.file.readJSON('package.json'),
        pkg: grunt.file.readJSON('package.json'),
        buildConfig: grunt.file.readJSON('BuildConfig.json'),
        projectFiles: [
            '**',
            '**/.*',
            '!**/.gitignore',
            '!vendor/**/example/**',
            '!vendor/**/tests/**',
            '!vendor/**/docs/**',
            '!Images/{Family,Person}/thumbnails/*.{jpg,jpeg,png}',
            //'!Images/{Family,Person}/*.{jpg,jpeg,png}',
            '!composer.lock',
            '!Include/Config.php',
            '!integrityCheck.json',
            '!logs/*.log'
        ],
        clean: {
            skin: ["src/skin/{adminlte,external}"],
            release: ["target"]
        },
        copy: {
            skin: {
                files: [
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        cwd: 'node_modules/admin-lte',
                        src: [
                            '{dist,bootstrap,plugins}/**',
                            '!dist/img',
                            '!plugins/**/*.md',
                            '!plugins/**/examples/**',
                            '!plugins/fullcalendar/**',
                            '!plugins/moment/**',
                            '!plugins/fastclick/**',
                            '!plugins/bootstrap-wysihtml5/**',
                            '!plugins/ckeditor/**',
                            '!plugins/jQueryUI/**',
                            '!plugins/morris/**',
                            '!dist/img/**',
                            '!plugins/**/psd/**'],
                        dest: 'src/skin/adminlte/'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/font-awesome',
                        src: ['{css,fonts,less,scss}/**'],
                        dest: 'src/skin/external/font-awesome/'
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: ['node_modules/fullcalendar/dist/*'],
                        dest: 'src/skin/external/fullcalendar/'
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: ['node_modules/moment/min/*'],
                        dest: 'src/skin/external/moment/'
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: ['node_modules/jquery-photo-uploader/dist/*'],
                        dest: 'src/skin/external/jquery-photo-uploader/'
                    },
                    {
                        expand: true,
                        cwd:'node_modules/ckeditor/',
                        src: ['*.js','*.css','*.json','lang/**/*','adapters/**/*','plugins/**/*','skins/**/*'],
                        dest: 'src/skin/external/ckeditor/'
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: ['node_modules/bootbox/bootbox.min.js'],
                        dest: 'src/skin/external/bootbox/'
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: ['node_modules/bootstrap-toggle/css/bootstrap-toggle.css', 'node_modules/bootstrap-toggle/js/bootstrap-toggle.js'],
                        dest: 'src/skin/external/bootstrap-toggle/'
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: ['node_modules/bootstrap-validator/dist/validator.min.js'],
                        dest: 'src/skin/external/bootstrap-validator/'
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: ['node_modules/jquery-steps/build/jquery.steps.min.js', 'node_modules/jquery-steps/demo/css/jquery.steps.css'],
                        dest: 'src/skin/external/jquery.steps/'
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: ['node_modules/jquery-validation/dist/jquery.validate.min.js'],
                        dest: 'src/skin/external/jquery-validation/'
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: [
                            'node_modules/i18next/dist/umd/i18next.min.js',
                            'node_modules/i18next-xhr-backend/dist/umd/i18nextXHRBackend.min.js'
                        ],
                        dest: 'src/skin/external/i18next/'
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: ['node_modules/bootstrap-show-password/bootstrap-show-password.min.js'],
                        dest: 'src/skin/external/bootstrap-show-password'
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        src: ['node_modules/bootstrap-notify/bootstrap-notify.min.js'],
                        dest: 'src/skin/external/bootstrap-notify'
                    }
                ]
            }
        },
        'curl-dir': {
            datatables: {
                src: ['https://cdn.datatables.net/plug-ins/1.10.12/i18n/{'+dataTablesLang()+'}.json'],
                dest: 'src/locale/datatables'
            },
            fastclick: {
                src: ['https://raw.githubusercontent.com/ftlabs/fastclick/569732a7aa5861d428731b8db022b2d55abe1a5a/lib/fastclick.js'],
                dest: 'src/skin/external/fastclick'
            },
            jqueryuicss: {
                src: [
                    'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css',
                    "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
                ],
                dest: 'src/skin/external/jquery-ui/'
            },
            datatableselect: {
                src: [
                    'https://cdn.datatables.net/select/1.2.2/css/select.bootstrap.min.css',
                    'https://cdn.datatables.net/select/1.2.2/js/dataTables.select.min.js'
                ],
                dest: 'src/skin/adminlte/plugins/datatables/extensions/Select/'
            }
        },
        sass: {
            options: {
                implementation: sass,
                sourceMap: true,
                cacheLocation: process.env['HOME'] + "/node_cache"
            },
            dist: {
              files: {
                  'src/skin/churchcrm.min.css': 'src/skin/churchcrm.scss'
              }
            },
        },
        compress: {
            'zip': {
                options: {
                    archive: 'target/ChurchCRM-<%= package.version %>.zip',
                    mode: "zip",
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '<%= projectFiles %>',
                        dest: 'churchcrm/'
                    }
                ]
            },
            'tar': {
                options: {
                    archive: 'target/ChurchCRM-<%= package.version %>.tar.gz',
                    mode: "tgz",
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '<%= projectFiles %>',
                        dest: 'churchcrm/'
                    }
                ]
            },
            'demo': {
                options: {
                    archive: 'target/Demo-ChurchCRM-<%= package.version %>.tar.gz',
                    mode: "tar",
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'demo/',
                        src: [
                            '**/*'
                        ]
                    }
                ]
            }
        },
        generateSignatures: {
            sign: {
                version: '<%= package.version %>',
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: [
                        '**/*.php',
                        '**/*.js',
                        '**/.htaccess',
                        '!**/.gitignore',
                        '!vendor/**/example/**',
                        '!vendor/**/tests/**',
                        '!vendor/**/docs/**',
                        '!Images/Person/thumbnails/*.jpg',
                        '!composer.lock',
                        '!Include/Config.php',
                        '!integrityCheck.json'
                    ],
                    dest: 'churchcrm/'
                }]
            }
        },
        poeditor: {
            getPOTranslations: {
                download: {
                    project_id: '<%= poeditor.options.project_id %>',
                    filters: ["translated"],
                    tags: '<%= package.version %>',
                    type: 'po', // export type (check out the doc)
                    dest: 'src/locale/textdomain/?/LC_MESSAGES/messages.po'
                    // grunt style dest files
                }
            },
            getMOTranslations: {
                download: {
                    project_id: '<%= poeditor.options.project_id %>',
                    filters: ["translated"],
                    tags: '<%= package.version %>',
                    type: 'mo', // export type (check out the doc)
                    dest: 'src/locale/textdomain/?/LC_MESSAGES/messages.mo'
                    // grunt style dest files
                }
            },
            getJSTranslations: {
                download: {
                    project_id: '<%= poeditor.options.project_id %>',
                    filters: ["translated"],
                    tags: '<%= package.version %>',
                    type: 'key_value_json', // export type (check out the doc)
                    dest: 'locale/JSONKeys/?.json'
                    // grunt style dest files
                }
            },
            options: {
                project_id: '77079',
                languages: poLocales(),
                api_token: '<%= buildConfig.POEditor.token %>'
            }
        },
        updateVersions: {
            update: {
                version: '<%= package.version %>'
            }
        },
        exec: {
            updatechangelog: {
                cmd: "gren changelog --generate --override --token=<%= buildConfig.GitHub.token %>"
            }
        }
    });

    grunt.registerTask('hash', 'gets a file hash', function (arg1) {
        var sha1 = require('node-sha1');
        grunt.log.writeln(sha1(grunt.file.read(arg1, {encoding: null})));
    });


    grunt.registerMultiTask('generateSignatures', 'Generates SHA1 signatures of the release archive', function () {

        var sha1 = require('node-sha1');
        var signatures = {
            "version": this.data.version,
            "files": []
        };
        this.files.forEach(function (filePair) {
            var isExpandedPair = filePair.orig.expand || false;

            filePair.src.forEach(function (src) {
                if (grunt.file.isFile(src)) {
                    signatures.files.push({
                        "filename": src.substring(4),
                        "sha1": sha1(grunt.file.read(src, {encoding: null}))
                    });
                }
            });
        });
        signatures.sha1 = sha1(JSON.stringify(signatures.files));
        grunt.file.write("src/signatures.json", JSON.stringify(signatures));
    });

    grunt.registerTask('updateFromPOeditor', 'Description of the task', function (target) {
        grunt.config('clean', {pofiles: ["src/locale/*/**/*.po", "src/locale/*/**/*.mo", "locale/JSONKeys/*.json"]});
        grunt.task.run(['clean:pofiles']);
        grunt.loadNpmTasks('grunt-poeditor-ab');
        grunt.task.run(['poeditor']);
    });

    grunt.registerTask('genLocaleJSFiles', '', function () {
        var locales = grunt.file.readJSON("src/locale/locales.json");
        var poEditorLocales = {};
        for (var key in locales ) {
            var localeConfig = locales[key];
            var locale = localeConfig["locale"];
            var countryCode = localeConfig["countryCode"];
            var languageCode = localeConfig["languageCode"];
            var enableFullCalendar = localeConfig["fullCalendar"];
            var enableDatePicker = localeConfig["datePicker"];
            var enableSelect2 = localeConfig["select2"];

            var tempFile = 'locale/JSONKeys/'+locale+'.json';
            var poTerms = grunt.file.read(tempFile);
            if (poTerms == "") {
                poTerms = "{}";
            }
            var jsFileContent = '// Source: ' + tempFile;
            jsFileContent = jsFileContent + "\ntry {window.CRM.i18keys = " + poTerms + ";} catch(e) {};\n";

            if (enableFullCalendar) {
                var tempLangCode = languageCode.toLowerCase();
                if (localeConfig.hasOwnProperty("fullCalendarLocale")) {
                    tempLangCode = localeConfig["fullCalendarLocale"];
                }
                tempFile = 'node_modules/fullcalendar/dist/locale/'+tempLangCode+'.js';
                var fullCalendar = grunt.file.read(tempFile);
                jsFileContent = jsFileContent + '\n// Source: ' + tempFile;
                jsFileContent = jsFileContent + '\n' + "try {"+fullCalendar+"} catch(e) {};\n";
            }
            if (enableDatePicker) {
                tempFile = 'node_modules/admin-lte/plugins/datepicker/locales/bootstrap-datepicker.'+languageCode+'.js';
                var datePicker = grunt.file.read(tempFile);
                jsFileContent = jsFileContent + '\n// Source: ' + tempFile;
                jsFileContent = jsFileContent + '\n' + "try {"+datePicker+"} catch(e) {};\n"
            }
            if (enableSelect2) {
                tempFile = 'node_modules/admin-lte/plugins/select2/i18n/'+languageCode+'.js';
                jsFileContent = jsFileContent + '\n// Source: ' + tempFile;
                var select2 = grunt.file.read(tempFile);
                jsFileContent = jsFileContent + '\n' + "try {"+select2+"} catch(e) {}"
            }
            grunt.file.write('src/locale/js/'+locale+'.js', jsFileContent );
        }
    });

    grunt.registerMultiTask('updateVersions', 'Update Files to match NPM version', function () {
        var moment = require('moment');
        var version = this.data.version;

        // php composer
        var file = 'src/composer.json';

        var curFile = grunt.file.readJSON(file);
        curFile.version = version;
        curFile.time =  moment().format("YYYY-MM-DD HH:MM:SS");
        var stringFile = JSON.stringify(curFile, null, 4);
        grunt.file.write(file, stringFile);

        // db update file
        file = 'src/mysql/upgrade.json';
        curFile = grunt.file.readJSON(file);
        if (curFile.current.dbVersion !== version) {
            console.log("updating database upgrade file to: " + version);
            curFile.current.versions.push(curFile.current.dbVersion);
            curFile.current.dbVersion = version;
            stringFile = JSON.stringify(curFile, null, 4);
            grunt.file.write(file, stringFile);
        }
    });

    grunt.registerTask('cleanupLocalGit', 'clean local git', function () {
       grunt.loadNpmTasks('grunt-git');
       grunt.config('gitreset' ,{
          task: {
            options: {
              mode: "hard"
            }
          }
        });

       grunt.config('gitcheckout', {
          master: {
            options: {
              branch: "master"
            }
          }
        });

        grunt.config('gitpull', {
          master: {
            options: {
              branch: "master"
            }
          }
        });
      grunt.task.run('gitreset');
      //  make sure we're on master
      grunt.task.run('gitcheckout:master');
      //  ensure local and remote master are up to date
      grunt.task.run('gitpull:master');
      //  display local master's commit hash
    });
    
    
    grunt.registerTask('downloadLatestRelease', 'dl R', function () {
      var targetURL = "http://demo.churchcrm.io/builds/master/ChurchCRM-" + grunt.config.get("package.version") + "-" + grunt.config.get('gitlog.master.results')[0].hash.substring(0,7) + ".zip";
      var downloadTarget = "download/ChurchCRM-" + grunt.config.get("package.version") + ".zip";
      grunt.config('http', {
        demoRelease: {
         options: {
           url: targetURL ,       
           gzip: true,
           encoding: null
         },
         dest:  downloadTarget
      }
      });
      
      grunt.task.run('http:demoRelease');
     
    });
    
    grunt.registerTask('createRelease','make release', function() {
      grunt.loadNpmTasks('grunt-github-releaser');
      grunt.config('github-release', {
          options: {
            repository: 'churchcrm/crm',
            auth: {
              user: 'crossan007',
              password: grunt.config.get("buildConfig.GitHub.token")
            },
            release: {
              tag_name: grunt.config.get('package.version'),
              name: grunt.config.get('package.version'),
              body: grunt.config.get('package.version'),
              draft: true, 
              prerelease: true
            }
          },
          files: {
            'src': ["download/ChurchCRM-" + grunt.config.get("package.version") + ".zip"],
          },
        });
      grunt.task.run('github-release');
      
    });
    
    
    grunt.registerTask('doTheRelease', 'Publish the latest release', function() {
      grunt.loadNpmTasks('grunt-confirm');
      grunt.loadNpmTasks('grunt-git');
      grunt.loadNpmTasks('grunt-http')
      
      //  ensure local code is clean
      grunt.config('confirm',{
        startRelease: {
          options: {
            question: "Are you sure you want to start this release?",
            input: '_key:y'
          }
        },
        tagRelease: {
          options: {
            question: function() {
              return "Are you sure you want to release " + grunt.config.get('gitlog.master.results')[0].hash + " as " + grunt.config.get('package.version')+"?";
            },
            input: '_key:y'
          }
        }
      });
      
       grunt.config('gitlog',{
       master: {
         options: {
           prop: "gitlog.master.results",
           number: 1
         }
       }
     });

      grunt.task.run('confirm:startRelease');
      grunt.task.run('cleanupLocalGit');
      grunt.task.run('gitlog');
      grunt.task.run('confirm:tagRelease');
      grunt.task.run('downloadLatestRelease');
      grunt.task.run('createRelease');
      //  create github tag at current hash
      
      
      //  check for / wait for build to complete on demo site
      //  download zip archive from demo site
      //  calculate SHA1 of zip archive
      //  create github release
      //    add release notes
      //    add SHA hash of archive
      //    add zip archive
      //  close GitHub milestone
      //  create a new GitHub milestone
      //  create new branch for next-version
      //    updateversions
      //    gen-changelogs
      //    commit updates to new branch
      //    push branch, and create PR
      //  PR from master -> develop
      
    });


    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-poeditor-ab');
    grunt.loadNpmTasks('grunt-exec');
    
}
