#!/bin/sh

set -e

cd $GITHUB_WORKSPACE/_site
echo 'Navigate into dir'
remote_repo="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" && \
remote_branch="gh-pages"
echo 'Add remote repo'
git init
echo 'Git init'
git config user.name "${GITHUB_ACTOR}" && \
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
echo 'Set user details'
git add . && \
echo -n 'Files to Commit:' && ls -l | wc -l
git commit -m'action build' > /dev/null 2>&1 && \
git push --force $remote_repo master:$remote_branch > /dev/null 2>&1 && \
rm -fr .git && \
cd ../
echo '👍 GREAT SUCCESS!'