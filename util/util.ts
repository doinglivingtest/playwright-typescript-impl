  export function valueToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }

   export function ConvertRGBtoHex(red: any, green: any, blue: any): string {
    return "#" + valueToHex(red) + valueToHex(green) + valueToHex(blue);
}