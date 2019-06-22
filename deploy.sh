#!/usr/bin/env sh
set -e

yarn build
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

USER=$(git config user.name)
EMAIL=$(git config user.email)
MESSAGE="Deploy $(date +%c)"
ORIGIN=$(git remote -v | awk '/origin.*github.*(push)/ {print $2}')

git init
git config user.name "$USER"
git config user.email "$EMAIL"
git add -A
git commit -m "$MESSAGE"
git push -f "$ORIGIN" master:gh-pages

cd -
