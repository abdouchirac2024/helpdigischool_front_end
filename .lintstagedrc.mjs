export default {
  "src/**/*.{ts,tsx}": (filenames) => [
    `next lint --fix --file ${filenames.map((f) => f.split(process.cwd())[1]).join(" --file ")}`,
    `prettier --write ${filenames.join(" ")}`,
  ],
  "*.config.{ts,js,mjs,cjs}": ["prettier --write"],
  "*.{json,css,md}": ["prettier --write"],
};