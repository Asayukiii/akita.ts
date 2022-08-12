import { FunctionBuilder } from "../classes/builder";
import { SourceFunction } from "../../index";
import { Utils, getTextHeight } from "../classes/utils";
import { SKRSContext2D } from "@napi-rs/canvas";

function fillText(ctx: SKRSContext2D, mytext: string, x: number, y: number, width: number, height: number, align: string, vAlign: string): void {
    // const size = Number(ctx.font.split('px')[0].trim())
    const size = Number(ctx.font.match(/[\d]{1,5}px/g)![0].replace('px', ''))
    if (width <= 0 || height <= 0 || size <= 0) {
      //width or height or font size cannot be 0
      return
    }

    // End points
    const xEnd = x + width
    const yEnd = y + height
    let txtY = y + height / 2 + size / 2

    let textanchor: number;

    if (align === 'right') {
      textanchor = xEnd
      ctx.textAlign = 'right'
    } else if (align === 'left') {
      textanchor = x
      ctx.textAlign = 'left'
    } else {
      textanchor = x + width / 2
      ctx.textAlign = 'center'
    }

    //added one-line only auto linebreak feature
    let textarray: string[] = []
    let temptextarray = mytext.split('\n')

    temptextarray.forEach(txtt => {
      let textwidth = ctx.measureText(txtt).width
      if (textwidth <= width) {
        textarray.push(txtt)
      } else {
        let temptext = txtt
        let linelen = width
        let textlen
        let textpixlen
        let texttoprint
        textwidth = ctx.measureText(temptext).width
        while (textwidth > linelen) {
          textlen = 0
          textpixlen = 0
          texttoprint = ''
          while (textpixlen < linelen) {
            textlen++
            texttoprint = temptext.substr(0, textlen)
            textpixlen = ctx.measureText(temptext.substr(0, textlen)).width
          }
          // Remove last character that was out of the box
          textlen--
          texttoprint = texttoprint.substr(0, textlen)
          //if statement ensures a new line only happens at a space, and not amidst a word
          const backup = textlen
          if (temptext.substr(textlen, 1) != ' ') {
            while (temptext.substr(textlen, 1) != ' ' && textlen != 0) {
              textlen--
            }
            if (textlen == 0) {
              textlen = backup
            }
            texttoprint = temptext.substr(0, textlen)
          }

          texttoprint = texttoprint

          temptext = temptext.substr(textlen)
          textwidth = ctx.measureText(temptext).width
          textarray.push(texttoprint)
        }
        if (textwidth > 0) {
          textarray.push(temptext)
        }
      }
      // end foreach temptextarray
    })
    const charHeight = getTextHeight(ctx, mytext, ctx.font) //close approximation of height with width
    const vheight = charHeight * (textarray.length - 1)
    const negoffset = vheight / 2

    let debugY = y
    // Vertical Align
    if (vAlign === 'top') {
      txtY = y + size
    } else if (vAlign === 'bottom') {
      txtY = yEnd - vheight
      debugY = yEnd
    } else {
      //defaults to center
      debugY = y + height / 2
      txtY -= negoffset
    }
    //print all lines of text
    textarray.forEach(txtline => {
      txtline = txtline.trim()
      ctx.fillText(txtline, textanchor, txtY)
      txtY += charHeight
    })

}

export const data: SourceFunction = {
    data: new FunctionBuilder()
    .setName('drawText')
    .setValue('description', 'Draws a text in the canvas.')
    .setValue('use', '$drawText[text;x;y;width;height;align?(right|left|center);vAlign?(top|bottom|middle)]')
    .setValue('returns', 'Void'),
    code: async d => {
        // $drawText[text;x;y;width;height;align?;vAlign?]
        let r = d.unpack(d)
        if(!r.inside) return Utils.Warn('Invalid inside provided in:', d.func)
        if(r.splits.length < 3) return Utils.Warn('Invalid fields provided in:', d.func)
        let [ text, x, y, width, height, align = 'left', vAlign = 'top'] = r.splits
        if(!Utils.isNumber(x) || !Utils.isNumber(y) || !Utils.isNumber(width) || !Utils.isNumber(height)) return Utils.Warn('Some numer is invalid in:', d.func)
        if(!d._.Canvas?.ctx) return Utils.Warn('Not canvas found, create one first using $createCanvas, in:', d.func)
        fillText(d._.Canvas.ctx, text.unescape()!, Number(x), Number(y), Number(width), Number(height), align, vAlign)
        return {
            code: d.code.resolve(`${d.func}[${r.inside}]`, '')
        }
    }
}