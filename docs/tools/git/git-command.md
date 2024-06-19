# 推送远程分支

git push origin branch-name

# 推送远程分支并建立关联

git push --set-upstream origin branch-name

git push origin local_branch:remote_branch
local_branch 为本地存在的分支，remote_branch 为远程分支，如果 remote_branch 不存在则会自动创建分支。

git push origin :remote_branch
local_branch 留空的话则是删除远程 remote_branch 分支。

# 修改分支命名

git branch -m group feature-group

# 新建并切换到分支

git checkout -b branch-name

# 查看远程分支

git branch -r

# 拉取远程分支并创建本地分支

git checkout -b local_branch origin/remote_branch
使用该方式会在本地新建分支 local_branch，并自动切换到该本地分支 local_branch。

# 查看本地分支与远程分支的映射关系

git branch -vv

# 建立当前分支与远程分支的映射关系

git branch -u origin/branch-name
或者使用命令
git branch --set-upstream-to origin/branch-name

# 推送当前分支并和推送分支远程建立映射

git push --set-upstream origin branch-name

# 删除某个分支

git br -d branch-name

# 强制删除某个分支 (未被合并的分支被删除的时候需要强制)

git br -D branch-name

# 删除远程分支

git push --delete origin branch-name

# 打 tag

git tag 2019XXXX

## 列出所有 tag

git tag

## 推送 tag

git push --tags

# 单行查看 log

- git log --pretty=oneline
- git log --graph --oneline --decorate
