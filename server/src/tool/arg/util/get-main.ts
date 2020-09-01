export function getMain(arg: string[]) {
  const main: string[] = []
  while (isMain(arg)) {
    main.push(arg.shift())
  }

  return main
}

function isMain(arg: string[]) {
  // Empty array
  if (arg.length === 0) {
    return false
  }

  if (!arg[0].match(/^-+/gi)) {
    return true
  } else {
    return false
  }
}