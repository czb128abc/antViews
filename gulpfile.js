const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('del');
// const ts = require('gulp-typescript');
const merge = require('merge2');

const config = {
  // allowJs: true,
  include: ['src/**/*.js', 'src/**/*.jsx'],
  compilerOptions: {
    sourceMap: true,
    noImplicitAny: false, // 是否允许属性定义为any
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    moduleResolution: 'node', // module === "AMD" or "System" or "ES6" ? "Classic" : "Node". Determine how modules get resolved
    // "module": "es2015",
    target: 'es2015',
    jsx: 'react',
  },
  exclude: ['node_modules', 'lib', 'guide', 'docs', 'site', 'dist', 'es'],
};
console.log('...config', config);

// const tsProject = ts.createProject(config);
const ESDIR = './es';
const LIBDIR = './lib';

/* eslint-disable */
gulp.task('clean', () => {
  return clean(['lib']);
});

/* eslint-disable */
gulp.task('cleanEs', () => {
  return clean(['es']);
});

function moveLess(dir) {
  return gulp.src('./src/**/*.less').pipe(gulp.dest(dir));
}

function compileTs() {
  // return tsProject.src().pipe(tsProject());
  return gulp.src(['./src/**/*.js', './src/**/*.jsx'], {
    debug: true,
  });
  // console.log('===compileTs==');
  // const sream = tsProject.src().pipe(tsProject()).js;
  // console.log('===compileTs==');
  // return sream;
}

function babelConfig(moduleType) {
  return {
    babelrc: false,
    presets: [['@babel/preset-env', { modules: moduleType }], '@babel/preset-react'],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-classes',
    ],
  };
}

gulp.task(
  'es',
  gulp.series('cleanEs', () => {
    const tsSream = compileTs();
    const jsStream = tsSream.pipe(babel(babelConfig(false))).pipe(gulp.dest(ESDIR));
    const cssStream = moveLess(ESDIR); // 处理css流
    return merge(jsStream, cssStream);
  }),
);

// 发布打包
gulp.task(
  'lib',
  gulp.series('clean', () => {
    const tsSream = compileTs();
    const jsStream = tsSream.pipe(babel(babelConfig('commonjs'))).pipe(gulp.dest(LIBDIR));
    const cssStream = moveLess(LIBDIR); // 处理css流
    return merge(jsStream, cssStream);
  }),
);

gulp.task('default', gulp.series('lib', 'es'));
