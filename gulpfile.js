// Adiciona os modulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');
const rename = require('gulp-rename');

// Função para compilar o SASS e adicionar os prefixos
function compilaSass() {
  return gulp
  .src('css/scss/**/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
}

// Tarefa de gulp para a função de SASS
gulp.task('sass', function(done){
  compilaSass();
  done();
});

// Função para juntar o JS
function gulpJS() {
  return gulp
  .src('js/main/*.js')
  // .pipe(concat('main.js'))
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(gulp.dest('js/'))
  .pipe(uglify())
  .pipe(rename('simple-scroll.min.js'))
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream())
}

gulp.task('mainjs', gulpJS);

// JS Plugins
function pluginJS() {
  return gulp
  .src([
    'js/plugins/*.js'
  ])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream())
}

gulp.task('pluginjs', pluginJS);

// Função para iniciar o browser
function browser() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

// Tarefa para iniciar o browser-sync
gulp.task('browser-sync', browser);

// Função de watch do Gulp
function watch() {
  gulp.watch('css/scss/**/*.scss', compilaSass);
  gulp.watch('js/main/*.js', gulpJS);
  gulp.watch('js/plugins/*.js', pluginJS);
  gulp.watch(['*.html']).on('change', browserSync.reload);
}

// Inicia a tarefa de watch
gulp.task('watch', watch);

// bibliotecas externas
function bibliotecas() {
  var deps = {
    "jquery": {
        "dist/**/*": ""
    },
  };
  var streams = [];

  for (var prop in deps) {
      console.log("Prepping Scripts for: " + prop);
      for (var itemProp in deps[prop]) {
          streams.push(gulp.src("node_modules/" + prop + "/" + itemProp)
              .pipe(gulp.dest("lib/" + prop + "/" + deps[prop][itemProp])));
      }
  }
  return merge(streams)
  .pipe(browserSync.stream())
}

// Inicia a tarefa de bibliotecas externas
gulp.task("bibliotecas", bibliotecas);

// Tarefa padrão do Gulp, que inicia o watch e o browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs', 'pluginjs', 'bibliotecas'));