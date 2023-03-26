const mongoose = require('mongoose')
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  email: { unique: true, type: mongoose.Schema.Types.String, required: [true] },
  name: { type: String, required: true },
  password: { type: String, select: false },
  verified: { type: Boolean, default: false ,select: false},
  mailToken: {
    token: {
      type: String
    },
    expiry: {
      type: Date
    },
    select: false
  },
  avatarUrl: {
    type: String,
    default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAAD6+vr4+Pja2tpmZmbR0dHz8/Oenp7u7u7g4OCLi4vW1tbExMSurq5jY2NwcHC4uLiDg4PJycmkpKQ9PT1YWFi+vr4hISHf399OTk6QkJB9fX2YmJgbGxsxMTFDQ0MMDAwXFxcyMjJAQEAnJyd2dnZcXFxLS0srdWiNAAAJuElEQVR4nO2da0PyOgyAX8ZgGzhAGIjcBBX0///CI+/0SNLs0jZtyjl7PktttjZN0iT786ejo6OjoyMQ+sNJOvs890rOn7N0MuxLT4qL6Lm4/IgGOV/S+O7F7D/N3kjp/pVy9pRIT9KCxeBUK943g4X0RM1I0lbilaT39yKzeXvx/jIfSU9ZC235ruzu6D2mBvJd2UtPvCXDg6GAvd76HnRO/2Is35VL8Ev1wfwFlrw+SItQz95Svish78b+gEHAXu8jWFMue2ERsNd7yaRFoYlPdbM+TdNJHmdJlGRxPkmn9X8cSwtDMaye8Ns8V99Kstguq38yFJCggUXVXJdptT32vH+v+llwJ+NDxUQHTS9jOLuPtxjTs5y1URlZhYxB7cXslZritK27MJpSP38NSaNSx8Q61xggp+Icb87mqw21zC56xzZpzs4czVcbylnSeYElOTFK6mC2BhBaZmnisI+I4zEMbaMG0wwNy/6HMlIQW3GsTGtgPJZquY8ZZ2qIukZt9IOqs+TX6ZFTQELET6Z5GvOIZ7SxHHCDB3xkmacxfRy0OESWI0Z4xLWsP6wchfZx3REeUvRQjPBsJgyDTvCgtsvChgLNxfycuAWfGQXLqGZgl4In2JmgUV9ZRjUCK1IutYfXqZw6XcGJLNkGRhbqim1gTbDW44s74KiW1M3bFk7jg3FoZINvGYfWAa0lztAReol861+LZziLI+vgyNyVWabInuFVeEhNy9g1aJHyWh7IWjqyDm42hwvz8MiNYh69FSiMrx96qgcFpiSC/Ggbso8vvxGhQcNjc98C4+ASZg2Mc/M/Y7hGXtjHbySDq4g/YIRCXP4vMR5cTwA9Qv8pGlCVvvP/gwhenvpXptC9nzr4D1DV+Hf0Yah75+A/7MB/8B/8hrdhLrJ8YPYRt83UDAwXccTYMDCWwX/gNgF3CbfNduUpKAldaDqorV3osnqghC5SQ4ZBSehilebCEkJN8+TgP0A33/8+hB6qi/MY2hT+8zLcn8fubYp6YLDUxROGq8R/5jDcJS4cVOhi+7+7gLr8zJ9in8BEMP+pis4dVOcudhMJvG/nPy6g0XYQuM2HAWF+ZQpVqcTNxcXxDGAymX/nSblZ4N6IaBtKXAOjqyduqwYlQYhcPsEpcC9TdO/DPHo70N0J71NGN+gS21DZiLzaFOV0ymRj9OEkTpxmTXKCgwvltqHcJU5dg/SMf+ewBC1T67TEX3CColTKEDLcGB0cVKi5FiudxTXpXBPBiW1zpnH1QYc+mx+MkxOfmcY1ACW2MYXccG2JWFrbHzX/7JVjnSY4p1O0Tg/nnXNENXEhm21uvB1Kaay9PlUK3oVLLZXKQdutqBR4+Q92Q5TMessLd7XaVryri1r2ZKPb8fkTROGTWiBr/tTVFXFgnKkpRB2+6UIlCsKDqOhW16mhpazUUAWxRr+IiNpPk5kRT+pdslzmBnX3fB3TutZNgi3AK+J69AeqSFkzPYNYoW5ulg0hG++s2h8bI+oFhtWKZ0fNsDdvFyau6H3m/060FrLvQysZq3q7ScVmKlErzUumeZ0+jBYVj0bUKaygSsTeeb6gFWuymNNtP3u8JUZs1LTBet3sc6j5R3m6IhuilAS3REuamiWuN7PxNt2OZ5t1w1/KhZ4aMO2XiAmk4QdFZbMoLYJrEXVLprRY0OY9pNZCFLZ9BaWKKTWIPy3kOwbeF/IbXKXfHsnKey0Ssx6m4fcuvaGqB1sNg2CcwZaMCJe9hrng7YsxSVFpdSIOd9jO+5t43Czkei7fKMmKOF1VtxY+rdI7F68kiYudekh+7oo4dPNFi6gf55OiSNO0KCZ53A8kTtjR0dHR4Z1sv1pu9jaHXLbfLFdWI7jk4Sec+GF6rWk/gksWt1bL50T/NWST2xjPJrRwVK60rBzURvMxUT47YasuoLu1qtDM9LGdkP1H2l9+D8Uqz2rC+cttntXezGS13w8Iwu+PGsOHy9k+jxU5oyzO97Ma6Ur24hb6ou1XO17eN4PdeJ8W6X68G2zeW/9OVuX09QNO+swEm9Auau7HGDmJvUaTT4+ZIXPbltV/2JAXiW/rkAkwDvFecqEX7+XA70olevy7Z+XxaMyq4rynInq0uVz7Mg8mUVGloc/eNmPVl51ey8ux57Hpt7texuXtRaWMnpwqMk/vi+3v5cODgZAv49/b0WRb8Ude/I0KJfoBjeRoNNHZq5tiBHdZVpEr5UGlKj3h/3IgH+5wMm3KnPn66aogF19O/9RFzy0ALeCuWs2NhsVltTwRPzotV5diWO0f9emER8cikgKeGndHlI2e80m6Hc+vjLfpJH8e1TqOf8mpB+NWxCfqP364u95MyL3somXTN2TKk9sULTKRzJmvQWWsO/dsFtRKdRTcwGW/V97cB1IoH+bgZGNExMcY/STyEmnuTgoxiCwgX70c/PxrYsv782cIX41dwRFFVz6zCAk7lTlcjPtUeBaQEpG1D0cIn3zj/IAdgWqs+S9oUa1URvMtUwaXKIdQ/Sk+n19J3pb5oJ0SHzlyjays0bXMNXSmeIxM61Rdo1L3eurXJHketaJH5T6hpawmFn2quEwyfbdKFPuNw7XBUbM3yTvLCDsaDB+bVRaG7OW6shWtlY3yDUfpqivFA7BdUviW/sgwSTvw4WxZD61Y3PLJETiWYtnXCL/CELo4YBvc6iWixoG9s3juxxcRNm1sMhlwjZbw14e/wTcnNvVgaKgj0xRtwcrGfCT8sELJicQXmOZLCz2rcJoAoPji0XQcbD+EU9+J42KmdhaKG4TU5gC9RMO4Ju7uF8ouvIJ2ouGpj67SZCIXVaCIhtmFG4r8hHEW/oDUvJEnjOwZxh66HOA+vCZ2DXIMQ7BIb2Foh43UlbxTAUEuhoGiR64vQ7SAGRTP0N9EKPPJeRqLNsgr0M+WQsd9eKVIKIyrf5EC6wTCMUl/gWU62t9mQBtZOv5EgWJSuqrw0e7nPkAvQdesgdtwGdZxX4Kiw7obEdp9koH8amA5i6bdjDrbO8wkswC5Bnr+BXIxQ9yGykbUc4PhcRpCu2IKaH3rhdygXRuSd38LNJ31fAOoaEJtUAVXmp6quQdFo6gard/Cn4ZnlJZk5hLG5j/1CpymTjMt+PrPzmZoC6xO0tlM0h/9bgsMlun4sNBsDy1E8ws81HQcIGh37/9EYYIucHVsb4nyQnt0vmaidLm4C3Q+udPY6iBIdAIZbRsehoXOqfbfl7C5ajBE1p2E/ysJ//unBV0LGzpadyt+2rLwctIRkMgZDx/NlJOH6ta4YXLQzvaJinsy3ZZFiPcOHR0dHR13wz/SXHOceoujtAAAAABJRU5ErkJggg=="
  }
})

userSchema.methods.addToken = async function () {
  const token = crypto.randomBytes(64).toString('hex')

  const date = new Date
  const expiry = new Date((new Date).getTime() + 10 * 6000)
  this.mailToken = {
    token,
    expiry
  }
  await this.save()
  return token
}
module.exports = mongoose.model('User', userSchema)
