/*
 *
 * (c) Copyright Ascensio System Limited 2010-2017
 *
 * The MIT License (MIT)
 *
*/

builderFileLink.onclick = function (e) {
  e.preventDefault();
  builderFile.click();
};

builderFile.onchange = function (e) {
  console.log('Text changed.')
  var input = e.target;

  var reader = new FileReader();
  reader.onload = function () {
    var text = reader.result;
    document.getElementById("PredefinedScript").value = text;
  };
  reader.readAsText(input.files[0]);
};