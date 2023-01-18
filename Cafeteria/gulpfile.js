const {src,dest,watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');



//IMAGENES 
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function imagenes(done){
    src('src/img/**/*')
        .pipe(imagemin())
        .pipe(dest('build/img'))
    done();    
}

function versionWebp(){
    // De todas la imagenes que encuentre con extensión .png y jpg
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'))
}

function versionAvif(){
    const opciones = {
        quality:50
    }
    // De todas la imagenes que encuentre con extensión .png y jpg
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
}


function css(done){
    // Compilar SASS
    // PASOS:
    // 1 -Identificar archivo
    // 2 - Compilar
    // 3 - Guardar el CSS 
    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'))
    done();    
}


function dev(){
    // toma 2 valores: qué reviso  y función a ejecutar
    watch('src/scss/**/*.scss',css)
    watch('src/img/**/*',imagenes)
    //watch('src/scss/app.scss',css);
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes,versionWebp,versionAvif, css,dev);


//series - Se inicia una tarea y hasta que finaliza inicia la siguiente
// exports.default = series(css,dev);
//parallel - todas las tareas inician al mismo tiempo 
