// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let executeButton = document.getElementById('executeButton');

executeButton.onclick = element => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: `

          /* Create css doc */
          var style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML = \`.adpeelerClass {
            overflow: auto !important;
            overflowY: auto !important;
          }\`;
          document.getElementsByTagName('HEAD')[0].appendChild(style);

          /* Add class to html and body */
          if (!document.getElementsByTagName("HTML")[0].classList.contains('adpeelerClass')) {
            document.getElementsByTagName("HTML")[0].classList += ' adpeelerClass'
          }

          if (!document.getElementsByTagName("BODY")[0].classList.contains('adpeelerClass')) {
            document.getElementsByTagName("BODY")[0].classList += ' adpeelerClass'
          }

          var elements = document.getElementsByTagName("div");
          var highest_index_element = elements[0];

          for (var i = 1; i < elements.length; i++) {
            if ((parseInt(elements[i].style.zIndex) ? parseInt(elements[i].style.zIndex)  : 0) >
                (parseInt(highest_index_element.style.zIndex) ? parseInt(highest_index_element.style.zIndex) : -1)) {
                highest_index_element = elements[i];
            }
          }

          if (!highest_index_element) {
            alert("Adpeeler cannot unpeal this page :(");
          } else {
            highest_index_element.parentNode.removeChild(highest_index_element);
          }



          `});
  });
};
