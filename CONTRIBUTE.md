# 🔗 How to contribute
Every help is welcome! See how to contribute below

# Starting
First of all, you need to create a `.env` on root of the project with following parameters: 
```
VITE_BACKEND_URL="http://localhost:4000"
```

 1. Fork this repository on Github
 2. Make a clone of the created fork repository: `git clone https://github.com/youruser/chat-app-web.git`
 3. Create a branch to commit your feature or fix: `git checkout -b my-branch`
 4. Make sure to use `yarn` to install all dependencies

When finished installing the dependencies, use: `yarn prisma migrate dev` to apply the migrations

# When you're done, make your Pull Request!
 * Commit the changes: `yarn commit`
 * Push your branch to your fork: `git push origin my-branch`
 * Go to Pull Requests from the root repository and create a [Pull Request](https://github.com/pedrinfx/chat-app-web/pulls) with your commit(s)