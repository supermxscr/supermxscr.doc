---
title: xiao
---

## 遮罩内滚动 下层元素 不滚动 

**<font size=4 color='#36CFC9'>解决方案</font>**

```css
// 遮罩显示时下层元素 加一下样式
.fixedBody {
  position: fixed;
  left:0;
  bottom:0;
  right:0;
}
```