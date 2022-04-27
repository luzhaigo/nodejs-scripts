// https://github.com/component/escape-html
const regex = /["'&<>]/;

function escapeHtml(string) {
  let str = "" + string;

  let match = regex.exec(str);

  if (!match) return str;

  let html = "";

  do {
    const index = match.index;
    let escape;
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = "&quot;";
        break;
      case 38: // &
        escape = "&amp;";
        break;
      case 39: // '
        escape = "&#39;";
        break;
      case 60: // <
        escape = "&lt;";
        break;
      case 62: // >
        escape = "&gt;";
        break;
      default:
        break;
    }
    html = html + str.substring(0, index) + escape;
    str = str.substring(index + 1);
  } while ((match = regex.exec(str)));

  return html + str;
}

function strictEqual(a, b) {
  return a === b;
}

const res = [
  strictEqual(escapeHtml(undefined), "undefined"),
  strictEqual(escapeHtml(null), "null"),
  strictEqual(escapeHtml(42), "42"),
  strictEqual(escapeHtml({}), "[object Object]"),
  strictEqual(escapeHtml('"'), "&quot;"),
  strictEqual(escapeHtml('"bar'), "&quot;bar"),
  strictEqual(escapeHtml('foo"'), "foo&quot;"),
  strictEqual(escapeHtml('foo"bar'), "foo&quot;bar"),
  strictEqual(escapeHtml('foo""bar'), "foo&quot;&quot;bar"),
  strictEqual(escapeHtml("&"), "&amp;"),
  strictEqual(escapeHtml("&bar"), "&amp;bar"),
  strictEqual(escapeHtml("foo&"), "foo&amp;"),
  strictEqual(escapeHtml("foo''bar"), "foo&#39;&#39;bar"),
  strictEqual(escapeHtml("foo>>bar"), "foo&gt;&gt;bar"),
  strictEqual(
    escapeHtml('&foo <> bar "fizz" l\'a'),
    "&amp;foo &lt;&gt; bar &quot;fizz&quot; l&#39;a"
  ),
];

console.log(res);
