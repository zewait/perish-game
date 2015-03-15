perish-game
===========
### 1.变量说明
```sh
// 基准url（既请求链接的url域名前缀）。
base_url=http://example.com
// 字符串数数据类型
string
// 整型
int
```
### 2.传输结构说明
采用__json__来返回数据，返回数据采用如下结构
```json
{
	// 消息代码，0代表请求并服务器处理成功，其余代码服务器自定义
	"code": 0,
	// 服务器处理完成后的消息（如：用户不存在，请求数据非法等等）
	"msg": "成功",
	// 服务器处理请求后返回的数据。可以是字典、数组、结构体、字符串、数字等等
	// 无数据可以返回null或者忽略该字段
	"data": {}
}
```
### 3.api

#### 3.1获取本微信用户资料
>__explain__: 获取当前游戏用户的微信资料（可协商修改）  
>__url__: [base_url/user/get.json](http://example.com/user/get.json "获取本微信用户资料")  
>__response data__:
```json
{
	"code": 0,
	"msg": "成功"
	"data":
	{
		// 微信openid	
		"openid": "12345678",
		// 微信用户昵称
		"nick_name": "{Wait}"
		// 头像
		"avatar": "http://example.com/user/{wait}/avatar.png",
		// 最高分数
		"best_score": 90
	}
}
```

#### 3.2上传分数
>__explain__: 上传分数；服务器_保存用户最高得分_，进行_排行处理_，并判断该得分是否超过_指定分数点_（该分数点待定，预先定义成450），超过返回_优惠卷_信息并与用户进行关联，否则data返回null（或者忽略处理）  
>__url__: [base_url/score/submit.json](http://example.com/socre/submit.json?openid=12345678&score=99 "上传分数")  
>__params__:
>openuid(微信openid):string、score(用户得分):int  
>__response data__:
```json
{
	"code": 0,
	"msg": "成功",
	"data":
	{
		// 优惠卷名称
		"name": "优衣库100块抵用劵",
		// 优惠卷图片
		"img": "http://example.com/assets/uyk.png"
	}
}
```

#### 3.3获取排行榜
>__explain__: 获取前n位的分数，按降序排列  
>__url__: [base_url/leaderboard/list.json](http://example.com/leaderboard/list.json?top=10 "获取排行榜")  
>__params__: top（排行榜前n位用户）:int  
>__response data__:
```json
{
	"code": 0,
	"msg": "成功",
	"data":
	// 数组，降序排列
	[
		{
			"nick_name": "张三",
			// 头像
			"avatar": "http://example.com/user/zhangshan/avatar.png",
			"score": 500
		},
		{
			"nick_name": "李四",
			// 头像
			"avatar": "http://example.com/user/lixi/avatar.png",
			"score": 450
		}
		....
	]
}
```
