import context from '../main'
import qs from "qs";
function formatNumber(n: number | string): string {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}
function formatTime(date: any): string {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}
function formatDate(date: any, mark: string = '-'): string {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const t1 = [year, month, day].map(formatNumber).join(mark)

    return `${t1}`
}

function isTel(tel: string): boolean {
    var reg = /^1[2|3|4|5|6|7|8|9]\d{9}$/;
    if (reg.test(tel)) {
        return true;
    } else {
        return false;
    }
}
//深拷贝
function deepClone(obj: any) {
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
}
// dom相关
function hasClass(el: any, className: string): boolean {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

function addClass(el: any, className: string) {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}
function removeClass(el: any, className: string) {
    if (!hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ')
    let delClassIndex = newClass.indexOf(className)
    newClass[delClassIndex] = ''
    el.className = newClass.join(' ')
}

function getData(el: any, name: string, val?: string) {
    const prefix = 'data-'
    if (val) {
        return el.setAttribute(prefix + name, val)
    }
    return el.getAttribute(prefix + name)
}

// let elementStyle = document.createElement('div').style

// let vendor = (() => {
//     let transformNames = {
//         webkit: 'webkitTransform',
//         Moz: 'MozTransform',
//         O: 'OTransform',
//         ms: 'msTransform',
//         standard: 'transform'
//     }

//     for (let key in transformNames) {
//         if (elementStyle[transformNames[key]] !== undefined) {
//             return key
//         }
//     }

//     return false
// })()

// function prefixStyle(style) {
//     if (vendor === false) {
//         return false
//     }

//     if (vendor === 'standard') {
//         return style
//     }

//     return vendor + style.charAt(0).toUpperCase() + style.substr(1)
// }

//状态提示相关方法

function showLoad(){
    return context.$createToast({
        txt: '加载中...',
        time: 0,
        type:'loading'
    })
}
function showToast(txt:string,type:string='txt'){
    return context.$createToast({
        txt: txt,
        time: 1500,
        type:type
    })
}

function findIndex(ary:any[], fn:any) {
    if (ary.findIndex) {
      return ary.findIndex(fn)
    }
    let index = -1
    ary.some(function (item, i, ary) {
      const ret = fn(item, i, ary)
      if (ret) {
        index = i
        return ret
      }
    })
    return index
}
// 将url后的参数组合成对象并返回
function urlParams(url?:string){
    url = url ? url:window.location.href.split("#")[0];
    let queryStringUrl = url.slice(url.indexOf("?") + 1);
    var urlParamsObj = qs.parse(queryStringUrl, { ignoreQueryPrefix: true });
    return urlParamsObj
}

function isFilled(obj:any):Promise<any>{
    return new Promise((resolve,reject)=>{
        if(isFilled){
            let arr = Object.keys(obj);
            let flag = 0;
            for(let i = 0;i<arr.length;i++){
              if(obj[arr[i]] == ''){
                reject();
                flag = 0;
                break; 
              } else{
                flag = 1
              }
            }
            if(flag){
                resolve()
            } else{
                reject();
            }
        }
    })
    
}
function formatDuration(time:string):number{
    let arr:any[] = time.split(':')
    let duration:number = parseInt(arr[0])*60+parseInt(arr[1])
    return duration
}
/**
 * covert canvas to image
 * and save the image file
 */

function Canvas2Image() {

	// check if support sth.
	var $support = function () {
		var canvas = document.createElement('canvas'),
			ctx:any = canvas.getContext('2d');

		return {
			canvas: !!ctx,
			imageData: !!ctx.getImageData,
			dataURL: !!canvas.toDataURL,
			btoa: !!window.btoa
		};
	}();

	var downloadMime = 'image/octet-stream';

	function scaleCanvas (canvas:any, width:number, height:number) {
		var w = canvas.width,
			h = canvas.height;
		if (width == undefined) {
			width = w;
		}
		if (height == undefined) {
			height = h;
		}

		var retCanvas = document.createElement('canvas');
		var retCtx:any = retCanvas.getContext('2d');
		retCanvas.width = width;
		retCanvas.height = height;
		retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
		return retCanvas;
	}

	function getDataURL (canvas:any, type:string, width:number, height:number) {
		canvas = scaleCanvas(canvas, width, height);
		return canvas.toDataURL(type);
	}

	function saveFile (strData:string) {
		document.location.href = strData;
	}

	function genImage(strData:string) {
		var img = document.createElement('img');
		img.src = strData;
		img.setAttribute("crossOrigin",'Anonymous')
		return img;
	}
	function fixType (type:any) {
		type = type.toLowerCase().replace(/jpg/i, 'jpeg');
		var r:any = type.match(/png|jpeg|bmp|gif/)[0];
		return 'image/' + r;
	}
	function encodeData (data:any) {
		if (!window.btoa) { throw 'btoa undefined' }
		var str = '';
		if (typeof data == 'string') {
			str = data;
		} else {
			for (var i = 0; i < data.length; i ++) {
				str += String.fromCharCode(data[i]);
			}
		}

		return btoa(str);
	}
	function getImageData (canvas:any) {
		var w = canvas.width,
			h = canvas.height;
		return canvas.getContext('2d').getImageData(0, 0, w, h);
	}
	function makeURI (strData:string, type:string) {
		return 'data:' + type + ';base64,' + strData;
	}


	/**
	 * create bitmap image
	 * 按照规则生成图片响应头和响应体
	 */
	var genBitmapImage = function (oData:any) {

		//
		// BITMAPFILEHEADER: http://msdn.microsoft.com/en-us/library/windows/desktop/dd183374(v=vs.85).aspx
		// BITMAPINFOHEADER: http://msdn.microsoft.com/en-us/library/dd183376.aspx
		//

		var biWidth  = oData.width;
		var biHeight	= oData.height;
		var biSizeImage = biWidth * biHeight * 3;
		var bfSize  = biSizeImage + 54; // total header size = 54 bytes

		//
		//  typedef struct tagBITMAPFILEHEADER {
		//  	WORD bfType;
		//  	DWORD bfSize;
		//  	WORD bfReserved1;
		//  	WORD bfReserved2;
		//  	DWORD bfOffBits;
		//  } BITMAPFILEHEADER;
		//
		var BITMAPFILEHEADER = [
			// WORD bfType -- The file type signature; must be "BM"
			0x42, 0x4D,
			// DWORD bfSize -- The size, in bytes, of the bitmap file
			bfSize & 0xff, bfSize >> 8 & 0xff, bfSize >> 16 & 0xff, bfSize >> 24 & 0xff,
			// WORD bfReserved1 -- Reserved; must be zero
			0, 0,
			// WORD bfReserved2 -- Reserved; must be zero
			0, 0,
			// DWORD bfOffBits -- The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
			54, 0, 0, 0
		];

		//
		//  typedef struct tagBITMAPINFOHEADER {
		//  	DWORD biSize;
		//  	LONG  biWidth;
		//  	LONG  biHeight;
		//  	WORD  biPlanes;
		//  	WORD  biBitCount;
		//  	DWORD biCompression;
		//  	DWORD biSizeImage;
		//  	LONG  biXPelsPerMeter;
		//  	LONG  biYPelsPerMeter;
		//  	DWORD biClrUsed;
		//  	DWORD biClrImportant;
		//  } BITMAPINFOHEADER, *PBITMAPINFOHEADER;
		//
		var BITMAPINFOHEADER = [
			// DWORD biSize -- The number of bytes required by the structure
			40, 0, 0, 0,
			// LONG biWidth -- The width of the bitmap, in pixels
			biWidth & 0xff, biWidth >> 8 & 0xff, biWidth >> 16 & 0xff, biWidth >> 24 & 0xff,
			// LONG biHeight -- The height of the bitmap, in pixels
			biHeight & 0xff, biHeight >> 8  & 0xff, biHeight >> 16 & 0xff, biHeight >> 24 & 0xff,
			// WORD biPlanes -- The number of planes for the target device. This value must be set to 1
			1, 0,
			// WORD biBitCount -- The number of bits-per-pixel, 24 bits-per-pixel -- the bitmap
			// has a maximum of 2^24 colors (16777216, Truecolor)
			24, 0,
			// DWORD biCompression -- The type of compression, BI_RGB (code 0) -- uncompressed
			0, 0, 0, 0,
			// DWORD biSizeImage -- The size, in bytes, of the image. This may be set to zero for BI_RGB bitmaps
			biSizeImage & 0xff, biSizeImage >> 8 & 0xff, biSizeImage >> 16 & 0xff, biSizeImage >> 24 & 0xff,
			// LONG biXPelsPerMeter, unused
			0,0,0,0,
			// LONG biYPelsPerMeter, unused
			0,0,0,0,
			// DWORD biClrUsed, the number of color indexes of palette, unused
			0,0,0,0,
			// DWORD biClrImportant, unused
			0,0,0,0
		];

		var iPadding = (4 - ((biWidth * 3) % 4)) % 4;

		var aImgData = oData.data;

		var strPixelData = '';
		var biWidth4 = biWidth<<2;
		var y = biHeight;
		var fromCharCode = String.fromCharCode;

		do {
			var iOffsetY = biWidth4*(y-1);
			var strPixelRow = '';
			for (var x = 0; x < biWidth; x++) {
				var iOffsetX = x<<2;
				strPixelRow += fromCharCode(aImgData[iOffsetY+iOffsetX+2]) +
							   fromCharCode(aImgData[iOffsetY+iOffsetX+1]) +
							   fromCharCode(aImgData[iOffsetY+iOffsetX]);
			}

			for (var c = 0; c < iPadding; c++) {
				strPixelRow += String.fromCharCode(0);
			}

			strPixelData += strPixelRow;
		} while (--y);

		var strEncoded = encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) + encodeData(strPixelData);

		return strEncoded;
	};

	/**
	 * saveAsImage
	 * @param canvasElement
	 * @param {String} image type
	 * @param {Number} [optional] png width
	 * @param {Number} [optional] png height
	 */
	var saveAsImage = function (canvas:any, width:number, height:number, type:any) {
		if ($support.canvas && $support.dataURL) {
			if (typeof canvas == "string") { canvas = document.getElementById(canvas); }
			if (type == undefined) { type = 'png'; }
			type = fixType(type);
			if (/bmp/.test(type)) {
				var data = getImageData(scaleCanvas(canvas, width, height));
				var strData:any = genBitmapImage(data);
				saveFile(makeURI(strData, downloadMime));
			} else {
				var strData = getDataURL(canvas, type, width, height);
				saveFile(strData.replace(type, downloadMime));
			}
		}
	};

	var convertToImage = function (canvas:any, width:number, height:number, type:any) {
		if ($support.canvas && $support.dataURL) {
			if (typeof canvas == "string") { canvas = document.getElementById(canvas); }
			if (type == undefined) { type = 'png'; }
			type = fixType(type);

			if (/bmp/.test(type)) {
				var data = getImageData(scaleCanvas(canvas, width, height));
				var strData = genBitmapImage(data);
				return genImage(makeURI(strData, 'image/bmp'));
			} else {
				var strData:string = getDataURL(canvas, type, width, height);
				return genImage(strData);
			}
		}
	};



	return {
		saveAsImage: saveAsImage,
		saveAsPNG: function (canvas:any, width:number, height:number) {
			return saveAsImage(canvas, width, height, 'png');
		},
		saveAsJPEG: function (canvas:any, width:number, height:number) {
			return saveAsImage(canvas, width, height, 'jpeg');
		},
		saveAsGIF: function (canvas:any, width:number, height:number) {
			return saveAsImage(canvas, width, height, 'gif');
		},
		saveAsBMP: function (canvas:any, width:number, height:number) {
			return saveAsImage(canvas, width, height, 'bmp');
		},

		convertToImage: convertToImage,
		convertToPNG: function (canvas:any, width:number, height:number) {
			return convertToImage(canvas, width, height, 'png');
		},
		convertToJPEG: function (canvas:any, width:number, height:number) {
			return convertToImage(canvas, width, height, 'jpeg');
		},
		convertToGIF: function (canvas:any, width:number, height:number) {
			return convertToImage(canvas, width, height, 'gif');
		},
		convertToBMP: function (canvas:any, width:number, height:number) {
			return convertToImage(canvas, width, height, 'bmp');
		}
	};

};

export default {
    formatNumber,
    formatTime,
    formatDate,
    isTel,
    deepClone,
    hasClass,
    addClass,
    removeClass,
    getData,
    showLoad,
    showToast,
    findIndex,
    urlParams,
    isFilled,
    formatDuration,
    Canvas2Image
}

