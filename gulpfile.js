var gulp = require("gulp");
var uglify = require("gulp-uglify");
var obfuscate = require("gulp-obfuscate");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

var rutas = {
  rutaJS: "js/app.js",
  rutaSCSS: "src/assets/scss/main.scss"
}
gulp.task("prepararJS", function(){
  gulp.src(rutas.rutaJS)
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest("public/js"))
})

gulp.task("prepararCSS",function(){
  gulp.src(rutas.rutaSCSS)
    .pipe(sass({
      outputStyle: "compressed"})
    .on("error", sass.logError))
    .pipe(gulp.dest("public/css"))
})

gulp.task("default",function(){
  gulp.watch(rutas.rutaSCSS, ["prepararCSS"]);
})

gulp.task('watchChangesCSS',function(){
    browserSync.init({
        server:{
            baseDir: "./public"
        }
    })

    gulp.watch("assets/scss/main.scss", ["sass-watch"] );
})

gulp.task('sass-watch',['prepararCSS'],function(){
    browserSync.reload();
})
