export const QueryString = value =>
  value
    .toLowerCase()
    .replace(/[¿@#$%^&/|*?"'`]/g, '')
    .replace(/ /g, '+');
