---
title: 移动端选择图片旋转
---

## 移动端选择图片旋转

使用 exif.js 解决移动端相机拍照图片旋转

### 安装exif-js

```
  npm install exif-js --save
  yarn add exif-js
```
### 实现方法
```js
import { EXIF } from "exif-js"
//判断浏览器是否支持带EXIF的图片自动回正
let isImageAutomaticRotation;
const detectImageAutomaticRotation(src) {
  return new Promise((resolve) => {
    if (isImageAutomaticRotation === undefined) {
      const img = new Image();
      img.onload = () => {
        // 如果图片变成 1x2，说明浏览器对图片进行了回正
        isImageAutomaticRotation = img.width === 1 && img.height === 2;
        resolve(isImageAutomaticRotation);
      };
      img.src = src;
    } else {
      resolve(isImageAutomaticRotation);
    }
  });
}
// 传参 imgFile 为 文件类型 file
const rotateImg = (imgFile) => {
  return new Promise((resolve, reject) => {
    EXIF.getData(imgFile, function() {
      let exifTags = EXIF.getAllTags(this);
      let reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = e => {
        let imgData = e.target.result;
        // 判断浏览器是否支持对图片进行回正操作
        detectImageAutomaticRotation(imgData).then(res => {
        //res为true时。浏览器支持对带 EXIF 信息的图片进行自动回正
          if (res) {
            return resolve(imgData)
          }
          //res为false时。执行js，对带 EXIF 信息的图片进行回正
          // 8 表示 顺时针转了90
          // 3 表示 转了 180
          // 6 表示 逆时针转了90
          if (
            exifTags.Orientation == 8 ||
            exifTags.Orientation == 3 ||
            exifTags.Orientation == 6
          ) {
            //翻转
            //获取原始图片大小
            const img = new Image();
            img.src = imgData;
            img.onload = function() {
              let cvs = document.createElement('canvas');
              let ctx = cvs.getContext('2d');
              //如果旋转90
              if (
                exifTags.Orientation == 8 ||
                exifTags.Orientation == 6
              ) {
                cvs.width = img.height;
                cvs.height = img.width;
              } else {
                cvs.width = img.width;
                cvs.height = img.height;
              }
              if (exifTags.Orientation == 6) {
                //原图逆时针转了90, 所以要顺时针旋转90
                ctx.rotate(Math.PI / 180 * 90);
                ctx.drawImage(
                  img,
                  0,
                  0,
                  img.width,
                  img.height,
                  0,
                  -img.height,
                  img.width,
                  img.height
                );
              }
              if (exifTags.Orientation == 3) {
                //原图逆时针转了180, 所以顺时针旋转180
                ctx.rotate(Math.PI / 180 * 180);
                ctx.drawImage(
                  img,
                  0,
                  0,
                  img.width,
                  img.height,
                  -img.width,
                  -img.height,
                  img.width,
                  img.height
                );
              }
              if (exifTags.Orientation == 8) {
                //原图顺时针旋转了90, 所以要你时针旋转90
                ctx.rotate(Math.PI / 180 * -90);
                ctx.drawImage(
                  img,
                  0,
                  0,
                  img.width,
                  img.height,
                  -img.width,
                  0,
                  img.width,
                  img.height
                );
              }
              resolve(cvs.toDataURL('image/jpeg'));
            }
          } else {
            resolve(imgData);
          }
        })
      }
    });
  });
}
export default rotateImg
```
## Blob 转 File

```js
  //blob => file
  let files = new window.File([this.blob], file.name, {type: file.type})
```