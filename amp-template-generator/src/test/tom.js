const convert = require('xml-js'); 	

const client = require('../graphql-config').client;
const customElements = require('../amp-custom-elements');
const AmpYoutubeVideo = require('../amp-youtube');
const AmpCallout = require('../amp-callout');
const AmpStudentAnswer = require('../amp-student-answer');
const AmpIframe = require('../amp-iframe');
const AmpImage = require('../amp-image');
const ContentModelParser = require('../content-model-parser');
const queries = require('../structure-queries');

// This is a developer script for experimenting with one-off components.
// Run with "npm run tom"
//
// The actual application is found in index.js, and can be run via "npm run parse"



// const queryVars = {
//   'id': '216'
// };

// var query = `query ($id: String!) {
//       nodeById(id: $id) {
//         entityLabel
//           entityType
//             ... on NodeCsLesson {
//           title
//           lessonContent {
//             targetId
//             entity {
//               entityLabel
//               entityType
//               entityUuid
//               entityBundle
//               entityId
//               nid
//               uuid
//               vid
//               title
//               ... on NodeCsYoutubeCt {
//                 youtubeMedia {
//                   targetId
//                   entity {
//                     entityLabel
//                     ... on MediaYoutubeVideoMt {
//                       fieldMediaOembedVideo3
//                     } 
//                   } 
//                 }
                
//               }
//             }
//           }
          
//         }
//     }
// }`;

// client.request(queries.youtubeVideoCt, queryVars)
//   .then(data => {
// console.log('data:');console.info(data);   	
//     media = data.mediaById;
//     var ctr = new AmpYoutubeVideo();
//     ctr.generate(media);
//     console.log(ctr.html);
//     console.log(ctr.ampElements);
//   })




const queryVars2 = {
  'id': '223'
};

var amp_image = new AmpImage();
client.request(queries.image, queryVars2)
  .then(data => {
    console.log(JSON.stringify(data.nodeById, null, 4));
    amp_image.generate(data.nodeById);
    console.log('tom.js: 1: '+amp_image.html);
    console.log('tom.js: 2: '+amp_image.ampElements);
  });






// const queryVars2 = {
//   'id': '173'
// };

// var amp_callout = new AmpCallout();
// client.request(queries.callout, queryVars2)
//   .then(data => {
// //console.log('data:');console.info(data);   	  	
//   	//console.log(queries.callout);
//     console.log(JSON.stringify(data.nodeById, null, 4));
//     amp_callout.generate(data.nodeById);
//     console.log(amp_callout.html);
//     console.log(amp_callout.ampElements);
//   });
