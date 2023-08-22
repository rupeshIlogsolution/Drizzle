// import React, { useState } from 'react';

// export default function Upload() {
//   const [jsondata, setJsondata] = useState([]);

//   const convert = (e) => {
//     e.preventDefault();
//     var files = e.target.files;
//     if (files.length === 0) {
//       alert('Please choose any file...');
//       return;
//     }
//     var filename = files[0].name;
//     var extension = filename.substring(filename.lastIndexOf('.')).toUpperCase();
//     if (
//       extension === '.XLS' ||
//       extension === '.XLSX' ||
//       extension === '.CSV' ||
//       extension === '.csv'
//     ) {
//       excelFileToJSON(files[0]);
//     } else {
//       alert('Please select a valid excel file.');
//     }
//   };

//   function excelFileToJSON(file) {
//     try {
//       var reader = new FileReader();
//       reader.readAsBinaryString(file);
//       reader.onload = function (e) {
//         var data = e.target.result;
//         var workbook = XLSX.read(data, {
//           type: 'binary',
//         });

//         var result = {};
//         workbook.SheetNames.forEach(function (sheetName) {
//           var roa = XLSX.utils.sheet_to_row_object_array(
//             workbook.Sheets[sheetName]
//           );
//           if (roa.length > 0) {
//             // result[sheetName] = roa;
//             result = roa;
//           }
//         });
//         //displaying the json result
//         setJsondata(result);
//       };
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   const sendToDb = (e) => {
//     e.preventDefault();
//     console.log(jsondata);
//   };

//   return (
//     <>
//       <div
//         className="modal fade"
//         id="exampleModal"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="exampleModalLabel">
//                 Modal title
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <input
//                 className="EXcel file"
//                 type="file"
//                 id="file_upload"
//                 accept=".xlsx,.csv"
//                 onChange={convert}
//               />
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={sendToDb}
//                 data-bs-dismiss="modal"
//               >
//                 Upload
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
