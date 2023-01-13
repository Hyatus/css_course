const {src,dest,watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

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
    //watch('src/scss/app.scss',css);
}

function tareadefault(){
    console.log('Soy la tarea default')
}

exports.css = css;
exports.dev = dev;
exports.default = series(css,dev);


//series - Se inicia una tarea y hasta que finaliza inicia la siguiente
// exports.default = series(css,dev);
//parallel - todas las tareas inician al mismo tiempo 
