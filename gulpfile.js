import { src, dest, watch, series} from 'gulp' // src donde estan los archivos dest donde los vas a alojar
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
// series permite ejecutar una tarea y depues otra

const sass = gulpSass(dartSass) // se une sass y gulpSass

export function js(done){
    src('src/js/app.js')
        .pipe(dest('build/js'))
    done()
}

export function css(done){
    src('src/scss/app.scss', {sourcemaps: true}) // .pipe es para ir ejecutando tareas
        .pipe( sass().on('error', sass.logError) ) // para los errores dentro de sass
        .pipe( dest('build/css', {sourcemaps: '.'}) ) // para crear la carpeta de destinoi, el source map es para que se pueda saber donde esta en los archivos sass

    done()
}

export function dev() {
    watch('src/scss/**/*.scss', css) // busca todos los archivos dentro de la carpeta scss
    watch('src/js/**/*.js', js)
}

//parallel comienza las tareas al mismo tiempo y series en tiempos distintos y por espacios

export default series(js,css, dev);




// export function hola( done ){
//     console.log('Hola desde Gulpfile.js')

//     done() // Para determinar que ya se acabo la tarea
// }