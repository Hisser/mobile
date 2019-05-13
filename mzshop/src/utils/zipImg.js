import JSZip from 'jszip'
import FileSaver from 'file-saver'


export default function zipImg(imgSrcList,fileName) {
  let zip = new JSZip();//实例化一个压缩文件对象
  let imgFolder = zip.folder(fileName); //新建一个图片文件夹用来存放图片，参数为文件名
  for(let i=0;i<imgSrcList.length;i++){
    let src = imgSrcList[i];
    let tempImage = new Image();
    tempImage.crossOrigin = "Anonymous";
    tempImage.src = src;

    tempImage.onload = ()=> {
      imgFolder.file((i+1)+'.jpg', getBase64Image(tempImage).substring(22), { base64: true })
    }
  }
  setTimeout(()=>{
    zip.generateAsync({ type: 'blob' }).then( function(content) {
      FileSaver.saveAs(content, 'images.zip')
    })
  },3000)
}

function getBase64Image(img) {
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  let dataURL = canvas.toDataURL("image/png");
  return dataURL;
}
