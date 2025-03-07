
# Nmp Publish

## Create Nmp Test Package

```sh
rm -rf dist/ /node_modules package-lock.json 
```

```sh
npm i
```

```sh
npm run build
```

```sh
npm pack
```

```sh
npm link
```

## Test in Test Project

```sh
cd olotap-test
```

```sh
rm -rf dist/ /node_modules package-lock.json 
```

```sh
npm link /var/www/olotap
```

```sh
npm run dev
```

## Publish

```
cd /var/www/olotap
```

```sh
npm login
```

```sh
npm notice Log in on https://registry.npmjs.org/
Login at:
https://www.npmjs.com/login?next=/login/cli/ea093fed-2c....
Press ENTER to open in the browser..
```

Go to the url shown on console output and authenticate your account.

```sh
https://www.npmjs.com/login?next=/login/cli/ea093fed-2c....
```

Logged in on https://registry.npmjs.org/.

```sh
npm publish
```

```sh
npm notice Publishing to https://registry.npmjs.org/ with tag latest and default access
Authenticate your account at:
https://www.npmjs.com/auth/cli/975d036a-c6...
Press ENTER to open in the browser...
```

Go to the url shown on console output and again authenticate your account.

If publish you will get an email and output screen will shown as below.

```sh
+ olotap@1.0.6
```