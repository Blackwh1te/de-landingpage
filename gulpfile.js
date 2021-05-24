const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sync = require('browser-sync').create();

function clear() {
   return del('dist')
}

function html() {
   return src('src/**.html')
         .pipe(include({
            prefix: '@@'
         }))
         .pipe(htmlmin({
            collapseWhitespace: true
         }))
         .pipe(dest('dist'));
}

function scss() {
   return src('src/scss/**.scss')   
         .pipe(sourcemaps.init({loadMaps: true}))
         .pipe(sass())
         .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
         }))
         .pipe(csso())
         .pipe(concat('style.min.css'))
         .pipe(sourcemaps.write('.'))
         .pipe(dest('dist/css'))
}

function scripts() {
   return src([
      'src/js/**.js'
   ])
   .pipe(sourcemaps.init({loadMaps: true}))
   .pipe(concat('script.min.js')) // Конкатенируем в один файл
	.pipe(uglify()) // Сжимаем JavaScript
	.pipe(sourcemaps.write('.'))
	.pipe(dest('dist/js/')) // Выгружаем готовый файл в папку назначения
}

function images() {
	return src('src/images/src/**/*') // Берём все изображения из папки источника
	.pipe(newer('src/images/dest/')) // Проверяем, было ли изменено (сжато) изображение ранее
	.pipe(imagemin()) // Сжимаем и оптимизируем изображеня
	.pipe(dest('dist/images/')) // Выгружаем оптимизированные изображения в папку назначения
}

function fonts() {
   return src('src/fonts/**/*.{eot,svg,ttf,woff,woff2}')
	.pipe(dest('dist/fonts/'))
}

function serve() {
   sync.init({
      server: './dist',
		notify: false, // Отключаем уведомления
   });

   watch('src/**.html', series(html)).on('change', sync.reload);
   watch('src/scss/**.scss', series(scss)).on('change', sync.reload);  
   watch('src/js/**.js', series(scripts)).on('change', sync.reload); 
   watch('src/images/src/**/*', series(images)).on('change', sync.reload);
   watch('src/fonts/**/*', series(fonts)).on('change', sync.reload);
}

exports.clear = clear;
exports.build = series(clear, html, scss, scripts, images, fonts);
exports.serve = series(clear, html, scss, scripts, images, fonts, serve);