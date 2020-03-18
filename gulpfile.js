const gulp = require("gulp");


gulp.task('copy-html', function(){
    return gulp.src('*.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
})


gulp.task('images',function(){
    return gulp.src('images/*.{jpg,png}')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
})


gulp.task('data', function(){
    return gulp.src(['*.json','!package.json'])
    .pipe(gulp.dest('dist/data'))
    .pipe(connect.reload());
})
gulp.task('php', function(){
    return gulp.src(['*.php'])
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
})
const concat = require("gulp-concat"); //合并文件
const uglify = require("gulp-uglify");  //压缩

gulp.task('scripts', function(){
    return gulp.src(['*.js','!gulpfile.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
})


const  scss = require('gulp-sass');
const minifyCSS = require('gulp-minify-css');
const rename = require('gulp-rename');

gulp.task('scss1',function(){
    return gulp.src('scss/index.scss')
    .pipe(scss())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})

gulp.task('scss2',function(){
    return gulp.src('scss/reset.scss')
    .pipe(scss())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('reset.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
gulp.task('scss3',function(){
    return gulp.src('scss/fangdajing.scss')
    .pipe(scss())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('fangdajing.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
gulp.task('scss4',function(){
    return gulp.src('scss/login.scss')
    .pipe(scss())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('login.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
gulp.task('scss5',function(){
    return gulp.src('scss/register.scss')
    .pipe(scss())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('register.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
gulp.task('scss6',function(){
    return gulp.src('scss/bootstrap.scss')
    .pipe(scss())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('bootstrap.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})

gulp.task("build", ["copy-html", "images","php", "data","scripts","scss1","scss2","scss3","scss4","scss5","scss6"], function(){
    console.log("项目建立成功");
})

//监听
gulp.task('watch',function(){
        gulp.watch('*.html',['copy-html']);
        gulp.watch('*.{jpg,png}',['images']);
        gulp.watch(['*.json','!package.json'],['data']);
        gulp.watch('*.php',['php']);
        gulp.watch(['*.js','!gulpfile.js'],['scripts']);
        gulp.watch('scss/index.scss',['scss1']);
        gulp.watch('scss/reset.scss',['scss2']);
        gulp.watch('scss/fangdajing.scss',['scss3']);
        gulp.watch('scss/login.scss',['scss4']);
        gulp.watch('scss/register.scss',['scss5']);
        gulp.watch('scss/bootstrap.scss',['scss6']);
})


//gulp-connect   本地启动一个服务器
const connect = require('gulp-connect');
gulp.task('server' , function(){
    connect.server({
        root:'dist', //指定服务器的根目录
        port:8883,
        livereload:true //启动实时刷新
    })
})

//同时执行watch和server这两个任务   设置默认任务  执行gulp
gulp.task('default',['server','watch']);