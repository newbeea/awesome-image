var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// index.ts
var services_exports = {};
__export(services_exports, {
  imageUrlGeneratorFP: () => imageUrlGeneratorFP,
  imageUrlGeneratorFastly: () => imageUrlGeneratorFastly,
  imageUrlGeneratorImagekit: () => imageUrlGeneratorImagekit,
  imageUrlGeneratorUpyun: () => imageUrlGeneratorUpyun
});

// fp/index.ts
var imageUrlGeneratorFP = (url, options = {}) => {
  const query = [];
  if (options.width)
    query.push(`w=${options.width}`);
  if (options.blur)
    query.push(`b=${options.blur}`);
  if (options.quantity)
    query.push(`q=${options.quantity}`);
  if (options.format)
    query.push(`f=${options.format}`);
  if (!query.length)
    return url;
  if (/(.+\?$)|(.+\?.+&$)/.test(url))
    return url + query.join("&");
  else if (/.+\?.+/.test(url))
    return `${url}&${query.join("&")}`;
  else
    return `${url}?${query.join("&")}`;
};

// fastly/index.ts
var imageUrlGeneratorFastly = (url, options = {}) => {
  const query = Object.entries(options).map((kv) => `${kv[0]}=${kv[1]}`);
  if (/(.+\?$)|(.+\?.+&$)/.test(url))
    return url + query.join("&");
  else if (/.+\?.+/.test(url))
    return `${url}&${query.join("&")}`;
  else
    return `${url}?${query.join("&")}`;
};

// imagekit/index.ts
var imageUrlGeneratorImagekit = (url, options = {}) => {
  const params = [];
  if (options.width)
    params.push(`w-${options.width}`);
  if (options.blur)
    params.push(`bl-${options.blur * 5}`);
  if (options.quantity)
    params.push(`q-${options.quantity}`);
  if (options.format)
    params.push(`f-${options.format}`);
  const query = `tr=${params.join(",")}`;
  if (/(.+\?$)|(.+\?.+&$)/.test(url))
    return url + query;
  else if (/.+\?.+/.test(url))
    return `${url}&${query}`;
  else
    return `${url}?${query}`;
};

// upyun/index.ts
var imageUrlGeneratorUpyun = (url, options = {}) => {
  const query = [];
  if (options.width)
    query.push(`fw/${options.width}`);
  if (options.blur)
    query.push(`gaussblur/${options.blur * 5}x${options.blur * 5}`);
  if (options.quantity)
    query.push(`quality/${options.quantity}`);
  if (options.format)
    query.push(`format/${options.format}`);
  return `${url}!/${query.join("/")}`;
};
module.exports = __toCommonJS(services_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  imageUrlGeneratorFP,
  imageUrlGeneratorFastly,
  imageUrlGeneratorImagekit,
  imageUrlGeneratorUpyun
});
