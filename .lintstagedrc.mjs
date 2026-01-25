export default {
  "*.{ts,tsx}": (filenames) => [
    `next lint --fix --file ${filenames.map((f) => f.split(process.cwd())[1]).join(" --file ")}`,
    `prettier --write ${filenames.join(" ")}`,
  ],
  "*.{json,css,md}": ["prettier --write"],
};