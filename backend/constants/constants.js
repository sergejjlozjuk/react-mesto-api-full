const regex = {
  link: /https*:\/\/[a-z._@!?&\-=$~#'()*:[\]0-9+,;]*[.]{1,}[a-z]*/gm,
  id: /[0-9a-zA-Z]{24}/,
};

module.exports = {
  regex,
};
