const isUtf8 = require("is-utf8");

console.log(isUtf8(Buffer.from("hello world")), Buffer.from("hello world"));
console.log(isUtf8(Buffer.from("看好了世界")), Buffer.from("看好了世界"));
console.log(
  isUtf8(Buffer.from("ここで息をして")),
  Buffer.from("ここで息をして")
);
