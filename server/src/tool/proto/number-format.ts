interface Number {
  /**
   * Returns a string with the given amount of integers and decimals.
   * @param int Minimun amount of integers to show.
   * @param dec `default = 0` Amount of decimals to show (this trucates the decimals).
   * @param sep `default = '.'` Symbol used to separate integers and decimals.
   */
  format: (int: number, dec?: number, sep?: string) => string;
}

Number.prototype.format = function(int: number, dec: number = 0, sep: string = '.') {
  // Get only numbers
  const arr = this
    .toString()
    .replace(/,/gi, '.')
    .split(/\./gi)

  // Set integers
  while (arr[0].length < int) {
    arr[0] = '0' + arr[0]
  }

  if (dec <= 0) {
    return arr[0]
  
  } else {
    // Create decimals
    if (arr.length < 2) {
      arr.push('')
    }

    // Add zeros
    while (arr[1].length < dec) {
      arr[1] += '0'
    }

    // Truncate
    if (arr[1].length > dec) {
      arr[1] = arr[1].substr(0, dec)
    }

    return arr[0] + sep + arr[1]
  }
}