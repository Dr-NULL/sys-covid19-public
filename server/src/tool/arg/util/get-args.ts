export function getArgs(argv: string[] = process.argv) {
  const arg = argv.map(x => x)
  while (isPath(arg)) {
    arg.shift()
  }

  return arg
}

function isPath(arg: string[]) {
  // Empty array
  if (arg.length === 0) {
    return false
  }

  if (arg[0].match(/(^[^\\\/]+|\\|\/)((\\|\/)[^\\\/]+)+$/gi)) {
    return true
  } else {
    return false
  }
}