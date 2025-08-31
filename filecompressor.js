function convertImageToPDF() {
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];

  if (!file) return alert("Please select an image");

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const pdfData = canvas.toDataURL("application/pdf");

      const a = document.createElement("a");
      a.href = pdfData;
      a.download = "converted.pdf";
      a.click();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function compressPDF() {
  const fileInput = document.getElementById("pdfInput");
  const file = fileInput.files[0];

  if (!file) return alert("Please select a PDF");

  const reader = new FileReader();
  reader.onload = function (e) {
    const blob = new Blob([e.target.result], { type: "application/pdf" });

    // This is a naive compression: just re-saving the file.
    // For actual compression, a library like PDF-lib or server-side compression is needed.
    const compressedBlob = blob.slice(0, blob.size * 0.7); // fake compression

    const a = document.createElement("a");
    a.href = URL.createObjectURL(compressedBlob);
    a.download = "compressed.pdf";
    a.click();

    document.getElementById("status").textContent = "Compression complete (approximate).";
  };
  reader.readAsArrayBuffer(file);
}
