const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('del');
// const ts = require('gulp-typescript');
const merge = require('merge2');
const through = require('through2');

// const tsProject = ts.createProject(config);
const ESDIR = './es';
const LIBDIR = './lib';
const commomPath = `${process.cwd()}/src/`;

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

function paserSnippet(pairs) {
  return through.obj(function (file, endcoding, callback) {
    if (file.isNull()) {
      this.push(file);
      return callback();
    }
    if (file.isStream()) {
      console.error('gulp error: streaming not supported');
      return callback();
    }
    let content = file.contents.toString();
    if (content.includes(`from '@/`)) {
      const fileUrl = file.history[0].replace(commomPath, '');
      const targeStr = fileUrl
        .split('/')
        .map((item) => '../')
        .filter((_, index) => index > 0)
        .join('');
      content = content.replace(`from '@/`, `from '${targeStr}`);
      // console.log('paserSnippet -> content', content);
      file.contents = new Buffer(content);
    }

    this.push(file);
    callback();
  });
}

function compileTs() {
  // return tsProject.src().pipe(tsProject());
  return gulp.src(['./src/**/*.js', './src/**/*.jsx'], {}).pipe(paserSnippet());
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
