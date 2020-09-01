declare interface String {
  capitalize: (this: string) => string;
}

String.prototype.capitalize = function (this: string) {
  let i = 0
  let out = ''
  let caps = false

  while (i < this.length) {
    const reg = /([a-z]|[À-Ö]|[Ø-ö]|[ø-ʔ]|[ʕ-ʯ])/gi
    const ref = this.toLowerCase()
    const ch = ref[i]
    if (
      (
        (i == 0) &&
        (ch.match(reg) != null)
      ) ||
      (
        (caps) &&
        (ch.match(reg) != null)
      )
    ) {
      out += ch.toUpperCase()
      caps = false
    } else {
      out += ch;
      if (ch.match(reg) == null) {
        caps = true
      }
    }

    i++
  }

  return out
};