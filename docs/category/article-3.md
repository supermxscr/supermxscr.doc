# Ant design小问题

## 表单placeholder 不显示内容
-------

**<font size=4 color='#36CFC9'>问题描述</font>**

表单 v-model 默认赋值为null, placeholder  属性设置不生效,如下图:

```html
<a-form-model-item label="客户名称: ">
  <a-input v-model="name" placeholder="请输入客户名称" ></a-input>
</a-form-model-item>
```
```js
{
	companyName: null //默认值为 null  or  ''
}
```
placeholder未生效
![placeholder未生效](https://cdn.nlark.com/yuque/0/2020/png/600684/1590027454247-486867eb-fdb6-4584-b2bc-43c96e450f71.png)

**<font size=4 color='#36CFC9'>解决方案</font>**

```js
{
	// companyName: null   不给v-model 绑定任何值 使v-model 的值默认为undefined
}
```
placeholder生效
![placeholder未生效](https://cdn.nlark.com/yuque/0/2020/png/600684/1590027782423-fb0bac38-3eec-46e4-9456-eac3c9fa6247.png)

**<font size=4 color='#36CFC9'>问题原因</font>**
<br/>placeholder是当前组件值为空时显示的替换文本，只有值为空的时候才会显示。<br/>Ant Design中当组件绑定了v-model且绑定值初始化时，值不再是空，即时初始化值为 '' or null 也视为有值，所以placeholder不会显示。<br/>如果不进行初始化，那么值就是underfined，此时可显示placeholder

> **<font size=2 color='#f00'>[注]: element-ui 或 iview v-model 默认赋值为空 可显示 placeholder
</font>**
