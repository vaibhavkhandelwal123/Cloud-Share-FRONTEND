export function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      resolve(result.split(",")[1]);
      }
    }
  );
};

export function base64ToFile(base64String, fileName) {
  const extension = fileName.split('.').pop().toLowerCase();
  let mime;

  switch (extension) {
    case 'png':
      mime = 'image/png';
      break;
    case 'jpg':
    case 'jpeg':
      mime = 'image/jpeg';
      break;
    case 'gif':
      mime = 'image/gif';
      break;
    case 'pdf':
      mime = 'application/pdf';
      break;
    case 'txt':
      mime = 'text/plain';
      break;
    case 'csv':
      mime = 'text/csv';
      break;
    case 'doc':
      mime = 'application/msword';
      break;
    case 'docx':
      mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      break;
    case 'xlsx':
      mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      break;
    default:
      mime = 'application/octet-stream'; 
  }

  const bstr = atob(base64String);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], fileName, { type: mime });
}


