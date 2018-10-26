# skk-uui-create
used in undunion for creating router、 service、directive more easily。


## Example
1.install
``` javascript
  npm install -g skk-uui-create
```

2.create a config file named uui.config.js in root directory, like below
``` javascript
  module.exports = {
    test: {
        entryHtml: 'test.html',
        entryDir: 'test',
        routerUrl: 'test/router/',
        routerEntryUrl: 'test/router/entry.js',
        serviceUrl: 'test/service/',
        directiveUrl: 'test/directive/',
    },
    demo: {
        entryHtml: 'demo.html',
        entryDir: 'demo',
        routerUrl: 'demo/router/',
        routerEntryUrl: 'demo/router/entry.js',
        serviceUrl: 'demo/service/',
        directiveUrl: 'demo/directive/',
    }
  }
```

add anchor in entryHtml
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>



<!--uui-template-router-->

<!--uui-template-service-->

<!--uui-template-directive-->
</body>
</html>
```

3.type following code in cmd
``` javascript
  uui create
```

4.It will ask you some questions:  
&emsp;&emsp;step1: <font color=#07d>please choose createType</font>  
&emsp;&emsp;&emsp;&emsp;<font color=#f60>service</font>  
 &emsp;&emsp;&emsp;&emsp;<font color=#f60>router</font>  
&emsp;&emsp;&emsp;&emsp;<font color=#f60>directive</font>  

&emsp;&emsp;step2: <font color=#07d>please choose project</font>  
&emsp;&emsp;&emsp;&emsp;<font color=#f60>demo</font>  
&emsp;&emsp;&emsp;&emsp;<font color=#f60>test</font>  

&emsp;&emsp;step3: <font color=#07d>please choose saved file dir</font>  

&emsp;&emsp;step4: <font color=#07d>please input name</font>  
