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
export {
  imageUrlGeneratorFP,
  imageUrlGeneratorFastly,
  imageUrlGeneratorImagekit,
  imageUrlGeneratorUpyun
};
