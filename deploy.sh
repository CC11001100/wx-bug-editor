#!/usr/bin/env sh

# 发生错误时终止脚本
set -e

# 构建项目
npm run build

# 进入构建输出目录
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

# 初始化git仓库，强制添加dist目录下所有文件
git init
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:cc11001100/wx-bug-editor.git main:gh

cd -

echo "部署完成!" 