import gulp from 'gulp';
import less from 'gulp-less';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import fs from 'node:fs';

// dist/styles 输出根目录（gulp 运行时工作目录为 build/，与 gulp.src 的相对路径基准一致）
const stylesDist = '../dist/styles';

// 预清理输出目录，保证重复构建幂等（gulp.dest 只覆盖不删除，陈旧产物会累积）
gulp.task('clean:styles', function (done) {
    fs.rmSync(stylesDist, { recursive: true, force: true });
    done();
});

// 编译全量样式（base + 全部组件聚合，向后兼容产物）
// 注意：各任务内必须显式串联 less → autoprefixer，不能把管道封装成返回尾端流的函数，
//   否则 .pipe(封装) 会让文件绕过 less 编译阶段直达下游
gulp.task('css', function () {
    return gulp.src('../src/theme/theme.less')
        .pipe(less({
            javascriptEnabled: true
        }))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions', 'ie > 8']
            })
        )
        .pipe(rename('aether-ui.css'))
        .pipe(gulp.dest('../dist/styles'));
});

// 编译基础层（主题变量、暗色覆写、滚动条等），供按需引入场景单独加载
gulp.task('css:base', function () {
    return gulp.src('../src/theme/base.less')
        .pipe(less({
            javascriptEnabled: true
        }))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions', 'ie > 8']
            })
        )
        .pipe(rename('theme.css'))
        .pipe(gulp.dest('../dist/styles'));
});

// 按组件独立编译样式，产出 dist/styles/components/*.css 供按需引入
// 排除项：base/theme 为入口聚合文件；variables 为纯 less 变量（编译输出为空）；Icon 依赖 variables 的 less 变量无法独立编译且不在全量聚合内
// 说明：gulp-less 不改文件名，必须用 rename 将 .less 后缀改为 .css；压缩由消费方 vite 构建统一处理
gulp.task('css:components', function () {
    return gulp.src([
            '../src/theme/*.less',
            '!../src/theme/base.less',
            '!../src/theme/theme.less',
            '!../src/theme/variables.less',
            '!../src/theme/Icon.less'
        ])
        .pipe(less({
            javascriptEnabled: true
        }))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions', 'ie > 8']
            })
        )
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest('../dist/styles/components'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
    return gulp.src('../src/theme/fonts/*.*')
        .pipe(gulp.dest('../dist/styles/fonts'));
});


gulp.task('imgs', function () {
    return gulp.src('../src/theme/imgs/*.*')
        .pipe(gulp.dest('../dist/styles/imgs'));
});

gulp.task('default', gulp.series('clean:styles', gulp.parallel('css', 'css:base', 'css:components', 'fonts', 'imgs')));
