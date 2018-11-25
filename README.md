# TSLint Customization


There is some customization lint that does not exist this world currently.

这里是当前世界不存在的一些自定义lint。



## Usage 



### Install 

> npm i tslint-customization --save-dev 

or 

> yarn add tslint-customization -D




To use these lint rules with the default preset, use configuration inheritance via the `extends` keyword. Here's a sample configuration where `tslint.json` lives adjacent to your `node_modules` folder,



```javascript
{
      "extends": ["tslint-customization"],
}
```



or you can customize your rules, 



```javascript
{
  "rulesDirectory": [
    "node_modules/tslint-customization/rules"
  ],
  "rules": {
    "import-regular-blank-list": [true, ".jpg", /(\.helloworld){1}/]
  }
  
}
```





## Rules



### import-regular-blank-list



By regular expression lint import file. The  expression can be string or instance of RegExp. Eg,



```javascript
{
	"rules": {
    	"import-regular-blank-list": [true, ".jpg", /(\.helloworld){1}/]
 	 }
}
```

It  will disallow 



``` javascript
import 'hello.jpg'
import 'demo.helloworld'
```



